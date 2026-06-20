"use client";

import React, {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion, useInView } from "framer-motion";
import type { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const ASCII_CHARSETS = {
  standard: " .,:;i1tfLCG08@",
  blocks: " ░▒▓█",
  binary: " 01",
  dots: " ·•●",
  minimal: " .:░▒",
  dense:
    " .'`^\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
  arrows: " ←↑→↓↔↕↖↗↘↙",
  stars: " ·✦✧★",
  hash: " -=#",
  pipes: " |/─\\│",
  braille: " ⠁⠃⠇⠏⠟⠿⡿⣿",
  circles: " ○◔◑◕●",
  squares: " ▢▣▤▥▦▧▨▩",
  hearts: " ♡♥",
  math: " +-×÷=≠≈∞",
} as const;

type CharsetPreset = keyof typeof ASCII_CHARSETS;

type AsciiArtProps = {
  src: string | StaticImageData;
  resolution?: number;
  charset?: CharsetPreset | string;
  color?: string;
  backgroundColor?: string;
  inverted?: boolean;
  colored?: boolean;
  animated?: boolean;
  animationStyle?: "fade" | "typewriter" | "matrix" | "none";
  animationDuration?: number;
  fontFamily?: string;
  className?: string;
  animateOnView?: boolean;
  objectFit?: "cover" | "contain" | "fill";
  objectPosition?: string;
  objectScale?: number;
  sourceImageOpacity?: number;
  ariaLabel?: string;
};

type AsciiPixel = {
  char: string;
  r: number;
  g: number;
  b: number;
  alpha: number;
};

const MATRIX_CHARSET =
  "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ";

function isCharsetPreset(value: string): value is CharsetPreset {
  return value in ASCII_CHARSETS;
}

function resolveCharset(charset: string) {
  return isCharsetPreset(charset) ? ASCII_CHARSETS[charset] : charset;
}

function resolveImageSource(src: string | StaticImageData) {
  return typeof src === "string" ? src : src.src;
}

function resolveCssColor(color: string, element: HTMLElement | null) {
  if (!color) {
    return color;
  }

  if (color.startsWith("var(")) {
    if (!element) {
      return "#ffffff";
    }

    const tempDiv = document.createElement("div");
    tempDiv.style.color = color;
    element.appendChild(tempDiv);
    const computedColor = getComputedStyle(tempDiv).color;
    element.removeChild(tempDiv);

    return computedColor || "#ffffff";
  }

  return color;
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function parsePositionValue(value: string | undefined, fallback: number) {
  if (!value) {
    return fallback;
  }

  const normalized = value.trim().toLowerCase();

  if (normalized === "left" || normalized === "top") {
    return 0;
  }

  if (normalized === "center") {
    return 0.5;
  }

  if (normalized === "right" || normalized === "bottom") {
    return 1;
  }

  if (normalized.endsWith("%")) {
    return clamp(Number.parseFloat(normalized) / 100);
  }

  return fallback;
}

function parseObjectPosition(objectPosition: string) {
  const [xPosition, yPosition] = objectPosition.split(/\s+/);

  return {
    x: parsePositionValue(xPosition, 0.5),
    y: parsePositionValue(yPosition ?? xPosition, 0.5),
  };
}

export const AsciiArt: React.FC<AsciiArtProps> = ({
  src,
  resolution = 80,
  charset = "standard",
  color = "#ffffff",
  backgroundColor = "transparent",
  inverted = false,
  colored = false,
  animated = true,
  animationStyle = "fade",
  animationDuration = 1,
  fontFamily = "monospace",
  className,
  animateOnView = true,
  objectFit = "cover",
  objectPosition = "center center",
  objectScale = 1,
  sourceImageOpacity = 0,
  ariaLabel,
}) => {
  const uniqueId = useId();
  const [asciiData, setAsciiData] = useState<AsciiPixel[][]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const shouldStartAnimation = animated && animateOnView ? isInView : animated;
  const shouldShowStatic = !animated || animationStyle === "none";
  const resolvedCharset = resolveCharset(charset);
  const effectiveCharset = inverted
    ? resolvedCharset.split("").reverse().join("")
    : resolvedCharset;
  const defaultColor = inverted ? "#ffffff" : "#000000";
  const textColor = color || defaultColor;
  const imageSource = resolveImageSource(src);

  useEffect(() => {
    let isCancelled = false;
    const img = new Image();

    img.crossOrigin = "anonymous";
    img.src = imageSource;

    img.onload = () => {
      if (isCancelled) {
        return;
      }

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        setError(true);
        return;
      }

      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      const imgAspect = imgWidth / imgHeight;
      const charAspectRatio = 0.55;
      const cols = resolution;
      const container = containerRef.current;
      const visualAspect = container
        ? Math.max(0.2, container.clientWidth / Math.max(1, container.clientHeight))
        : 1;
      const rows = Math.max(
        20,
        Math.floor((cols / visualAspect) * charAspectRatio),
      );
      const position = parseObjectPosition(objectPosition);

      canvas.width = cols;
      canvas.height = rows;

      let sx = 0;
      let sy = 0;
      let sw = imgWidth;
      let sh = imgHeight;

      if (objectFit === "cover") {
        if (imgAspect > visualAspect) {
          sw = imgHeight * visualAspect;
          sx = (imgWidth - sw) * position.x;
        } else {
          sh = imgWidth / visualAspect;
          sy = (imgHeight - sh) * position.y;
        }
      } else if (objectFit === "contain") {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, cols, rows);

        let dw;
        let dh;
        let dx;
        let dy;

        if (imgAspect > visualAspect) {
          dw = cols;
          dh = cols / imgAspect / charAspectRatio;
          dx = 0;
          dy = (rows - dh) / 2;
        } else {
          dh = rows;
          dw = (rows * imgAspect) / charAspectRatio;
          dx = (cols - dw) / 2;
          dy = 0;
        }

        dw *= objectScale;
        dh *= objectScale;
        dx = (cols - dw) * position.x;
        dy = (rows - dh) * position.y;

        ctx.drawImage(img, dx, dy, dw, dh);
      }

      if (objectFit !== "contain") {
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
      }

      let imageData: ImageData;

      try {
        imageData = ctx.getImageData(0, 0, cols, rows);
      } catch {
        setError(true);
        return;
      }

      const data = imageData.data;
      const result: AsciiPixel[][] = [];

      for (let y = 0; y < rows; y += 1) {
        const row: AsciiPixel[] = [];

        for (let x = 0; x < cols; x += 1) {
          const idx = (y * cols + x) * 4;
          const r = data[idx] ?? 0;
          const g = data[idx + 1] ?? 0;
          const b = data[idx + 2] ?? 0;
          const a = data[idx + 3] ?? 0;
          const brightness =
            a === 0 ? 0 : (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          const adjustedBrightness = clamp(brightness);
          const charIndex = Math.floor(
            adjustedBrightness * (effectiveCharset.length - 1),
          );
          const char = effectiveCharset[charIndex] || " ";
          const alpha =
            char.trim().length === 0
              ? 0
              : clamp(0.18 + adjustedBrightness * 0.82);

          row.push({ alpha, b, char, g, r });
        }

        result.push(row);
      }

      setAsciiData(result);
      setIsLoaded(true);
      setError(false);
    };

    img.onerror = () => {
      if (!isCancelled) {
        setError(true);
      }
    };

    return () => {
      isCancelled = true;
    };
  }, [
    effectiveCharset,
    imageSource,
    objectFit,
    objectPosition,
    objectScale,
    resolution,
  ]);

  const drawCanvas = useCallback(
    (progress = 1, matrixProgress?: number) => {
      const canvas = canvasRef.current;
      const container = containerRef.current;

      if (!canvas || !container || asciiData.length === 0) {
        return;
      }

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      if (containerWidth === 0 || containerHeight === 0) {
        return;
      }

      canvas.width = containerWidth * dpr;
      canvas.height = containerHeight * dpr;
      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${containerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const resolvedBgColor = resolveCssColor(backgroundColor, container);
      const resolvedTextColor = resolveCssColor(textColor, container);

      ctx.clearRect(0, 0, containerWidth, containerHeight);

      if (resolvedBgColor !== "transparent") {
        ctx.fillStyle = resolvedBgColor;
        ctx.fillRect(0, 0, containerWidth, containerHeight);
      }

      const rows = asciiData.length;
      const cols = asciiData[0]?.length || 0;

      if (cols === 0) {
        return;
      }

      const charWidth = containerWidth / cols;
      const charHeight = containerHeight / rows;
      const fontSize = Math.min(charWidth * 1.82, charHeight * 1.24);
      const totalChars = rows * cols;
      const revealedChars = Math.floor(progress * totalChars);

      if (sourceImageOpacity > 0) {
        ctx.globalAlpha = sourceImageOpacity;
      }

      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.textBaseline = "top";
      ctx.textAlign = "center";
      ctx.shadowColor = "rgba(255, 0, 204, 0.2)";
      ctx.shadowBlur = 4;

      let charIndex = 0;

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < cols; x += 1) {
          const pixel = asciiData[y]?.[x];

          if (!pixel || pixel.alpha <= 0) {
            charIndex += 1;
            continue;
          }

          const cx = x * charWidth + charWidth / 2;
          const cy = y * charHeight;

          if (animationStyle === "typewriter" && charIndex >= revealedChars) {
            charIndex += 1;
            continue;
          }

          let displayChar = pixel.char;
          let displayColor = colored
            ? `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`
            : resolvedTextColor;
          let alpha = pixel.alpha;

          if (animationStyle === "matrix" && matrixProgress !== undefined) {
            const charProgress = (x * 0.02 + y * 0.01) / 2;

            if (matrixProgress < charProgress) {
              charIndex += 1;
              continue;
            }

            if (matrixProgress < charProgress + 0.15) {
              displayChar =
                MATRIX_CHARSET[
                  Math.floor(Math.random() * MATRIX_CHARSET.length)
                ] ?? displayChar;
              displayColor = "#00ff00";
              ctx.shadowColor = "#00ff00";
              ctx.shadowBlur = 5;
            } else {
              ctx.shadowColor = "rgba(255, 0, 204, 0.2)";
              ctx.shadowBlur = 4;
            }
          }

          if (animationStyle === "fade") {
            alpha *= progress;
          }

          ctx.fillStyle = displayColor;
          ctx.globalAlpha = alpha;
          ctx.fillText(displayChar, cx, cy);
          charIndex += 1;
        }
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
    },
    [
      animationStyle,
      asciiData,
      backgroundColor,
      colored,
      fontFamily,
      sourceImageOpacity,
      textColor,
    ],
  );

  useEffect(() => {
    if (!isLoaded || asciiData.length === 0) {
      return;
    }

    const draw = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;

      if (!canvas || !container) {
        requestAnimationFrame(draw);
        return;
      }

      if (shouldShowStatic || hasAnimated || !shouldStartAnimation) {
        drawCanvas(1);
        return;
      }

      const startTime = performance.now();
      const duration =
        animationStyle === "fade"
          ? animationDuration * 1000
          : animationStyle === "typewriter"
            ? asciiData.length * (asciiData[0]?.length ?? 1) * 2
            : animationStyle === "matrix"
              ? 3000
              : 1000;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        if (animationStyle === "matrix") {
          drawCanvas(1, progress);
        } else {
          drawCanvas(progress);
        }

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setHasAnimated(true);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    };

    const frameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameId);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    animationDuration,
    animationStyle,
    asciiData,
    drawCanvas,
    hasAnimated,
    isLoaded,
    shouldShowStatic,
    shouldStartAnimation,
  ]);

  useIsomorphicLayoutEffect(() => {
    if (!isLoaded || asciiData.length === 0) {
      return;
    }

    drawCanvas(1);
  }, [asciiData, drawCanvas, isLoaded]);

  useEffect(() => {
    if (!isLoaded || asciiData.length === 0) {
      return;
    }

    const container = containerRef.current;

    if (!container) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      drawCanvas(1);
    });

    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, [asciiData, drawCanvas, isLoaded]);

  if (error) {
    return <div className={cn("bg-transparent", className)} />;
  }

  const canvasElement = (
    <canvas
      aria-label={ariaLabel ?? "ASCII art rendering of image"}
      className="block h-full w-full"
      id={`ascii-canvas-${uniqueId}`}
      key={uniqueId}
      ref={canvasRef}
      role="img"
    />
  );

  if (!isLoaded) {
    return (
      <div
        className={cn("flex items-center justify-center bg-transparent", className)}
        style={{ backgroundColor }}
      />
    );
  }

  if (animationStyle === "fade" && animated && !hasAnimated) {
    return (
      <motion.div
        animate={shouldStartAnimation ? { opacity: 1 } : { opacity: 0 }}
        className={cn("overflow-hidden", className)}
        initial={{ opacity: 0 }}
        ref={containerRef}
        style={{ backgroundColor }}
        transition={{ duration: animationDuration * 0.3 }}
      >
        {canvasElement}
      </motion.div>
    );
  }

  return (
    <div
      className={cn("overflow-hidden", className)}
      ref={containerRef}
      style={{ backgroundColor }}
    >
      {canvasElement}
    </div>
  );
};

export const AsciiArtStatic: React.FC<
  Omit<AsciiArtProps, "animated" | "animationStyle">
> = (props) => <AsciiArt {...props} animated={false} animationStyle="none" />;
