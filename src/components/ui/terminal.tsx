"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type TerminalProps = {
  commands: string[];
  outputs: Record<number, string[]>;
  username?: string;
  className?: string;
  typingSpeed?: number;
  delayBetweenCommands?: number;
  initialDelay?: number;
  enableSound?: boolean;
};

type TerminalLine =
  | {
      command: string;
      type: "command";
    }
  | {
      text: string;
      type: "output";
    };

function highlightCommand(command: string) {
  return command.split(" ").map((part, index) => {
    const color =
      index === 0
        ? "text-primary-soft"
        : part.startsWith("--")
          ? "text-accent"
          : "text-text";

    return (
      <React.Fragment key={`${part}-${index}`}>
        {index > 0 ? " " : null}
        <span className={color}>{part}</span>
      </React.Fragment>
    );
  });
}

function highlightOutput(text: string) {
  if (text.startsWith("✔")) {
    return <span className="text-primary-soft">{text}</span>;
  }

  if (text.startsWith("feat:")) {
    const [prefix, ...rest] = text.split(":");

    return (
      <>
        <span className="text-accent">{prefix}:</span>
        <span>{rest.join(":")}</span>
      </>
    );
  }

  if (text.endsWith("successfully.") || text.endsWith("review.")) {
    return <span className="text-text">{text}</span>;
  }

  return text;
}

export function Terminal({
  commands,
  outputs,
  username = "portfolio",
  className,
  typingSpeed = 55,
  delayBetweenCommands = 900,
  initialDelay = 500,
  enableSound = false,
}: TerminalProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [typedCommand, setTypedCommand] = useState("");
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const safeCommands = useMemo(
    () => commands.filter((command) => command.trim().length > 0),
    [commands],
  );

  useEffect(() => {
    const element = terminalRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!enableSound) {
      return;
    }

    try {
      const audio = new Audio("/sounds/sound.ogg");
      audio.volume = 0.12;
      audioRef.current = audio;
    } catch {
      audioRef.current = null;
    }
  }, [enableSound]);

  useEffect(() => {
    if (!hasStarted || isComplete || safeCommands.length === 0) {
      return;
    }

    const command = safeCommands[currentCommandIndex];

    if (!command) {
      setIsComplete(true);
      return;
    }

    if (typedCommand.length < command.length) {
      const timeout = window.setTimeout(
        () => {
          setTypedCommand(command.slice(0, typedCommand.length + 1));

          if (enableSound && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => undefined);
          }
        },
        typedCommand.length === 0 && currentCommandIndex === 0
          ? initialDelay
          : typingSpeed,
      );

      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(() => {
      const nextLines: TerminalLine[] = [
        { command, type: "command" },
        ...(outputs[currentCommandIndex] ?? []).map((text) => ({
          text,
          type: "output" as const,
        })),
      ];

      setVisibleLines((current) => [...current, ...nextLines]);
      setTypedCommand("");

      if (currentCommandIndex >= safeCommands.length - 1) {
        setIsComplete(true);
        return;
      }

      setCurrentCommandIndex((current) => current + 1);
    }, delayBetweenCommands);

    return () => window.clearTimeout(timeout);
  }, [
    currentCommandIndex,
    delayBetweenCommands,
    enableSound,
    hasStarted,
    initialDelay,
    isComplete,
    outputs,
    safeCommands,
    typedCommand,
    typingSpeed,
  ]);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#050508]/95 shadow-[0_28px_110px_rgba(0,0,0,0.48),0_0_80px_rgba(255,0,204,0.08)]",
        className,
      )}
      ref={terminalRef}
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.035] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="min-w-0 truncate font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
          achievements.session
        </span>
      </div>

      <div className="min-h-[26rem] overflow-x-hidden px-4 py-5 font-mono text-sm leading-7 text-text sm:px-6 sm:text-base">
        {visibleLines.map((line, index) =>
          line.type === "command" ? (
            <div
              className="flex min-w-0 flex-wrap gap-x-2 break-words"
              key={`${line.command}-${index}`}
            >
              <span className="shrink-0 text-primary-soft">{username}</span>
              <span className="shrink-0 text-text-muted">$</span>
              <span className="min-w-0 break-words">
                {highlightCommand(line.command)}
              </span>
            </div>
          ) : (
            <div
              className="pl-0 text-text-muted sm:pl-[calc(1ch+8.5rem)]"
              key={`${line.text}-${index}`}
            >
              <span className="break-words">{highlightOutput(line.text)}</span>
            </div>
          ),
        )}

        {!isComplete && hasStarted ? (
          <div className="flex min-w-0 flex-wrap gap-x-2 break-words">
            <span className="shrink-0 text-primary-soft">{username}</span>
            <span className="shrink-0 text-text-muted">$</span>
            <span className="min-w-0 break-words">
              {highlightCommand(typedCommand)}
              <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 bg-primary shadow-[0_0_18px_rgba(255,0,204,0.75)]" />
            </span>
          </div>
        ) : null}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_0%,rgba(255,0,204,0.16),transparent_19rem),linear-gradient(120deg,transparent,rgba(255,255,255,0.035),transparent)]"
      />
    </div>
  );
}
