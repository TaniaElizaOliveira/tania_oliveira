"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import toIcon from "@/assets/tania_oliveira_logo_final_pack/to-icon-transparent-cropped.png";
import { Link, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import styles from "./intro-gate.module.css";

type IntroGateProps = {
  locale: Locale;
  onEnter?: () => void;
};

type GlitterParticle = {
  alpha: number;
  color: string;
  life: number;
  maxLife: number;
  radius: number;
  spin: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
};

const labels = {
  pt: {
    reveal: "Revelar identidade visual",
    enter: "Entrar no portfólio",
  },
  en: {
    reveal: "Reveal visual identity",
    enter: "Enter portfolio",
  },
  es: {
    reveal: "Revelar identidad visual",
    enter: "Entrar al portafolio",
  },
} as const;

const name = "TANIA OLIVEIRA";
const glitterColors = [
  "255, 0, 204",
  "255, 92, 225",
  "122, 122, 255",
  "234, 234, 240",
  "188, 188, 205",
];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function IntroGate({ locale, onEnter }: IntroGateProps) {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number | null>(null);
  const exitTimerRef = useRef<number | null>(null);
  const particlesRef = useRef<GlitterParticle[]>([]);
  const wordmarkRef = useRef<HTMLAnchorElement>(null);
  const pointerRef = useRef({
    active: false,
    lastX: 0,
    lastY: 0,
    velocityX: 0,
    velocityY: 0,
    x: 0,
    y: 0,
  });
  const [isRevealed, setIsRevealed] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const currentLabels = labels[locale] ?? labels.pt;

  const emitGlitter = (
    x: number,
    y: number,
    amount: number,
    force = 1,
  ) => {
    if (shouldReduceMotion || isExiting) {
      return;
    }

    const isCompact = window.matchMedia("(max-width: 767px)").matches;
    const maxParticles = isCompact ? 82 : 180;
    const particles = particlesRef.current;

    for (let index = 0; index < amount; index += 1) {
      const angle = Math.random() * Math.PI * 2;
      const speed = randomBetween(0.18, 1.05) * force;
      const drift = randomBetween(8, 34) * force;
      const color = glitterColors[index % glitterColors.length];

      particles.push({
        alpha: randomBetween(0.32, 0.88),
        color,
        life: 0,
        maxLife: randomBetween(90, 160),
        radius: randomBetween(0.7, isCompact ? 1.9 : 2.6),
        spin: randomBetween(-0.018, 0.018),
        vx: Math.cos(angle) * speed + pointerRef.current.velocityX * 0.018,
        vy: Math.sin(angle) * speed + pointerRef.current.velocityY * 0.018,
        x: x + Math.cos(angle) * drift + randomBetween(-12, 12),
        y: y + Math.sin(angle) * drift + randomBetween(-12, 12),
      });
    }

    if (particles.length > maxParticles) {
      particles.splice(0, particles.length - maxParticles);
    }
  };

  const emitBurst = (x: number, y: number) => {
    emitGlitter(x, y, window.matchMedia("(max-width: 767px)").matches ? 34 : 58, 1.7);
  };

  const revealWordmark = (x?: number, y?: number) => {
    if (isRevealed || isExiting) {
      return;
    }

    emitBurst(x ?? window.innerWidth / 2, y ?? window.innerHeight / 2);
    setIsRevealed(true);
  };

  const enterPortfolio = (x?: number, y?: number) => {
    if (isExiting) {
      return;
    }

    emitBurst(x ?? window.innerWidth / 2, y ?? window.innerHeight / 2);
    setIsExiting(true);

    if (exitTimerRef.current) {
      window.clearTimeout(exitTimerRef.current);
    }

    exitTimerRef.current = window.setTimeout(
      () => {
        if (onEnter) {
          onEnter();
          return;
        }

        router.push("/home", { locale });
      },
      shouldReduceMotion ? 0 : 520,
    );
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (shouldReduceMotion || isExiting) {
      return;
    }

    const pointer = pointerRef.current;
    const nextX = event.clientX;
    const nextY = event.clientY;
    const deltaX = pointer.active ? nextX - pointer.lastX : 0;
    const deltaY = pointer.active ? nextY - pointer.lastY : 0;
    const distance = Math.hypot(deltaX, deltaY);

    pointer.active = true;
    pointer.velocityX = pointer.velocityX * 0.74 + deltaX * 0.26;
    pointer.velocityY = pointer.velocityY * 0.74 + deltaY * 0.26;
    pointer.lastX = nextX;
    pointer.lastY = nextY;
    pointer.x = nextX;
    pointer.y = nextY;

    if (distance > 2.5) {
      const isCompact = event.pointerType !== "mouse";
      emitGlitter(nextX, nextY, isCompact ? 2 : 4, Math.min(1.35, 0.75 + distance / 70));
    }
  };

  const onPointerLeave = () => {
    pointerRef.current.active = false;
  };

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") {
      emitGlitter(event.clientX, event.clientY, 14, 1.2);
    }
  };

  const onIconClick = (event: MouseEvent<HTMLButtonElement>) => {
    revealWordmark(event.clientX, event.clientY);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    revealWordmark();
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || shouldReduceMotion) {
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
      context.globalCompositeOperation = "lighter";

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        particle.life += 1;
        particle.vx = particle.vx * 0.982 + Math.sin(particle.life * 0.035 + particle.spin) * 0.018;
        particle.vy = particle.vy * 0.982 + Math.cos(particle.life * 0.03 + particle.spin) * 0.014 - 0.003;
        particle.x += particle.vx;
        particle.y += particle.vy;

        const progress = particle.life / particle.maxLife;
        const fade = Math.sin(Math.min(progress, 1) * Math.PI);
        const alpha = particle.alpha * fade * (1 - progress * 0.18);

        if (progress >= 1 || alpha <= 0.01) {
          particles.splice(index, 1);
          continue;
        }

        const radius = particle.radius * (1 + progress * 1.6);
        const gradient = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          radius * 4.2,
        );
        gradient.addColorStop(0, `rgba(${particle.color}, ${alpha})`);
        gradient.addColorStop(0.42, `rgba(${particle.color}, ${alpha * 0.32})`);
        gradient.addColorStop(1, `rgba(${particle.color}, 0)`);

        context.fillStyle = gradient;
        context.beginPath();
        context.arc(particle.x, particle.y, radius * 4.2, 0, Math.PI * 2);
        context.fill();

        context.fillStyle = `rgba(${particle.color}, ${Math.min(0.88, alpha + 0.1)})`;
        context.beginPath();
        context.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
        context.fill();
      }

      frameRef.current = window.requestAnimationFrame(draw);
    };

    const onVisibilityChange = () => {
      if (document.hidden && frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
        return;
      }

      if (!document.hidden && !frameRef.current) {
        frameRef.current = window.requestAnimationFrame(draw);
      }
    };

    resize();
    frameRef.current = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (isRevealed && !isExiting) {
      wordmarkRef.current?.focus();
    }
  }, [isExiting, isRevealed]);

  useEffect(() => {
    return () => {
      if (exitTimerRef.current) {
        window.clearTimeout(exitTimerRef.current);
      }
    };
  }, []);

  return (
    <main
      className={[
        styles.intro,
        isRevealed ? styles.revealed : "",
        isExiting ? styles.exiting : "",
        shouldReduceMotion ? styles.reducedMotion : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onPointerDown={onPointerDown}
      onPointerLeave={onPointerLeave}
      onPointerMove={onPointerMove}
    >
      <div aria-hidden="true" className={styles.ambientLayer}>
        <span className={styles.glowField} />
        <span className={styles.silverDust} />
        <canvas className={styles.glitterCanvas} ref={canvasRef} />
      </div>

      <section className={styles.logoStage} aria-label="Tania Oliveira">
        <button
          aria-expanded={isRevealed}
          aria-label={currentLabels.reveal}
          className={styles.iconButton}
          disabled={isRevealed || isExiting}
          onClick={onIconClick}
          onKeyDown={onKeyDown}
          type="button"
        >
          <Image
            alt=""
            className={styles.iconImage}
            draggable={false}
            priority
            src={toIcon}
          />
        </button>

        {isRevealed ? (
          <div className={styles.wordmarkWrap}>
            <Link
              aria-label={currentLabels.enter}
              className={styles.wordmarkLink}
              href="/home"
              locale={locale}
              onClick={(event) => {
                event.preventDefault();
                enterPortfolio(event.clientX, event.clientY);
              }}
              ref={wordmarkRef}
            >
              <span className={styles.nameLine}>
                {Array.from(name).map((character, index) => (
                  <span
                    className={styles.nameCharacter}
                    key={`${character}-${index}`}
                    style={{ "--char-index": index } as CSSProperties}
                  >
                    {character === " " ? "\u00A0" : character}
                  </span>
                ))}
              </span>
              <span className={styles.roleLine}>
                <span />
                <span>SOFTWARE ENGINEER</span>
                <span />
              </span>
            </Link>
          </div>
        ) : null}
      </section>
    </main>
  );
}
