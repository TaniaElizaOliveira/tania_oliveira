"use client";

import {
  type CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

type BinaryPortraitProps = {
  src: string;
  resolution?: number;
  color?: string;
  backgroundColor?: string;
  className?: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
  contrast?: number;
  brightnessThreshold?: number;
  minCharOpacity?: number;
  maxCharOpacity?: number;
  sourceImageOpacity?: number;
  animated?: boolean;
  animationDuration?: number;
};

type Crop = {
  sourceHeight: number;
  sourceWidth: number;
  sourceX: number;
  sourceY: number;
};

const characterAspect = 0.56;
const lineHeightRatio = 0.9;

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

function getCoverCrop(
  image: HTMLImageElement,
  width: number,
  height: number,
  objectPosition: string,
): Crop {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const targetRatio = width / height;
  const position = parseObjectPosition(objectPosition);

  if (imageRatio > targetRatio) {
    const sourceWidth = image.naturalHeight * targetRatio;

    return {
      sourceHeight: image.naturalHeight,
      sourceWidth,
      sourceX: (image.naturalWidth - sourceWidth) * position.x,
      sourceY: 0,
    };
  }

  const sourceHeight = image.naturalWidth / targetRatio;

  return {
    sourceHeight,
    sourceWidth: image.naturalWidth,
    sourceX: 0,
    sourceY: (image.naturalHeight - sourceHeight) * position.y,
  };
}

function drawSourceImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
  objectFit: "cover" | "contain",
  objectPosition: string,
) {
  if (objectFit === "cover") {
    const crop = getCoverCrop(image, width, height, objectPosition);

    context.drawImage(
      image,
      crop.sourceX,
      crop.sourceY,
      crop.sourceWidth,
      crop.sourceHeight,
      0,
      0,
      width,
      height,
    );
    return;
  }

  const position = parseObjectPosition(objectPosition);
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  const drawX = (width - drawWidth) * position.x;
  const drawY = (height - drawHeight) * position.y;

  context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
}

export function BinaryPortrait({
  src,
  resolution = 76,
  color = "rgba(255,255,255,0.82)",
  backgroundColor = "transparent",
  className,
  objectFit = "cover",
  objectPosition = "center center",
  contrast = 2.6,
  brightnessThreshold = 0.22,
  minCharOpacity = 0.06,
  maxCharOpacity = 0.95,
  sourceImageOpacity = 0.08,
  animated = true,
  animationDuration = 1.2,
}: BinaryPortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const renderPortrait = useCallback(
    (progress = 1) => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      const image = imageRef.current;

      if (!container || !canvas || !image) {
        return;
      }

      const width = container.clientWidth;
      const height = container.clientHeight;

      if (width <= 0 || height <= 0) {
        return;
      }

      const context = canvas.getContext("2d");

      if (!context) {
        setHasError(true);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const columns = Math.max(
        36,
        Math.min(resolution, width < 640 ? Math.round(resolution * 0.78) : resolution),
      );
      const fontSize = Math.max(6, width / (columns * characterAspect));
      const lineHeight = fontSize * lineHeightRatio;
      const rows = Math.max(24, Math.ceil(height / lineHeight));
      const sampleCanvas = document.createElement("canvas");
      const sampleContext = sampleCanvas.getContext("2d", {
        willReadFrequently: true,
      });

      if (!sampleContext) {
        setHasError(true);
        return;
      }

      sampleCanvas.width = columns;
      sampleCanvas.height = rows;
      sampleContext.clearRect(0, 0, columns, rows);
      drawSourceImage(
        sampleContext,
        image,
        columns,
        rows,
        objectFit,
        objectPosition,
      );

      let pixels: Uint8ClampedArray;

      try {
        pixels = sampleContext.getImageData(0, 0, columns, rows).data;
      } catch {
        setHasError(true);
        return;
      }

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);

      if (backgroundColor !== "transparent") {
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, width, height);
      }

      if (sourceImageOpacity > 0) {
        context.save();
        context.globalAlpha = sourceImageOpacity * progress;
        context.filter = "grayscale(1)";
        drawSourceImage(context, image, width, height, objectFit, objectPosition);
        context.restore();
      }

      context.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace`;
      context.textAlign = "center";
      context.textBaseline = "top";
      context.shadowBlur = 5;
      context.shadowColor = "rgba(255, 0, 204, 0.18)";

      const charWidth = width / columns;

      for (let y = 0; y < rows; y += 1) {
        const drawY = y * lineHeight;

        for (let x = 0; x < columns; x += 1) {
          const index = (y * columns + x) * 4;
          const red = pixels[index] ?? 0;
          const green = pixels[index + 1] ?? 0;
          const blue = pixels[index + 2] ?? 0;
          const alpha = pixels[index + 3] ?? 0;
          const brightness =
            alpha === 0 ? 0 : (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
          const contrasted = clamp((brightness - 0.5) * contrast + 0.5);

          if (contrasted < brightnessThreshold) {
            continue;
          }

          const character = contrasted > 0.58 ? "1" : "0";
          const characterAlpha =
            (minCharOpacity + contrasted * (maxCharOpacity - minCharOpacity)) *
            progress;

          context.globalAlpha = clamp(characterAlpha);
          context.fillStyle = color;
          context.fillText(character, x * charWidth + charWidth / 2, drawY);
        }
      }

      context.globalAlpha = 1;
      context.shadowBlur = 0;
      setHasError(false);
    },
    [
      backgroundColor,
      brightnessThreshold,
      color,
      contrast,
      maxCharOpacity,
      minCharOpacity,
      objectFit,
      objectPosition,
      resolution,
      sourceImageOpacity,
    ],
  );

  useEffect(() => {
    let isCancelled = false;
    const image = new Image();

    image.crossOrigin = "anonymous";
    image.onload = () => {
      if (isCancelled) {
        return;
      }

      imageRef.current = image;
      setIsLoaded(true);
      setHasError(false);
    };
    image.onerror = () => {
      if (!isCancelled) {
        setHasError(true);
      }
    };
    image.src = src;

    return () => {
      isCancelled = true;
    };
  }, [src]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!animated) {
      animationRef.current = requestAnimationFrame(() => renderPortrait(1));

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }

    const startedAt = performance.now();
    const duration = Math.max(0.1, animationDuration) * 1000;

    const animate = (time: number) => {
      const progress = clamp((time - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);

      renderPortrait(eased);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animated, animationDuration, isLoaded, renderPortrait]);

  useEffect(() => {
    if (!isLoaded || !containerRef.current) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => renderPortrait(1));
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [isLoaded, renderPortrait]);

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      ref={containerRef}
      style={{ backgroundColor } as CSSProperties}
    >
      {hasError ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,204,0.12),transparent_62%)]" />
      ) : null}
      <canvas
        aria-hidden="true"
        className="block h-full w-full"
        ref={canvasRef}
      />
    </div>
  );
}
