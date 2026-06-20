"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type Project = {
  href: string;
  role: string;
  shortDescription: string;
  slug: string;
  tag: string;
  technologies: string[];
  title: string;
};

type ProjectDepthPanelsProps = {
  ariaLabel: string;
  contributionLabel: string;
  locale: Locale;
  projects: Project[];
  stackLabel: string;
};

export function ProjectDepthPanels({
  ariaLabel,
  contributionLabel,
  locale,
  projects,
  stackLabel,
}: ProjectDepthPanelsProps) {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isCompactViewport, setIsCompactViewport] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const shouldReduceParallax = shouldReduceMotion || isCompactViewport;

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsCompactViewport(query.matches);

    updateViewport();
    query.addEventListener("change", updateViewport);

    return () => query.removeEventListener("change", updateViewport);
  }, []);

  const firstY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceParallax ? [0, 0] : [28, -18],
  );
  const secondY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceParallax ? [0, 0] : [-10, 24],
  );
  const thirdY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceParallax ? [0, 0] : [22, -26],
  );
  const panelMotion = [firstY, secondY, thirdY];

  return (
    <section
      aria-label={ariaLabel}
      className="relative mt-12 overflow-hidden rounded-lg border border-border bg-background/70 p-5 sm:p-6 lg:p-8"
      ref={containerRef}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,0,204,0.12),transparent_18rem),radial-gradient(circle_at_78%_55%,rgba(122,122,255,0.1),transparent_20rem)]"
      />
      <div className="relative grid gap-5 lg:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            className="group relative min-h-80 overflow-hidden rounded-lg border border-border bg-surface/92 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] transition hover:border-primary/55 focus-within:border-primary/70"
            key={project.slug}
            style={{ y: panelMotion[index % panelMotion.length] }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
            />
            <Link
              aria-label={`${ariaLabel}: ${project.title}`}
              className="flex h-full flex-col"
              href={project.href}
              locale={locale}
            >
              <p className="font-display text-xl uppercase text-primary-soft">
                {project.tag}
              </p>
              <h3 className="font-display mt-5 text-4xl uppercase leading-none text-text">
                {project.title}
              </h3>
              <p className="mt-5 leading-7 text-text-muted">
                {project.shortDescription}
              </p>
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase text-text">
                  {stackLabel}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 5).map((technology) => (
                    <span
                      className="rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-medium text-text-muted"
                      key={technology}
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-6 border-t border-border pt-5">
                <p className="text-xs font-semibold uppercase text-text">
                  {contributionLabel}
                </p>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-text-muted">
                  {project.role}
                </p>
              </div>
              <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-primary-soft transition group-hover:text-primary">
                <ArrowUpRight aria-hidden="true" size={16} />
              </span>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
