"use client";

import { useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type AboutFlipCardProps = {
  title: string;
  text: string;
};

export function AboutFlipCard({ title, text }: AboutFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const detailLabel = useMemo(() => "Ver detalhes", []);

  if (shouldReduceMotion) {
    return (
      <button
        aria-expanded={isFlipped}
        className="group flex min-h-[176px] w-full flex-col rounded-lg border border-border bg-surface-2/85 p-4 text-left transition focus-visible:border-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45"
        onBlur={() => setIsFlipped(false)}
        onClick={() => setIsFlipped((current) => !current)}
        onFocus={() => setIsFlipped(true)}
        type="button"
      >
        <h2 className="font-display text-2xl uppercase text-text">{title}</h2>
        {isFlipped ? (
          <p className="mt-3 text-sm leading-6 text-text-muted">{text}</p>
        ) : (
          <span className="mt-auto pt-8 text-xs font-semibold uppercase tracking-[0.16em] text-primary-soft">
            {detailLabel}
          </span>
        )}
      </button>
    );
  }

  return (
    <button
      aria-expanded={isFlipped}
      aria-label={`${title}: ${text}`}
      className="group relative min-h-[176px] w-full rounded-lg text-left [perspective:1200px] focus-visible:outline-none"
      onClick={() => setIsFlipped((current) => !current)}
      type="button"
    >
      <span
        className={cn(
          "absolute inset-0 rounded-lg border border-border bg-surface-2/85 shadow-[0_18px_52px_rgba(0,0,0,0.2)] transition duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]",
          isFlipped ? "[transform:rotateY(180deg)]" : "",
        )}
      >
        <span className="absolute inset-0 flex flex-col justify-between rounded-lg p-4 [backface-visibility:hidden]">
          <span>
            <span className="block font-display text-2xl uppercase text-text">
              {title}
            </span>
          </span>
          <span>
            <span className="block h-px w-14 bg-primary/70 shadow-[0_0_16px_rgba(255,0,204,0.45)]" />
            <span className="mt-4 block text-xs font-semibold uppercase tracking-[0.16em] text-primary-soft">
              {detailLabel}
            </span>
          </span>
        </span>

        <span className="absolute inset-0 flex flex-col justify-center rounded-lg border border-primary/35 bg-[radial-gradient(circle_at_top_right,rgba(255,0,204,0.18),transparent_48%),rgba(26,26,36,0.96)] p-4 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="font-display text-base uppercase tracking-[0.12em] text-primary-soft">
            {title}
          </span>
          <span className="mt-3 text-sm leading-6 text-text">{text}</span>
        </span>
      </span>
    </button>
  );
}
