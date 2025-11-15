'use client';

import { useEffect, useRef } from 'react';

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  pulseOffset: number;
}

interface SubtleOrbsProps {
  count?: number;
  maxSize?: number;
  speed?: number;
  color?: string; // RGB values like "0, 255, 0"
  opacity?: number;
}

export default function SubtleOrbs({
  count = 15,
  maxSize = 80,
  speed = 0.3,
  color = '0, 255, 0', // terminal green
  opacity = 0.15,
}: SubtleOrbsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initOrbs();
    };

    // Initialize floating orbs
    const initOrbs = () => {
      orbsRef.current = [];
      for (let i = 0; i < count; i++) {
        orbsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: Math.random() * maxSize + 30,
          opacity: Math.random() * 0.3 + 0.2,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    // Animation loop
    const animate = () => {
      timeRef.current += 0.01;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw orbs
      orbsRef.current.forEach((orb, index) => {
        // Update position
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce off edges
        if (orb.x < -orb.size) orb.x = canvas.width + orb.size;
        if (orb.x > canvas.width + orb.size) orb.x = -orb.size;
        if (orb.y < -orb.size) orb.y = canvas.height + orb.size;
        if (orb.y > canvas.height + orb.size) orb.y = -orb.size;

        // Subtle pulsing effect
        const pulse = Math.sin(timeRef.current * 2 + orb.pulseOffset) * 0.1 + 0.9;
        const currentSize = orb.size * pulse;
        const currentOpacity = orb.opacity * pulse * opacity;

        // Draw orb with gradient
        const gradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          currentSize
        );
        gradient.addColorStop(0, `rgba(${color}, ${currentOpacity * 0.8})`);
        gradient.addColorStop(0.4, `rgba(${color}, ${currentOpacity * 0.4})`);
        gradient.addColorStop(0.7, `rgba(${color}, ${currentOpacity * 0.2})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, currentSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw subtle inner glow
        const innerGradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          currentSize * 0.3
        );
        innerGradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity * 0.15})`);
        innerGradient.addColorStop(1, `rgba(${color}, ${currentOpacity * 0.05})`);

        ctx.fillStyle = innerGradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, currentSize * 0.3, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [count, maxSize, speed, color, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
    />
  );
}
