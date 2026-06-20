"use client";

import { ArrowRight, Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import NextLink from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import type { SiteContent } from "@/content/dictionaries";
import styles from "./hero.module.css";

type HeroProps = {
  content: SiteContent["hero"];
};

const headlineTransition = {
  duration: 0.72,
  ease: [0.22, 1, 0.36, 1] as const,
};

const particles = Array.from({ length: 26 }, (_, index) => {
  const x = (index * 37 + 11) % 100;
  const y = (index * 53 + 17) % 100;
  const size = 2 + (index % 4);
  const duration = 8 + (index % 6) * 1.4;
  const delay = -1 * ((index * 0.73) % 7);

  return { delay, duration, size, x, y };
});

const binaryOverlayRows = [
  "01001101 01101111 01100100 01110101 01101100 01100001 01110010",
  "10110100 00110101 01110011 01000001 01010000 01001001 00110010",
  "01100110 01110010 01101111 01101110 01110100 01100101 01101110",
  "00110001 00110000 01100010 01100001 01100011 01101011 01100101",
  "01010011 01000001 01000001 01010011 00101110 01000100 01000001",
  "01101001 01101110 01110100 01100101 01100111 01110010 01100001",
  "00110000 00110001 01000011 01010010 01001101 00101110 01000101",
  "01000101 01010010 01010000 00101110 01000001 01010000 01001001",
  "01100100 01100001 01100100 01101111 01110011 00101110 01110111",
  "01101111 01110010 01101011 01100110 01101100 01101111 01110111",
];

function ParticleLayer() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div aria-hidden="true" className={styles.particleLayer}>
      {particles.map((particle, index) => (
        <span
          className={styles.particle}
          key={`${particle.x}-${particle.y}-${index}`}
          style={
            {
              "--particle-delay": `${particle.delay}s`,
              "--particle-duration": `${particle.duration}s`,
              "--particle-size": `${particle.size}px`,
              "--particle-x": `${particle.x}%`,
              "--particle-y": `${particle.y}%`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function TypewriterLine({ phrases }: { phrases: string[] }) {
  const shouldReduceMotion = useReducedMotion();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const phrase = phrases[phraseIndex] ?? "";
  const visibleText = shouldReduceMotion
    ? (phrases[0] ?? "")
    : phrase.slice(0, characterIndex);

  useEffect(() => {
    if (shouldReduceMotion || phrases.length === 0) {
      return;
    }

    const fullPhrase = phrases[phraseIndex] ?? "";
    const isComplete = characterIndex === fullPhrase.length;
    const isEmpty = characterIndex === 0;
    const delay = isDeleting ? 32 : isComplete ? 1500 : 48;

    const timeout = window.setTimeout(() => {
      if (!isDeleting && !isComplete) {
        setCharacterIndex((current) => current + 1);
        return;
      }

      if (!isDeleting && isComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && !isEmpty) {
        setCharacterIndex((current) => current - 1);
        return;
      }

      setIsDeleting(false);
      setPhraseIndex((current) => (current + 1) % phrases.length);
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [characterIndex, isDeleting, phraseIndex, phrases, shouldReduceMotion]);

  return (
    <p className="mt-5 min-h-9 max-w-2xl font-mono text-base font-medium leading-8 text-text sm:text-lg">
      <span aria-atomic="true" aria-live="polite" className="sr-only">
        {phrase}
      </span>
      <span aria-hidden="true">{visibleText}</span>
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-5 w-px translate-y-1 bg-primary shadow-[0_0_16px_rgba(255,0,204,0.7)] animate-pulse"
      />
    </p>
  );
}

export function Hero({ content }: HeroProps) {
  const shouldReduceMotion = useReducedMotion();

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 34 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section
      className="relative isolate min-h-[100svh] overflow-hidden px-5 pt-24 text-text sm:px-6 lg:px-8"
      id="hero"
    >
      <div className="absolute inset-0 -z-30 bg-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-20 h-full w-full overflow-hidden lg:w-[56vw]">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={
            {
              WebkitMaskImage:
                "linear-gradient(to left, black 62%, rgba(0,0,0,0.76) 78%, transparent 100%)",
              maskImage:
                "linear-gradient(to left, black 62%, rgba(0,0,0,0.76) 78%, transparent 100%)",
            } as CSSProperties
          }
        >
          <Image
            alt=""
            className="h-full w-full object-contain object-[76%_center] opacity-[0.62] grayscale contrast-[1.2] brightness-[0.84] saturate-0 lg:object-[68%_center] lg:opacity-[0.68]"
            fill
            priority
            sizes="(min-width: 1024px) 56vw, 100vw"
            src="/images/tania-bust-bw.png"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_58%_42%,rgba(255,0,204,0.2)_0,transparent_22rem),linear-gradient(90deg,rgba(10,10,15,0.18)_0%,rgba(255,0,204,0.12)_48%,rgba(10,10,15,0.2)_100%)] mix-blend-screen"
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-y-[14%] right-[2vw] w-[min(40vw,540px)] overflow-hidden opacity-[0.14] mix-blend-screen max-lg:right-[-10vw] max-lg:w-[76vw] max-sm:opacity-[0.1]"
          style={
            {
              WebkitMaskImage:
                "linear-gradient(to left, black 0%, rgba(0,0,0,0.72) 36%, rgba(0,0,0,0.22) 58%, transparent 78%)",
              maskImage:
                "linear-gradient(to left, black 0%, rgba(0,0,0,0.72) 36%, rgba(0,0,0,0.22) 58%, transparent 78%)",
            } as CSSProperties
          }
        >
          <div className="font-mono text-[10px] font-semibold leading-[1.35] tracking-[0.22em] text-white/70 [text-shadow:0_0_12px_rgba(255,0,204,0.35)] sm:text-[11px] lg:text-[12px]">
            {Array.from({ length: 18 }, (_, index) => (
              <p key={index} className="whitespace-nowrap">
                {binaryOverlayRows[index % binaryOverlayRows.length]}
              </p>
            ))}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,15,0.96)_0%,rgba(10,10,15,0.66)_34%,rgba(10,10,15,0.16)_62%,rgba(10,10,15,0.42)_100%)]"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#0A0A0F_0%,rgba(10,10,15,0.96)_28%,rgba(10,10,15,0.72)_54%,rgba(10,10,15,0.12)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgba(10,10,15,0.96)_0%,transparent_28%,transparent_72%,rgba(10,10,15,0.88)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_66%_48%,rgba(255,0,204,0.15),transparent_28rem),radial-gradient(circle_at_14%_34%,rgba(122,122,255,0.08),transparent_24rem)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:84px_84px] opacity-[0.14]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] [background-image:radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:18px_18px]" />
      <ParticleLayer />

      <div className="mx-auto flex min-h-[calc(100svh-6rem)] max-w-7xl items-center">
        <div className="relative z-10 w-full pb-14 pt-10 lg:pb-20">
          <motion.div
            {...motionProps}
            className="mb-7 flex flex-wrap items-center gap-3"
            transition={{ ...headlineTransition, delay: 0.05 }}
          >
            {content.microLabels.map((label) => (
              <span
                className="font-display border-l border-primary/70 px-3 py-1 text-base uppercase text-text-muted sm:text-lg"
                key={label}
              >
                {label}
              </span>
            ))}
          </motion.div>

          <h1
            aria-label={`${content.title.first} ${content.title.highlight}`}
            className="font-display max-w-5xl text-[clamp(4.8rem,15vw,11.5rem)] uppercase leading-[0.78] tracking-normal text-text"
          >
            <motion.span
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              className="block"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 42 }}
              transition={{ ...headlineTransition, delay: 0.16 }}
            >
              {content.title.first}
            </motion.span>
            <motion.span
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              className="block text-primary"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 42 }}
              style={{
                textShadow:
                  "0 0 18px rgba(255, 0, 204, 0.75), 0 0 42px rgba(255, 0, 204, 0.45)",
              }}
              transition={{ ...headlineTransition, delay: 0.28 }}
            >
              {content.title.highlight}
            </motion.span>
          </h1>

          <motion.div
            {...motionProps}
            transition={{ ...headlineTransition, delay: 0.36 }}
          >
            <TypewriterLine phrases={content.typewriter} />
          </motion.div>

          <motion.p
            {...motionProps}
            className="mt-5 max-w-2xl text-lg font-medium leading-8 text-text-muted sm:text-xl lg:max-w-xl"
            transition={{ ...headlineTransition, delay: 0.46 }}
          >
            {content.description}
          </motion.p>

          <motion.div
            {...motionProps}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            transition={{ ...headlineTransition, delay: 0.56 }}
          >
            <NextLink
              className={`group ${styles.ctaButton} ${styles.ctaPrimary}`}
              href="/under-construction"
            >
              {content.cta.projects}
              <ArrowRight
                aria-hidden="true"
                className="transition group-hover:translate-x-1"
                size={18}
              />
            </NextLink>
            <NextLink
              className={`${styles.ctaButton} ${styles.ctaSecondary}`}
              href="/under-construction"
            >
              <Mail aria-hidden="true" size={18} />
              {content.cta.contact}
            </NextLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
