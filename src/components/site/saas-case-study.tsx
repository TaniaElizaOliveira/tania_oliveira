"use client";

import { useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Database,
  Fingerprint,
  Layers3,
  LayoutDashboard,
  ServerCog,
  ShieldCheck,
  Smartphone,
  UploadCloud,
  type LucideIcon,
} from "lucide-react";
import {
  type CSSProperties,
  useEffect,
  useRef,
} from "react";
import { getSaasCaseStudyContent } from "@/data/saas-case-study";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import styles from "./saas-case-study.module.css";

type Project = {
  title: string;
};

type SaasCaseStudyProps = {
  locale: Locale;
  project: Project;
};

const architectureIcons: LucideIcon[] = [
  Smartphone,
  LayoutDashboard,
  ServerCog,
  Fingerprint,
  ShieldCheck,
  Database,
  UploadCloud,
  Activity,
];

const particleCount = 28;

export function SaasCaseStudy({ locale, project }: SaasCaseStudyProps) {
  const pageRef = useRef<HTMLElement>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const content = getSaasCaseStudyContent(locale);

  useEffect(() => {
    const page = pageRef.current;

    if (!page || shouldReduceMotion) {
      return;
    }

    const compactViewport = window.matchMedia("(max-width: 767px)");

    const updateLayers = () => {
      scrollFrameRef.current = null;

      if (compactViewport.matches) {
        page.style.setProperty("--scroll-depth", "0px");
        page.style.setProperty("--flow-depth", "0px");
        return;
      }

      const rect = page.getBoundingClientRect();
      const scrollable = Math.max(rect.height - window.innerHeight, 1);
      const progress = Math.max(0, Math.min(1, Math.abs(rect.top) / scrollable));
      const centered =
        (rect.top + rect.height / 2 - window.innerHeight / 2) /
        Math.max(window.innerHeight, 1);

      page.style.setProperty("--scroll-depth", `${progress * 260}px`);
      page.style.setProperty("--flow-depth", `${centered * 120}px`);
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
    const page = pageRef.current;

    if (!page || shouldReduceMotion) {
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
        const rect = page.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        page.style.setProperty("--pointer-x", `${x}%`);
        page.style.setProperty("--pointer-y", `${y}%`);
      });
    };

    const onPointerLeave = () => {
      page.style.setProperty("--pointer-x", "62%");
      page.style.setProperty("--pointer-y", "34%");
    };

    page.addEventListener("pointermove", onPointerMove);
    page.addEventListener("pointerleave", onPointerLeave);

    return () => {
      if (pointerFrameRef.current) {
        window.cancelAnimationFrame(pointerFrameRef.current);
      }

      page.removeEventListener("pointermove", onPointerMove);
      page.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [shouldReduceMotion]);

  return (
    <main className={styles.caseStudy} ref={pageRef}>
      <div aria-hidden="true" className={styles.parallaxScene}>
        <span className={styles.atmosphere} />
        <span className={styles.pointerSpotlight} />
        <span className={styles.gridPlane} />
        <span className={styles.dataMatrix} />
        <span className={styles.orbOne} />
        <span className={styles.orbTwo} />
        <span className={styles.orbThree} />
        <span className={styles.wireOne} />
        <span className={styles.wireTwo} />
        <span className={styles.particles}>
          {Array.from({ length: particleCount }, (_, index) => (
            <i key={index} />
          ))}
        </span>
      </div>

      <section className={styles.hero} aria-labelledby="saas-case-title">
        <div className={styles.heroInner}>
          <Link className={styles.backLink} href="/projects" locale={locale}>
            <ArrowLeft aria-hidden="true" size={18} />
            {content.backLabel}
          </Link>

          <div className={styles.heroGrid}>
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>{content.eyebrow}</p>
              <p className={styles.category}>{content.category}</p>
              <h1 id="saas-case-title" className={styles.heroTitle}>
                {project.title}
              </h1>
              <p className={styles.heroDescription}>{content.heroDescription}</p>
              <div className={styles.heroChips} aria-label="Technology stack">
                {content.technologyChips.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </div>

            <div className={styles.systemMap} aria-hidden="true">
              <div className={styles.mapCore}>
                <Layers3 size={34} />
                <span>SaaS Core</span>
              </div>
              <span className={`${styles.mapNode} ${styles.mapNodePwa}`}>
                PWA
              </span>
              <span className={`${styles.mapNode} ${styles.mapNodeApi}`}>
                API
              </span>
              <span className={`${styles.mapNode} ${styles.mapNodeAuth}`}>
                JWT
              </span>
              <span className={`${styles.mapNode} ${styles.mapNodeData}`}>
                MongoDB
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.architecture} aria-labelledby="architecture-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Architecture Depth</p>
          <h2 id="architecture-title">{content.architectureTitle}</h2>
          <p>{content.architectureIntro}</p>
        </div>

        <div className={styles.architectureGrid}>
          {content.architectureBlocks.map((block, index) => {
            const Icon = architectureIcons[index] ?? ServerCog;

            return (
              <article
                className={styles.architectureCard}
                key={block.title}
                style={{ "--depth-index": index } as CSSProperties}
              >
                <div className={styles.cardIcon}>
                  <Icon aria-hidden="true" size={22} />
                </div>
                <div>
                  <div className={styles.cardTopline}>
                    <h3>{block.title}</h3>
                    <span>{block.label}</span>
                  </div>
                  <p>{block.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.flow} aria-labelledby="flow-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>System Flow</p>
          <h2 id="flow-title">{content.flowTitle}</h2>
          <p>{content.flowIntro}</p>
        </div>

        <ol className={styles.timeline}>
          {content.flowSteps.map((step, index) => (
            <li
              className={styles.timelineStep}
              key={step}
              style={{ "--step-index": index } as CSSProperties}
            >
              <span className={styles.stepNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.stepLabel}>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.built} aria-labelledby="built-title">
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Contribution</p>
          <h2 id="built-title">{content.builtTitle}</h2>
          <p>{content.builtIntro}</p>
        </div>

        <div className={styles.builtGrid}>
          {content.builtCards.map((card) => (
            <article className={styles.builtCard} key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <nav className={styles.finalNav} aria-label="Project navigation">
        <Link
          className={styles.navButtonSecondary}
          href="/projects"
          locale={locale}
        >
          <ArrowLeft aria-hidden="true" size={18} />
          {content.backLabel}
        </Link>
        <Link
          className={styles.navButtonPrimary}
          href="/projects/erp-crm-connector"
          locale={locale}
        >
          {content.nextLabel}
          <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </nav>
    </main>
  );
}
