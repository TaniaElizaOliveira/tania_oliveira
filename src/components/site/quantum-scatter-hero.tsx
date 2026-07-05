"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import styles from "./quantum-scatter-hero.module.css";

type QuantumScatterHeroProps = {
  className?: string;
  locale?: string;
};

type Particle = {
  alpha: number;
  color: string;
  depth: number;
  phase: number;
  radius: number;
  speed: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

type Point = {
  x: number;
  y: number;
};

const palette = {
  blue: "#8ea0ff",
  gray: "#b8b3c9",
  magenta: "#9d1bff",
  pink: "#ff2bd6",
  white: "#f4f1ff",
};

const quantumLabels: Record<
  string,
  { aria: string; footer: string; header: string; status: string }
> = {
  pt: {
    aria: "Sistema de partículas Quantum Profile",
    footer: "React · Canvas · Motion · Performance",
    header: "QUANTUM PROFILE",
    status: "PARTICLE SYSTEM",
  },
  en: {
    aria: "Quantum profile particle system",
    footer: "React · Canvas · Motion · Performance",
    header: "QUANTUM PROFILE",
    status: "PARTICLE SYSTEM",
  },
  fr: {
    aria: "Système de particules du profil quantique",
    footer: "React · Canvas · Mouvement · Performance",
    header: "PROFIL QUANTIQUE",
    status: "SYSTÈME DE PARTICULES",
  },
  es: {
    aria: "Sistema de partículas del perfil cuántico",
    footer: "React · Canvas · Movimiento · Rendimiento",
    header: "PERFIL CUÁNTICO",
    status: "SISTEMA DE PARTÍCULAS",
  },
};

function createSeededRandom(seed: number) {
  let state = seed >>> 0;

  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function hashPoint(point: Point) {
  const x = Math.round(point.x * 10);
  const y = Math.round(point.y * 10);

  return (x * 73856093) ^ (y * 19349663);
}

function samplePoints(points: Point[], limit: number) {
  if (points.length <= limit) {
    return points;
  }

  return [...points]
    .sort((a, b) => (hashPoint(a) >>> 0) - (hashPoint(b) >>> 0))
    .slice(0, limit)
    .sort((a, b) => a.y - b.y || a.x - b.x);
}

function createTargetPoints(width: number, height: number, isSmall: boolean) {
  const isVerySmall = width < 390;
  const spacing = isVerySmall ? 10 : isSmall ? 10.5 : 8.5;
  const limit = isVerySmall ? 220 : isSmall ? 260 : 620;
  const centerX = width / 2;
  const centerY = height / 2 + (isSmall ? 6 : 10);
  const barWidth = width * 0.58;
  const barHeight = height * 0.12;
  const stemWidth = width * 0.16;
  const stemHeight = height * 0.58;
  const top = centerY - stemHeight / 2;
  const barLeft = centerX - barWidth / 2;
  const barRight = centerX + barWidth / 2;
  const barBottom = top + barHeight;
  const stemLeft = centerX - stemWidth / 2;
  const stemRight = centerX + stemWidth / 2;
  const stemBottom = top + stemHeight;
  const points = new Map<string, Point>();

  for (let y = top; y <= stemBottom; y += spacing) {
    for (let x = barLeft; x <= barRight; x += spacing) {
      const inTopBar = y >= top && y <= barBottom && x >= barLeft && x <= barRight;
      const inStem = y >= top && y <= stemBottom && x >= stemLeft && x <= stemRight;

      if (!inTopBar && !inStem) {
        continue;
      }

      const key = `${Math.round(x)}:${Math.round(y)}`;
      points.set(key, { x, y });
    }
  }

  return samplePoints(Array.from(points.values()), limit);
}

function getEdgeStart(width: number, height: number, random: () => number) {
  const edge = Math.floor(random() * 4);
  const margin = 64;

  if (edge === 0) {
    return { x: -margin, y: random() * height };
  }

  if (edge === 1) {
    return { x: width + margin, y: random() * height };
  }

  if (edge === 2) {
    return { x: random() * width, y: -margin };
  }

  return { x: random() * width, y: height + margin };
}

function getParticleColor(point: Point, width: number, height: number, random: () => number) {
  const topBias = point.y < height * 0.42;
  const centerDistance = Math.abs(point.x - width / 2) / Math.max(width / 2, 1);
  const roll = random();

  if (topBias && roll < 0.62) {
    return palette.white;
  }

  if (centerDistance < 0.22 && roll < 0.72) {
    return roll < 0.38 ? palette.pink : palette.magenta;
  }

  if (roll < 0.55) {
    return palette.gray;
  }

  if (roll < 0.85) {
    return roll < 0.7 ? palette.pink : palette.magenta;
  }

  return palette.blue;
}

function createParticles(width: number, height: number, reducedMotion: boolean) {
  const isSmall = width < 640;
  const random = createSeededRandom(Math.round(width * 13 + height * 17));
  const points = createTargetPoints(width, height, isSmall);

  return points.map((point) => {
    const start = reducedMotion ? point : getEdgeStart(width, height, random);
    const radius = isSmall ? 1 + random() * 0.75 : 1.15 + random() * 1.1;

    return {
      alpha: 0.65 + random() * 0.35,
      color: getParticleColor(point, width, height, random),
      depth: reducedMotion ? 0 : isSmall ? 0.25 + random() * 0.8 : 0.4 + random() * 1.8,
      phase: random() * Math.PI * 2,
      radius,
      speed: 0.0012 + random() * 0.0018,
      targetX: point.x,
      targetY: point.y,
      vx: 0,
      vy: 0,
      x: start.x,
      y: start.y,
    } satisfies Particle;
  });
}

export function QuantumScatterHero({ className, locale = "pt" }: QuantumScatterHeroProps) {
  const labels = quantumLabels[locale] ?? quantumLabels.pt;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const sizeRef = useRef({ height: 0, width: 0 });
  const visibleRef = useRef(true);
  const inViewRef = useRef(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const panel = panelRef.current;

    if (!canvas || !panel) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true });

    if (!context) {
      return;
    }

    contextRef.current = context;
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const draw = (time: number) => {
      const currentContext = contextRef.current;
      const { width, height } = sizeRef.current;

      if (!currentContext || width === 0 || height === 0) {
        return;
      }

      currentContext.clearRect(0, 0, width, height);

      const reducedMotion = reducedMotionRef.current;
      const mouse = mouseRef.current;
      const isSmall = width < 640;
      const stiffness = reducedMotion ? 1 : 0.026;
      const damping = reducedMotion ? 0 : 0.86;
      const mouseRadius = isSmall || reducedMotion ? 0 : 140;
      const maxForce = 2.8;

      for (const particle of particlesRef.current) {
        const dx = particle.targetX - particle.x;
        const dy = particle.targetY - particle.y;

        particle.vx += dx * stiffness;
        particle.vy += dy * stiffness;

        if (mouse && mouseRadius > 0) {
          const mouseDx = particle.x - mouse.x;
          const mouseDy = particle.y - mouse.y;
          const distance = Math.hypot(mouseDx, mouseDy);

          if (distance > 0 && distance < mouseRadius) {
            const force = (1 - distance / mouseRadius) * maxForce;
            const angle = Math.atan2(mouseDy, mouseDx);
            particle.vx += Math.cos(angle) * force;
            particle.vy += Math.sin(angle) * force;
          }
        }

        particle.vx *= damping;
        particle.vy *= damping;
        particle.x += particle.vx;
        particle.y += particle.vy;

        const waveX = reducedMotion
          ? 0
          : Math.sin(time * particle.speed + particle.phase) * particle.depth;
        const waveY = reducedMotion
          ? 0
          : Math.cos(time * particle.speed + particle.phase) * particle.depth;
        const drawX = particle.x + waveX;
        const drawY = particle.y + waveY;
        const shouldGlow =
          particle.color === palette.pink &&
          ((Math.round(particle.targetX + particle.targetY) % 8) === 0);

        if (shouldGlow) {
          currentContext.save();
          currentContext.shadowBlur = 8;
          currentContext.shadowColor = "rgba(255, 43, 214, 0.55)";
        }

        currentContext.globalAlpha = particle.alpha;
        currentContext.fillStyle = particle.color;
        currentContext.beginPath();
        currentContext.arc(drawX, drawY, particle.radius, 0, Math.PI * 2);
        currentContext.fill();

        if (shouldGlow) {
          currentContext.restore();
        }
      }

      currentContext.globalAlpha = 1;
    };

    const stopLoop = () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };

    const shouldRun = () =>
      inViewRef.current && visibleRef.current && !reducedMotionRef.current;

    const runFrame = (time: number) => {
      draw(time);

      if (shouldRun()) {
        frameRef.current = window.requestAnimationFrame(runFrame);
      } else {
        frameRef.current = null;
      }
    };

    const startLoop = () => {
      if (reducedMotionRef.current) {
        draw(performance.now());
        return;
      }

      if (!frameRef.current && shouldRun()) {
        frameRef.current = window.requestAnimationFrame(runFrame);
      }
    };

    const rebuild = () => {
      const rect = panel.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      sizeRef.current = { height, width };
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      particlesRef.current = createParticles(width, height, reducedMotionRef.current);
      draw(performance.now());
      startLoop();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotionRef.current || sizeRef.current.width < 640) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const onPointerLeave = () => {
      mouseRef.current = null;
    };

    const onVisibilityChange = () => {
      visibleRef.current = !document.hidden;

      if (visibleRef.current) {
        startLoop();
      } else {
        stopLoop();
      }
    };

    const onReduceMotionChange = () => {
      reducedMotionRef.current = reduceMotionQuery.matches;
      mouseRef.current = null;
      rebuild();
    };

    reducedMotionRef.current = reduceMotionQuery.matches;
    visibleRef.current = !document.hidden;

    const resizeObserver = new ResizeObserver(rebuild);
    resizeObserver.observe(panel);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = Boolean(entry?.isIntersecting);

        if (inViewRef.current) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.12 },
    );
    intersectionObserver.observe(panel);

    panel.addEventListener("pointermove", onPointerMove);
    panel.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    reduceMotionQuery.addEventListener("change", onReduceMotionChange);
    rebuild();

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      panel.removeEventListener("pointermove", onPointerMove);
      panel.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reduceMotionQuery.removeEventListener("change", onReduceMotionChange);
    };
  }, []);

  return (
    <section
      aria-label={labels.aria}
      className={cn(styles.panel, className)}
      ref={panelRef}
    >
      <canvas aria-hidden="true" className={styles.canvas} ref={canvasRef} />
      <div className={styles.chrome}>
        <div className={styles.header}>
          <span>{labels.header}</span>
          <span className={styles.accent}>{labels.status}</span>
        </div>
        <div className={styles.footer}>
          <span>{labels.footer}</span>
        </div>
      </div>
    </section>
  );
}
