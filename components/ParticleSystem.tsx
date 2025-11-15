'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

interface ParticleSystemProps {
  density?: number; // particles per frame
  maxParticles?: number;
  connectionDistance?: number;
  particleLife?: number;
  showConnections?: boolean;
  backgroundColor?: string;
  particleColor?: string;
  opacity?: number;
}

export default function ParticleSystem({
  density = 2,
  maxParticles = 100,
  connectionDistance = 120,
  particleLife = 100,
  showConnections = true,
  backgroundColor = 'transparent',
  particleColor = '0, 255, 0', // RGB for terminal green
  opacity = 0.6,
}: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
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
    };

    // Mouse move handler - create particles at mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };

      // Create particles at mouse position
      for (let i = 0; i < density; i++) {
        if (particlesRef.current.length < maxParticles) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 2 + 1;
          particlesRef.current.push({
            x: e.clientX,
            y: e.clientY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: particleLife,
            maxLife: particleLife,
            size: Math.random() * 3 + 2,
          });
        }
      }
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    // Animation loop
    const animate = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = backgroundColor === 'transparent'
        ? 'rgba(0, 0, 0, 0.05)'
        : backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        // Update particle position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;

        // Apply friction
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Remove dead particles
        if (particle.life <= 0) return false;

        // Calculate opacity based on life
        const lifeRatio = particle.life / particle.maxLife;
        const particleOpacity = lifeRatio * opacity;

        // Draw particle
        ctx.fillStyle = `rgba(${particleColor}, ${particleOpacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * lifeRatio, 0, Math.PI * 2);
        ctx.fill();

        // Draw particle glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3
        );
        gradient.addColorStop(0, `rgba(${particleColor}, ${particleOpacity * 0.5})`);
        gradient.addColorStop(1, `rgba(${particleColor}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      // Draw connections between nearby particles
      if (showConnections) {
        for (let i = 0; i < particlesRef.current.length; i++) {
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const p1 = particlesRef.current[i];
            const p2 = particlesRef.current[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
              const connectionOpacity =
                (1 - distance / connectionDistance) *
                Math.min(p1.life / p1.maxLife, p2.life / p2.maxLife) *
                opacity;

              ctx.strokeStyle = `rgba(${particleColor}, ${connectionOpacity * 0.3})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw mouse trail circle
      if (mouseRef.current.active) {
        const gradient = ctx.createRadialGradient(
          mouseRef.current.x,
          mouseRef.current.y,
          0,
          mouseRef.current.x,
          mouseRef.current.y,
          30
        );
        gradient.addColorStop(0, `rgba(${particleColor}, 0.2)`);
        gradient.addColorStop(1, `rgba(${particleColor}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 30, 0, Math.PI * 2);
        ctx.fill();

        // Draw cursor ring
        ctx.strokeStyle = `rgba(${particleColor}, 0.5)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 15, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [density, maxParticles, connectionDistance, particleLife, showConnections, backgroundColor, particleColor, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
      style={{ backgroundColor }}
    />
  );
}
