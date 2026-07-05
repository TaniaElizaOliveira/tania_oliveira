"use client";

import { useEffect, useRef } from "react";

type Particle = {
  alpha: number;
  color: string;
  life: number;
  maxLife: number;
  radius: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

const colors = [
  "255, 0, 204",
  "255, 95, 224",
  "122, 122, 255",
  "234, 234, 240",
];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function MouseParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
  const isDrawingRef = useRef(false);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef({
    lastX: 0,
    lastY: 0,
    ready: false,
    vx: 0,
    vy: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!canvas || reduceMotion.matches) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true });

    if (!context) {
      return;
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const particles = particlesRef.current;

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (particles.length === 0) {
        isDrawingRef.current = false;
        frameRef.current = null;
        return;
      }

      context.globalCompositeOperation = "lighter";

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.life += 1;
        particle.vx *= 0.982;
        particle.vy = particle.vy * 0.982 - 0.002;
        particle.x += particle.vx + Math.sin(particle.life * 0.035) * 0.018;
        particle.y += particle.vy + Math.cos(particle.life * 0.03) * 0.016;

        const progress = particle.life / particle.maxLife;
        const fade = Math.sin(Math.min(progress, 1) * Math.PI);
        const alpha = particle.alpha * fade * (1 - progress * 0.12);

        if (progress >= 1 || alpha <= 0.01) {
          particles.splice(index, 1);
          continue;
        }

        const glowRadius = particle.radius * (3.2 + progress * 2.4);
        const gradient = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          glowRadius,
        );
        gradient.addColorStop(0, `rgba(${particle.color}, ${alpha})`);
        gradient.addColorStop(0.38, `rgba(${particle.color}, ${alpha * 0.24})`);
        gradient.addColorStop(1, `rgba(${particle.color}, 0)`);

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = `rgba(${particle.color}, ${alpha * 0.72})`;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }

      frameRef.current = window.requestAnimationFrame(draw);
    };

    const startDrawing = () => {
      if (isDrawingRef.current) {
        return;
      }

      isDrawingRef.current = true;
      frameRef.current = window.requestAnimationFrame(draw);
    };

    const emitParticles = (x: number, y: number, amount: number, force: number) => {
      const particles = particlesRef.current;
      const maxParticles = window.innerWidth < 768 ? 54 : 120;

      for (let index = 0; index < amount; index += 1) {
        const angle = Math.random() * Math.PI * 2;
        const speed = randomBetween(0.08, 0.72) * force;
        const color = colors[(particles.length + index) % colors.length];

        particles.push({
          alpha: randomBetween(0.18, 0.62),
          color,
          life: 0,
          maxLife: randomBetween(72, 132),
          radius: randomBetween(0.6, window.innerWidth < 768 ? 1.5 : 2.2),
          vx:
            Math.cos(angle) * speed +
            pointerRef.current.vx * randomBetween(0.006, 0.014),
          vy:
            Math.sin(angle) * speed +
            pointerRef.current.vy * randomBetween(0.006, 0.014),
          x: x + Math.cos(angle) * randomBetween(4, 22),
          y: y + Math.sin(angle) * randomBetween(4, 22),
        });
      }

      if (particles.length > maxParticles) {
        particles.splice(0, particles.length - maxParticles);
      }

      startDrawing();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      const pointer = pointerRef.current;
      const x = event.clientX;
      const y = event.clientY;
      const dx = pointer.ready ? x - pointer.lastX : 0;
      const dy = pointer.ready ? y - pointer.lastY : 0;
      const distance = Math.hypot(dx, dy);

      pointer.ready = true;
      pointer.vx = pointer.vx * 0.82 + dx * 0.18;
      pointer.vy = pointer.vy * 0.82 + dy * 0.18;
      pointer.lastX = x;
      pointer.lastY = y;

      if (distance > 3) {
        emitParticles(x, y, distance > 18 ? 3 : 2, Math.min(1.25, 0.6 + distance / 80));
      }
    };

    const onPointerLeave = () => {
      pointerRef.current.ready = false;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] h-screen w-screen opacity-70"
      ref={canvasRef}
    />
  );
}
