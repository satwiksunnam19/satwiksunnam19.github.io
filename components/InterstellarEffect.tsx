'use client';

import { useEffect, useRef } from 'react';

interface SpaceDust {
  x: number;
  y: number;
  z: number; // depth for parallax
  vx: number;
  vy: number;
  size: number;
  brightness: number;
}

interface WormholeParticle {
  angle: number;
  radius: number;
  speed: number;
  z: number;
  color: { r: number; g: number; b: number };
}

interface InterstellarEffectProps {
  showWormhole?: boolean;
  dustDensity?: number;
  gravitationalStrength?: number;
}

export default function InterstellarEffect({
  showWormhole = true,
  dustDensity = 200,
  gravitationalStrength = 150,
}: InterstellarEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dustRef = useRef<SpaceDust[]>([]);
  const wormholeParticlesRef = useRef<WormholeParticle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, clicked: false });
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initSpaceDust();
      if (showWormhole) initWormhole();
    };

    // Initialize space dust particles
    const initSpaceDust = () => {
      dustRef.current = [];
      for (let i = 0; i < dustDensity; i++) {
        dustRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 3 + 0.5, // depth layers
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 2 + 0.5,
          brightness: Math.random() * 0.5 + 0.5,
        });
      }
    };

    // Initialize wormhole particles
    const initWormhole = () => {
      wormholeParticlesRef.current = [];
      for (let i = 0; i < 300; i++) {
        wormholeParticlesRef.current.push({
          angle: Math.random() * Math.PI * 2,
          radius: Math.random() * 200,
          speed: Math.random() * 0.02 + 0.01,
          z: Math.random() * 100,
          color: {
            r: Math.random() * 100,
            g: Math.random() * 150 + 105,
            b: Math.random() * 255,
          },
        });
      }
    };

    // Mouse handlers
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseDown = () => {
      mouseRef.current.clicked = true;
    };

    const handleMouseUp = () => {
      mouseRef.current.clicked = false;
    };

    // Gravitational lensing effect
    const applyGravitationalLensing = (particle: SpaceDust) => {
      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < gravitationalStrength && distance > 0) {
        const force = (gravitationalStrength - distance) / gravitationalStrength;
        const angle = Math.atan2(dy, dx);

        // Apply gravitational pull
        particle.vx += Math.cos(angle) * force * 0.5;
        particle.vy += Math.sin(angle) * force * 0.5;

        // Orbital motion (perpendicular to gravity)
        particle.vx += -Math.sin(angle) * force * 0.3;
        particle.vy += Math.cos(angle) * force * 0.3;
      }
    };

    // Draw wormhole portal
    const drawWormhole = () => {
      if (!showWormhole || !mouseRef.current.clicked) return;

      const centerX = mouseRef.current.x;
      const centerY = mouseRef.current.y;

      // Draw event horizon (black hole center)
      const eventHorizonGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, 50
      );
      eventHorizonGradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      eventHorizonGradient.addColorStop(0.7, 'rgba(20, 20, 50, 0.8)');
      eventHorizonGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = eventHorizonGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 50, 0, Math.PI * 2);
      ctx.fill();

      // Update and draw wormhole particles (accretion disk)
      wormholeParticlesRef.current.forEach((particle) => {
        particle.angle += particle.speed;
        particle.radius -= particle.speed * 20;

        // Reset particle if it reaches center
        if (particle.radius < 10) {
          particle.radius = 200;
          particle.angle = Math.random() * Math.PI * 2;
        }

        // Calculate position on spiral
        const spiralFactor = particle.radius / 200;
        const x = centerX + Math.cos(particle.angle) * particle.radius * spiralFactor;
        const y = centerY + Math.sin(particle.angle) * particle.radius * spiralFactor;

        // Perspective scaling
        const scale = particle.z / 100;
        const size = 3 * scale;

        // Color based on distance and depth
        const colorIntensity = (1 - particle.radius / 200) * scale;
        const r = Math.floor(particle.color.r + colorIntensity * 155);
        const g = Math.floor(particle.color.g + colorIntensity * 100);
        const b = Math.floor(particle.color.b);

        // Draw particle with glow
        const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
        particleGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.8 * scale})`);
        particleGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = particleGradient;
        ctx.beginPath();
        ctx.arc(x, y, size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw core particle
        ctx.fillStyle = `rgba(${r + 50}, ${g + 50}, ${b + 50}, ${scale})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw gravitational lensing ring
      for (let i = 0; i < 3; i++) {
        ctx.strokeStyle = `rgba(100, 200, 255, ${0.3 - i * 0.1})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, 60 + i * 15, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    // Animation loop
    const animate = () => {
      timeRef.current += 0.01;

      // Clear with fade effect for trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw nebula background glow
      const nebulaGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
      nebulaGradient.addColorStop(0, 'rgba(20, 0, 40, 0.1)');
      nebulaGradient.addColorStop(0.5, 'rgba(10, 0, 30, 0.05)');
      nebulaGradient.addColorStop(1, 'rgba(0, 0, 20, 0)');
      ctx.fillStyle = nebulaGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw space dust
      dustRef.current.forEach((dust) => {
        // Apply gravitational lensing
        applyGravitationalLensing(dust);

        // Update position
        dust.x += dust.vx / dust.z;
        dust.y += dust.vy / dust.z;

        // Apply friction
        dust.vx *= 0.99;
        dust.vy *= 0.99;

        // Wrap around screen
        if (dust.x < 0) dust.x = canvas.width;
        if (dust.x > canvas.width) dust.x = 0;
        if (dust.y < 0) dust.y = canvas.height;
        if (dust.y > canvas.height) dust.y = 0;

        // Parallax size based on depth
        const size = (dust.size / dust.z) * 2;
        const alpha = dust.brightness / dust.z;

        // Draw dust particle
        const dustGradient = ctx.createRadialGradient(
          dust.x, dust.y, 0,
          dust.x, dust.y, size * 2
        );
        dustGradient.addColorStop(0, `rgba(200, 220, 255, ${alpha})`);
        dustGradient.addColorStop(0.5, `rgba(150, 180, 255, ${alpha * 0.5})`);
        dustGradient.addColorStop(1, 'rgba(100, 150, 255, 0)');
        ctx.fillStyle = dustGradient;
        ctx.beginPath();
        ctx.arc(dust.x, dust.y, size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(dust.x, dust.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Twinkle effect
        if (Math.random() > 0.99) {
          dust.brightness = Math.random() * 0.5 + 0.5;
        }
      });

      // Draw wormhole portal
      drawWormhole();

      // Draw gravitational field visualization when mouse is active
      if (mouseRef.current.x > 0 && mouseRef.current.y > 0) {
        const pulseSize = 20 + Math.sin(timeRef.current * 3) * 5;

        // Outer glow
        const glowGradient = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, gravitationalStrength
        );
        glowGradient.addColorStop(0, 'rgba(100, 150, 255, 0.1)');
        glowGradient.addColorStop(0.5, 'rgba(50, 100, 200, 0.05)');
        glowGradient.addColorStop(1, 'rgba(0, 50, 150, 0)');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, gravitationalStrength, 0, Math.PI * 2);
        ctx.fill();

        // Center pulse
        if (!mouseRef.current.clicked) {
          const pulseGradient = ctx.createRadialGradient(
            mouseRef.current.x, mouseRef.current.y, 0,
            mouseRef.current.x, mouseRef.current.y, pulseSize
          );
          pulseGradient.addColorStop(0, 'rgba(150, 200, 255, 0.5)');
          pulseGradient.addColorStop(1, 'rgba(100, 150, 255, 0)');
          ctx.fillStyle = pulseGradient;
          ctx.beginPath();
          ctx.arc(mouseRef.current.x, mouseRef.current.y, pulseSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [showWormhole, dustDensity, gravitationalStrength]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 bg-black"
    />
  );
}
