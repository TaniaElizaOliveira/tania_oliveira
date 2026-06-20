"use client";

import { useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import {
  type CSSProperties,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import styles from "./project-showcase.module.css";

type Project = {
  href: string;
  role: string;
  shortDescription: string;
  slug: string;
  tag: string;
  technologies: string[];
  title: string;
  visualClass: string;
};

type ProjectShowcaseProps = {
  ariaLabel?: string;
  cardAriaLabel?: string;
  detailsLabel: string;
  locale: Locale;
  nextLabel: string;
  previousLabel: string;
  projects: Project[];
  progressLabel: string;
};

const particleCount = 18;
const autoplayDelay = 4200;

function getCircularOffset(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex;
  const half = total / 2;

  if (offset > half) {
    offset -= total;
  }

  if (offset < -half) {
    offset += total;
  }

  return offset;
}

export function ProjectShowcase({
  ariaLabel = "Selected project showcase",
  cardAriaLabel = "View details for {title}",
  detailsLabel,
  locale,
  nextLabel,
  previousLabel,
  projects,
  progressLabel,
}: ProjectShowcaseProps) {
  const showcaseRef = useRef<HTMLElement>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeProject = projects[activeIndex] ?? projects[0];
  const totalProjects = projects.length;

  const goToProject = useCallback(
    (index: number) => {
      if (totalProjects === 0) {
        return;
      }

      setActiveIndex((index + totalProjects) % totalProjects);
    },
    [totalProjects],
  );

  const goPrevious = useCallback(() => {
    goToProject(activeIndex - 1);
  }, [activeIndex, goToProject]);

  const goNext = useCallback(() => {
    goToProject(activeIndex + 1);
  }, [activeIndex, goToProject]);

  const onCarouselKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  useEffect(() => {
    if (shouldReduceMotion || isPaused || totalProjects <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % totalProjects);
    }, autoplayDelay);

    return () => {
      window.clearInterval(interval);
    };
  }, [isPaused, shouldReduceMotion, totalProjects]);

  useEffect(() => {
    const section = showcaseRef.current;

    if (!section || shouldReduceMotion) {
      return;
    }

    const compactViewport = window.matchMedia("(max-width: 767px)");

    const updateLayers = () => {
      scrollFrameRef.current = null;

      if (compactViewport.matches) {
        section.style.setProperty("--scroll-depth", "0px");
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const sectionMiddle = rect.top + rect.height / 2;
      const viewportMiddle = viewportHeight / 2;
      const progress = Math.max(
        -1,
        Math.min(1, (sectionMiddle - viewportMiddle) / viewportHeight),
      );

      section.style.setProperty("--scroll-depth", `${progress * 118}px`);
    };

    const requestUpdate = () => {
      if (scrollFrameRef.current) {
        return;
      }

      scrollFrameRef.current = window.requestAnimationFrame(updateLayers);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    compactViewport.addEventListener("change", requestUpdate);

    return () => {
      if (scrollFrameRef.current) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      compactViewport.removeEventListener("change", requestUpdate);
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    const section = showcaseRef.current;

    if (!section || shouldReduceMotion) {
      return;
    }

    const finePointer = window.matchMedia("(pointer: fine)");

    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches) {
        return;
      }

      if (pointerFrameRef.current) {
        window.cancelAnimationFrame(pointerFrameRef.current);
      }

      pointerFrameRef.current = window.requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        section.style.setProperty("--pointer-x", `${x}%`);
        section.style.setProperty("--pointer-y", `${y}%`);
        section.style.setProperty("--pointer-tilt-x", `${(x - 50) * 0.06}deg`);
        section.style.setProperty("--pointer-tilt-y", `${(50 - y) * 0.05}deg`);
      });
    };

    const onPointerLeave = () => {
      section.style.setProperty("--pointer-x", "50%");
      section.style.setProperty("--pointer-y", "48%");
      section.style.setProperty("--pointer-tilt-x", "0deg");
      section.style.setProperty("--pointer-tilt-y", "0deg");
    };

    section.addEventListener("pointermove", onPointerMove);
    section.addEventListener("pointerleave", onPointerLeave);

    return () => {
      if (pointerFrameRef.current) {
        window.cancelAnimationFrame(pointerFrameRef.current);
      }

      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [shouldReduceMotion]);

  if (!activeProject) {
    return null;
  }

  return (
    <section
      className={styles.showcase}
      ref={showcaseRef}
      role="region"
      aria-label={ariaLabel}
      style={
        {
          "--active-shift": activeIndex,
          "--progress": (activeIndex + 1) / totalProjects,
        } as CSSProperties
      }
    >
      <div aria-hidden="true" className={styles.backgroundLayers}>
        <span className={styles.atmosphere} />
        <span className={styles.spotlight} />
        <span className={styles.deepGrid} />
        <span className={styles.dataLines} />
        <span className={styles.orbPrimary} />
        <span className={styles.orbSecondary} />
        <span className={styles.geometryOne} />
        <span className={styles.geometryTwo} />
        <span className={styles.scanline} />
        <span className={styles.particleField}>
          {Array.from({ length: particleCount }, (_, index) => (
            <i key={index} />
          ))}
        </span>
      </div>

      <div
        className={styles.carouselShell}
        onBlurCapture={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
      >
        <div className={styles.carouselMeta}>
          <div>
            <p className={styles.kicker}>{activeProject.tag}</p>
            <h3 className={styles.activeTitle}>{activeProject.title}</h3>
          </div>
          <div className={styles.counter}>
            <span>{String(activeIndex + 1).padStart(2, "0")}</span>
            <span>/</span>
            <span>{String(totalProjects).padStart(2, "0")}</span>
          </div>
        </div>

        <div
          aria-label={ariaLabel}
          className={styles.carouselViewport}
          onKeyDown={onCarouselKeyDown}
          role="group"
          tabIndex={0}
        >
          <div className={styles.stage}>
            {projects.map((project, index) => {
              const offset = getCircularOffset(index, activeIndex, totalProjects);
              const absOffset = Math.abs(offset);
              const isActive = offset === 0;
              const isVisible = absOffset <= 1;
              const slideStyle = {
                "--offset": offset,
                "--abs-offset": absOffset,
                "--slide-depth": isActive ? 0 : -120,
              } as CSSProperties;

              const slideClassName = [
                styles.slide,
                isActive ? styles.slideActive : "",
                isVisible ? styles.slideVisible : styles.slideHidden,
              ]
                .filter(Boolean)
                .join(" ");

              const linkTabIndex = isVisible ? 0 : -1;

              const styleMap = styles as Record<string, string>;
              const visualClass =
                styleMap[project.visualClass] ?? styles.bgGraphite;

              return (
                <article
                  aria-hidden={isVisible ? undefined : true}
                  className={slideClassName}
                  key={project.slug}
                  style={slideStyle}
                >
                  <Link
                    aria-label={cardAriaLabel.replace("{title}", project.title)}
                    className={`${styles.cardLink} ${visualClass}`}
                    href={`/projects/${project.slug}`}
                    locale={locale}
                    tabIndex={linkTabIndex}
                  >
                    <div className={styles.cardChrome} aria-hidden="true" />
                    <div className={styles.cardTopline}>
                      <span className={styles.projectTag}>{project.tag}</span>
                      <span className={styles.slideNumber}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h4 className={styles.projectTitle}>{project.title}</h4>
                    <p className={styles.projectSummary}>
                      {project.shortDescription}
                    </p>

                    <div
                      aria-label={project.technologies.join(", ")}
                      className={styles.techList}
                    >
                      {project.technologies.map((technology) => (
                        <span className={styles.techChip} key={technology}>
                          {technology}
                        </span>
                      ))}
                    </div>

                    <span className={styles.detailsLink}>
                      {detailsLabel}
                      <ArrowUpRight aria-hidden="true" size={17} />
                    </span>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>

        <div className={styles.carouselFooter}>
          <div className={styles.controls}>
            <button
              aria-label={previousLabel}
              className={styles.controlButton}
              onClick={goPrevious}
              type="button"
            >
              <ArrowLeft aria-hidden="true" size={19} />
            </button>
            <button
              aria-label={nextLabel}
              className={styles.controlButton}
              onClick={goNext}
              type="button"
            >
              <ArrowRight aria-hidden="true" size={19} />
            </button>
          </div>

          <Link
            aria-label={cardAriaLabel.replace("{title}", activeProject.title)}
            className={styles.activeDetailButton}
            href={`/projects/${activeProject.slug}`}
            locale={locale}
          >
            {detailsLabel}
            <ArrowUpRight aria-hidden="true" size={17} />
          </Link>

          <div className={styles.progressWrap}>
            <div className={styles.progressTrack}>
              <span className={styles.progressFill} />
            </div>
            <div className={styles.dots} aria-label={progressLabel}>
              {projects.map((project, index) => (
                <button
                  aria-current={index === activeIndex ? "true" : undefined}
                  aria-label={`${progressLabel}: ${project.title}`}
                  className={styles.dot}
                  key={project.slug}
                  onClick={() => goToProject(index)}
                  type="button"
                >
                  <span />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
