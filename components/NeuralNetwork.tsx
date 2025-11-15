'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  layer: number;
}

interface Connection {
  from: Node;
  to: Node;
  active: boolean;
}

interface Pulse {
  from: Node;
  to: Node;
  progress: number;
  speed: number;
}

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNetwork();
    };

    // Initialize neural network structure
    const initNetwork = () => {
      nodesRef.current = [];
      connectionsRef.current = [];
      pulsesRef.current = [];

      const layers = [4, 6, 6, 4]; // Network architecture
      const layerSpacing = canvas.width / (layers.length + 1);
      const nodeRadius = 8;

      // Create nodes
      layers.forEach((nodeCount, layerIndex) => {
        const nodeSpacing = canvas.height / (nodeCount + 1);
        for (let i = 0; i < nodeCount; i++) {
          nodesRef.current.push({
            x: layerSpacing * (layerIndex + 1),
            y: nodeSpacing * (i + 1),
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            layer: layerIndex,
          });
        }
      });

      // Create connections between adjacent layers
      let nodeIndex = 0;
      for (let l = 0; l < layers.length - 1; l++) {
        const currentLayerNodes = nodesRef.current.slice(nodeIndex, nodeIndex + layers[l]);
        const nextLayerNodes = nodesRef.current.slice(
          nodeIndex + layers[l],
          nodeIndex + layers[l] + layers[l + 1]
        );

        currentLayerNodes.forEach((fromNode) => {
          nextLayerNodes.forEach((toNode) => {
            connectionsRef.current.push({
              from: fromNode,
              to: toNode,
              active: Math.random() > 0.7,
            });
          });
        });

        nodeIndex += layers[l];
      }

      // Initialize some pulses
      for (let i = 0; i < 3; i++) {
        addRandomPulse();
      }
    };

    // Add a random pulse
    const addRandomPulse = () => {
      const activeConnections = connectionsRef.current.filter((c) => c.active);
      if (activeConnections.length > 0) {
        const connection = activeConnections[Math.floor(Math.random() * activeConnections.length)];
        pulsesRef.current.push({
          from: connection.from,
          to: connection.to,
          progress: 0,
          speed: 0.005 + Math.random() * 0.01,
        });
      }
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Activate connections near mouse
      connectionsRef.current.forEach((conn) => {
        const midX = (conn.from.x + conn.to.x) / 2;
        const midY = (conn.from.y + conn.to.y) / 2;
        const dist = Math.hypot(mouseRef.current.x - midX, mouseRef.current.y - midY);

        if (dist < 150) {
          conn.active = true;
          // Add pulse on hover
          if (Math.random() > 0.95) {
            pulsesRef.current.push({
              from: conn.from,
              to: conn.to,
              progress: 0,
              speed: 0.01 + Math.random() * 0.02,
            });
          }
        }
      });
    };

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw connections
      connectionsRef.current.forEach((conn) => {
        const opacity = conn.active ? 0.3 : 0.1;
        ctx.strokeStyle = `rgba(0, 255, 0, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(conn.from.x, conn.from.y);
        ctx.lineTo(conn.to.x, conn.to.y);
        ctx.stroke();

        // Slowly deactivate connections
        if (Math.random() > 0.99) {
          conn.active = false;
        }
      });

      // Update and draw pulses
      pulsesRef.current = pulsesRef.current.filter((pulse) => {
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          // Pulse completed, maybe create a new one
          if (Math.random() > 0.7) {
            addRandomPulse();
          }
          return false;
        }

        // Draw pulse
        const x = pulse.from.x + (pulse.to.x - pulse.from.x) * pulse.progress;
        const y = pulse.from.y + (pulse.to.y - pulse.from.y) * pulse.progress;

        // Pulse glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 10);
        gradient.addColorStop(0, 'rgba(0, 255, 0, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fill();

        // Pulse core
        ctx.fillStyle = '#00ff00';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      // Update and draw nodes
      nodesRef.current.forEach((node) => {
        // Subtle floating animation
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        const margin = 50;
        if (node.x < margin || node.x > canvas.width - margin) node.vx *= -1;
        if (node.y < margin || node.y > canvas.height - margin) node.vy *= -1;

        // Mouse interaction
        const dist = Math.hypot(mouseRef.current.x - node.x, mouseRef.current.y - node.y);
        const isNear = dist < 100;

        // Draw node glow
        if (isNear) {
          const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 20);
          gradient.addColorStop(0, 'rgba(0, 255, 0, 0.3)');
          gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw node
        ctx.fillStyle = isNear ? '#00ff00' : 'rgba(0, 255, 0, 0.6)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, isNear ? 6 : 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw node border
        ctx.strokeStyle = '#00ff00';
        ctx.lineWidth = isNear ? 2 : 1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, isNear ? 8 : 6, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Randomly add new pulses
      if (Math.random() > 0.98) {
        addRandomPulse();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-black"
      style={{ opacity: 0.4 }}
    />
  );
}
