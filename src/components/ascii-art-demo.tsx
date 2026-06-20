"use client";

import { AsciiArt } from "@/components/ui/ascii-art";

export default function AsciiArtDemo() {
  return (
    <AsciiArt
      animateOnView={false}
      animationDuration={1.5}
      animationStyle="fade"
      className="mx-auto aspect-square w-full max-w-lg bg-neutral-950"
      color="var(--color-neutral-500)"
      resolution={100}
      src="https://assets.aceternity.com/avatars/manu.webp"
    />
  );
}
