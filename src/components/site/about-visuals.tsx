"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { PointerEvent } from "react";

type AboutVisualLocale = "pt" | "en" | "fr" | "es";

type AboutVisualProps = {
  locale?: string;
};

function getAboutVisualLocale(locale?: string): AboutVisualLocale {
  return locale === "en" || locale === "fr" || locale === "es" ? locale : "pt";
}

const timelineItemsByLocale = {
  pt: [
    {
      year: "2021",
      title: "Primeiro contacto profissional com frontend",
      text: "Angular, JavaScript, Bootstrap e integração com APIs.",
    },
    {
      year: "2024",
      title: "Aplicações web e backend foundations",
      text: "PHP, Laravel, MySQL, HTML, CSS, JavaScript e aplicações internas.",
    },
    {
      year: "2025",
      title: "Projetos reais em ambiente profissional",
      text: "React, Vite, APIs, Sage 50c, WooCommerce, CRM, backoffice, deploy e validação.",
    },
    {
      year: "2026",
      title: "Perfil completo em construção",
      text: "Frontend moderno, integração de sistemas, dados, backend foundations e aplicações empresariais.",
    },
  ],
  en: [
    {
      year: "2021",
      title: "First professional contact with frontend",
      text: "Angular, JavaScript, Bootstrap and API integration.",
    },
    {
      year: "2024",
      title: "Web applications and backend foundations",
      text: "PHP, Laravel, MySQL, HTML, CSS, JavaScript and internal applications.",
    },
    {
      year: "2025",
      title: "Real projects in a professional environment",
      text: "React, Vite, APIs, Sage 50c, WooCommerce, CRM, backoffice, deployment and validation.",
    },
    {
      year: "2026",
      title: "Complete profile in progress",
      text: "Modern frontend, systems integration, data, backend foundations and business applications.",
    },
  ],
  fr: [
    {
      year: "2021",
      title: "Premier contact professionnel avec le frontend",
      text: "Angular, JavaScript, Bootstrap et intégration d'APIs.",
    },
    {
      year: "2024",
      title: "Applications web et bases backend",
      text: "PHP, Laravel, MySQL, HTML, CSS, JavaScript et applications internes.",
    },
    {
      year: "2025",
      title: "Projets réels en contexte professionnel",
      text: "React, Vite, APIs, Sage 50c, WooCommerce, CRM, backoffice, déploiement et validation.",
    },
    {
      year: "2026",
      title: "Profil complet en construction",
      text: "Frontend moderne, intégration de systèmes, données, bases backend et applications d'entreprise.",
    },
  ],
  es: [
    {
      year: "2021",
      title: "Primer contacto profesional con frontend",
      text: "Angular, JavaScript, Bootstrap e integración con APIs.",
    },
    {
      year: "2024",
      title: "Aplicaciones web y bases backend",
      text: "PHP, Laravel, MySQL, HTML, CSS, JavaScript y aplicaciones internas.",
    },
    {
      year: "2025",
      title: "Proyectos reales en entorno profesional",
      text: "React, Vite, APIs, Sage 50c, WooCommerce, CRM, backoffice, despliegue y validación.",
    },
    {
      year: "2026",
      title: "Perfil completo en construcción",
      text: "Frontend moderno, integración de sistemas, datos, bases backend y aplicaciones empresariales.",
    },
  ],
};

const terminalLinesByLocale = {
  pt: [
    ["> tania.learns.by()", "building · testing · fixing · documenting"],
    ["> tania.connects()", "interface · api · data · business rules"],
    ["> tania.focus", "frontend_with_context"],
    ["> tania.status", "junior_but_building_real_solutions"],
  ],
  en: [
    ["> tania.learns.by()", "building · testing · fixing · documenting"],
    ["> tania.connects()", "interface · api · data · business rules"],
    ["> tania.focus", "frontend_with_context"],
    ["> tania.status", "junior_but_building_real_solutions"],
  ],
  fr: [
    ["> tania.apprend.par()", "construire · tester · corriger · documenter"],
    ["> tania.connecte()", "interface · api · données · règles métier"],
    ["> tania.focus", "frontend_avec_contexte"],
    ["> tania.status", "junior_mais_deja_sur_des_projets_reels"],
  ],
  es: [
    ["> tania.aprende.con()", "construir · probar · corregir · documentar"],
    ["> tania.conecta()", "interfaz · api · datos · reglas de negocio"],
    ["> tania.focus", "frontend_con_contexto"],
    ["> tania.status", "junior_pero_construyendo_soluciones_reales"],
  ],
};

const stackLayersByLocale = {
  pt: [
    {
      footer: "Onde transformo lógica em experiência.",
      items: ["React", "Vite", "JavaScript", "TypeScript", "HTML", "CSS"],
      text: "Interfaces, experiência e interação.",
      title: "FRONTEND",
    },
    {
      footer: "Onde a interface se liga ao sistema real.",
      items: ["REST APIs", "Sage 50c", "WooCommerce", "CRM", "C#/.NET", "MongoDB", "MySQL"],
      text: "Dados, APIs e sistemas ligados.",
      title: "BACKEND & INTEGRAÇÃO",
    },
    {
      footer: "Onde o projeto sai do código e ganha vida.",
      items: ["GitHub", "Render", "Vercel", "CI/CD", "Deploy", "Validação técnica", "Documentação"],
      text: "Versionamento, publicação e fluxo de trabalho.",
      title: "WORKFLOW & ENTREGA",
    },
  ],
  en: [
    {
      footer: "Where I turn logic into experience.",
      items: ["React", "Vite", "JavaScript", "TypeScript", "HTML", "CSS"],
      text: "Interfaces, experience and interaction.",
      title: "FRONTEND",
    },
    {
      footer: "Where the interface connects to the real system.",
      items: ["REST APIs", "Sage 50c", "WooCommerce", "CRM", "C#/.NET", "MongoDB", "MySQL"],
      text: "Data, APIs and connected systems.",
      title: "BACKEND & INTEGRATION",
    },
    {
      footer: "Where the project leaves code and becomes real.",
      items: ["GitHub", "Render", "Vercel", "CI/CD", "Deploy", "Technical validation", "Documentation"],
      text: "Version control, publishing and workflow.",
      title: "WORKFLOW & DELIVERY",
    },
  ],
  fr: [
    {
      footer: "Là où je transforme la logique en expérience.",
      items: ["React", "Vite", "JavaScript", "TypeScript", "HTML", "CSS"],
      text: "Interfaces, expérience et interaction.",
      title: "FRONTEND",
    },
    {
      footer: "Là où l'interface se connecte au système réel.",
      items: ["REST APIs", "Sage 50c", "WooCommerce", "CRM", "C#/.NET", "MongoDB", "MySQL"],
      text: "Données, APIs et systèmes connectés.",
      title: "BACKEND & INTÉGRATION",
    },
    {
      footer: "Là où le projet sort du code et devient réel.",
      items: ["GitHub", "Render", "Vercel", "CI/CD", "Déploiement", "Validation technique", "Documentation"],
      text: "Versionnement, publication et flux de travail.",
      title: "WORKFLOW & LIVRAISON",
    },
  ],
  es: [
    {
      footer: "Donde transformo lógica en experiencia.",
      items: ["React", "Vite", "JavaScript", "TypeScript", "HTML", "CSS"],
      text: "Interfaces, experiencia e interacción.",
      title: "FRONTEND",
    },
    {
      footer: "Donde la interfaz se conecta al sistema real.",
      items: ["REST APIs", "Sage 50c", "WooCommerce", "CRM", "C#/.NET", "MongoDB", "MySQL"],
      text: "Datos, APIs y sistemas conectados.",
      title: "BACKEND & INTEGRACIÓN",
    },
    {
      footer: "Donde el proyecto sale del código y cobra vida.",
      items: ["GitHub", "Render", "Vercel", "CI/CD", "Deploy", "Validación técnica", "Documentación"],
      text: "Versionamiento, publicación y flujo de trabajo.",
      title: "WORKFLOW & ENTREGA",
    },
  ],
};

const codeTabs = [
  {
    id: "about",
    label: "About.tsx",
    lines: [
      [
        ["keyword", "const"],
        ["plain", " tania = "],
        ["punctuation", "{"],
      ],
      [
        ["property", "  role"],
        ["punctuation", ": "],
        ["string", '"Frontend + Integration Developer"'],
        ["punctuation", ","],
      ],
      [
        ["property", "  stack"],
        ["punctuation", ": ["],
        ["token:React", '"React"'],
        ["punctuation", ", "],
        ["string", '"Vite"'],
        ["punctuation", ", "],
        ["token:APIs", '"APIs"'],
        ["punctuation", ", "],
        ["token:Sage 50c", '"Sage 50c"'],
        ["punctuation", "],"],
      ],
      [
        ["property", "  focus"],
        ["punctuation", ": "],
        ["string", '"business systems"'],
        ["punctuation", ","],
      ],
      [
        ["property", "  approach"],
        ["punctuation", ": "],
        ["string", '"build · validate · document"'],
      ],
      [["punctuation", "}"]],
    ],
  },
  {
    id: "system",
    label: "system.json",
    lines: [
      [["punctuation", "{"]],
      [
        ["property", '  "stack"'],
        ["punctuation", ": ["],
        ["token:React", '"React"'],
        ["punctuation", ", "],
        ["string", '"Vite"'],
        ["punctuation", ", "],
        ["token:APIs", '"REST APIs"'],
        ["punctuation", ", "],
        ["token:Sage 50c", '"Sage 50c"'],
        ["punctuation", "],"],
      ],
      [
        ["property", '  "focus"'],
        ["punctuation", ": "],
        ["string", '"business systems"'],
        ["punctuation", ","],
      ],
      [
        ["property", '  "projects"'],
        ["punctuation", ": ["],
        ["string", '"backoffice"'],
        ["punctuation", ", "],
        ["string", '"e-commerce"'],
        ["punctuation", ", "],
        ["string", '"integrations"'],
        ["punctuation", "]"],
      ],
      [["punctuation", "}"]],
    ],
  },
  {
    id: "preview",
    label: "preview",
    lines: [
      [
        ["tag", "<ProfileCard"],
        ["plain", " name="],
        ["string", '"Tânia Oliveira"'],
      ],
      [
        ["plain", "  role="],
        ["string", '"Frontend + Integration Developer"'],
      ],
      [
        ["plain", "  stack="],
        ["punctuation", "{["],
        ["token:React", '"React"'],
        ["punctuation", ", "],
        ["string", '"Vite"'],
        ["punctuation", ", "],
        ["token:APIs", '"APIs"'],
        ["punctuation", ", "],
        ["token:Sage 50c", '"Sage 50c"'],
        ["punctuation", "]}"],
      ],
      [
        ["plain", "  status="],
        ["string", '"building real solutions"'],
      ],
      [["tag", "/>"]],
    ],
  },
] as const;

const previewChips = ["React", "Vite", "APIs", "Sage 50c"];

function useReducedMotionPreference() {
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

export function CodeToProductHero() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotionPreference();
  const [activeTab, setActiveTab] = useState<(typeof codeTabs)[number]["id"]>(
    "about",
  );
  const [activeToken, setActiveToken] = useState<string | null>(null);
  const currentTab = codeTabs.find((tab) => tab.id === activeTab) ?? codeTabs[0];

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || window.innerWidth < 768 || event.pointerType !== "mouse") {
      return;
    }

    const element = ref.current;

    if (!element) {
      return;
    }

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    element.style.setProperty("--preview-x", `${x * 8}px`);
    element.style.setProperty("--preview-y", `${y * 8}px`);
    element.style.setProperty("--preview-rx", `${y * -1.8}deg`);
    element.style.setProperty("--preview-ry", `${x * 2.4}deg`);
  };

  const resetParallax = () => {
    const element = ref.current;

    if (!element) {
      return;
    }

    element.style.setProperty("--preview-x", "0px");
    element.style.setProperty("--preview-y", "0px");
    element.style.setProperty("--preview-rx", "0deg");
    element.style.setProperty("--preview-ry", "0deg");
  };

  const tokenClassName = (type: string) => {
    const token = type.startsWith("token:") ? type.replace("token:", "") : null;
    const isMatched = token && activeToken === token;

    if (isMatched) {
      return "rounded bg-primary/20 px-1 text-primary-soft shadow-[0_0_18px_rgba(255,0,204,0.24)]";
    }

    if (token) {
      return "text-primary-soft";
    }

    const styles: Record<string, string> = {
      keyword: "text-accent",
      plain: "text-text-muted",
      property: "text-primary-soft",
      punctuation: "text-text-muted",
      string: "text-text",
      tag: "text-primary",
    };

    return styles[type] ?? "text-text";
  };

  return (
    <section
      aria-label="Code to product live preview"
      className="relative overflow-hidden rounded-lg border border-primary/25 bg-[radial-gradient(circle_at_18%_12%,rgba(255,0,204,0.16),transparent_17rem),radial-gradient(circle_at_88%_18%,rgba(122,122,255,0.12),transparent_18rem),linear-gradient(145deg,rgba(17,17,24,0.96),rgba(5,5,8,0.94))] p-3 shadow-[0_30px_100px_rgba(0,0,0,0.42),0_0_42px_rgba(255,0,204,0.1)] [--preview-rx:0deg] [--preview-ry:0deg] [--preview-x:0px] [--preview-y:0px] sm:p-4"
      onPointerLeave={() => {
        resetParallax();
        setActiveToken(null);
      }}
      onPointerMove={onPointerMove}
      ref={ref}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />
      <div
        className="relative transition-transform duration-300 ease-out"
        style={
          {
            transform:
              "translate3d(var(--preview-x), var(--preview-y), 0) rotateX(var(--preview-rx)) rotateY(var(--preview-ry))",
            transformStyle: "preserve-3d",
          } as CSSProperties
        }
      >
        <div className="overflow-hidden rounded-lg border border-white/10 bg-background/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.035] px-3 py-3 sm:px-4">
            <div
              aria-label="Code preview tabs"
              className="flex min-w-0 flex-wrap gap-2"
              role="tablist"
            >
              {codeTabs.map((tab) => (
                <button
                  aria-selected={activeTab === tab.id}
                  className={`rounded-md border px-3 py-1.5 font-mono text-[0.68rem] font-black uppercase tracking-[0.12em] transition ${
                    activeTab === tab.id
                      ? "border-primary/65 bg-primary/14 text-primary-soft shadow-[0_0_20px_rgba(255,0,204,0.14)]"
                      : "border-white/10 bg-surface/70 text-text-muted hover:border-primary/45 hover:text-text"
                  }`}
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  role="tab"
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 font-mono text-[0.65rem] font-black uppercase tracking-[0.18em] text-primary-soft">
              LIVE PREVIEW
            </span>
          </div>

          <div className="grid gap-0 lg:grid-cols-[1.06fr_0.94fr]">
            <div className="min-w-0 border-b border-white/10 bg-[#050508]/78 lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted">
                  src/about/{currentTab.label}
                </span>
                <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_rgba(255,0,204,0.8)]" />
              </div>
              <pre className="min-h-[22rem] whitespace-pre-wrap break-words px-4 py-5 font-mono text-[0.78rem] leading-7 text-text sm:text-sm">
                {currentTab.lines.map((line, lineIndex) => (
                  <div className="flex min-w-0 gap-3" key={`${currentTab.id}-${lineIndex}`}>
                    <span className="w-5 shrink-0 select-none text-right text-text-muted/45">
                      {lineIndex + 1}
                    </span>
                    <code className="min-w-0 break-words">
                      {line.map(([type, value], tokenIndex) => (
                        <span
                          className={tokenClassName(type)}
                          key={`${type}-${value}-${tokenIndex}`}
                        >
                          {value}
                        </span>
                      ))}
                      {lineIndex === currentTab.lines.length - 1 ? (
                        <span
                          className={`ml-1 inline-block h-4 w-px translate-y-0.5 bg-primary ${
                            reducedMotion ? "" : "animate-pulse"
                          }`}
                        />
                      ) : null}
                    </code>
                  </div>
                ))}
              </pre>
            </div>

            <div className="min-w-0 p-4 sm:p-5">
              <div className="rounded-lg border border-border bg-[radial-gradient(circle_at_top_right,rgba(255,0,204,0.13),transparent_15rem),rgba(17,17,24,0.9)] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-display text-4xl uppercase leading-none text-text">
                      Tânia Oliveira
                    </p>
                    <p className="mt-2 text-sm font-semibold text-primary-soft">
                      Frontend + Integration Developer
                    </p>
                  </div>
                  <span className="rounded-full border border-primary/35 bg-primary/10 px-2.5 py-1 font-mono text-[0.62rem] font-black uppercase tracking-[0.14em] text-primary-soft">
                    ready
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {previewChips.map((chip) => (
                    <button
                      className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                        activeToken === chip
                          ? "border-primary/70 bg-primary/18 text-primary-soft shadow-[0_0_18px_rgba(255,0,204,0.16)]"
                          : "border-white/10 bg-background/70 text-text-muted hover:border-primary/50 hover:text-text"
                      }`}
                      key={chip}
                      onBlur={() => setActiveToken(null)}
                      onFocus={() => setActiveToken(chip)}
                      onMouseEnter={() => setActiveToken(chip)}
                      onMouseLeave={() => setActiveToken(null)}
                      type="button"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                <p className="mt-6 border-l border-primary/55 pl-4 font-mono text-sm text-text">
                  building real solutions
                </p>

                <div className="mt-6 rounded-lg border border-white/10 bg-background/72 px-4 py-3 font-mono text-xs text-text-muted">
                  npm run build <span className="text-primary-soft">✓ ready</span>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {["UI responsive", "API connected", "DEPLOY validated"].map(
                    (status) => (
                      <div
                        className="rounded-lg border border-white/10 bg-surface/70 px-3 py-3 text-xs font-bold uppercase tracking-[0.08em] text-text-muted"
                        key={status}
                      >
                        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_rgba(255,0,204,0.8)]" />
                        {status}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function InteractiveTimeline({ locale }: AboutVisualProps) {
  const [activeIndex, setActiveIndex] = useState(2);
  const labels = getAboutVisualLocale(locale);
  const timelineItems = timelineItemsByLocale[labels];

  return (
    <div className="rounded-lg border border-border bg-surface/88 p-5 shadow-[0_22px_70px_rgba(0,0,0,0.24)] sm:p-6">
      <div className="grid gap-4 lg:grid-cols-4">
        {timelineItems.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <button
              aria-pressed={isActive}
              className={`group min-h-48 rounded-lg border p-4 text-left transition hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary/50 ${
                isActive
                  ? "border-primary/70 bg-primary/10 shadow-[0_0_28px_rgba(255,0,204,0.16)]"
                  : "border-border bg-background/55 hover:border-primary/55"
              }`}
              key={item.year}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              type="button"
            >
              <span className="font-display text-5xl leading-none text-primary">
                {item.year}
              </span>
              <strong className="mt-4 block font-display text-3xl uppercase text-text">
                {item.title}
              </strong>
              <span className="mt-4 block text-sm leading-6 text-text-muted">
                {item.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function AnimatedTerminal({ locale }: AboutVisualProps) {
  const [visibleCount, setVisibleCount] = useState(1);
  const reducedMotion = useReducedMotionPreference();
  const labels = getAboutVisualLocale(locale);
  const terminalLines = terminalLinesByLocale[labels];
  const rows = useMemo(() => terminalLines.flatMap((line) => line), [terminalLines]);

  useEffect(() => {
    if (reducedMotion || visibleCount >= rows.length) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setVisibleCount((current) => Math.min(current + 1, rows.length));
    }, visibleCount % 2 === 0 ? 520 : 760);

    return () => window.clearTimeout(timeout);
  }, [reducedMotion, rows.length, visibleCount]);

  const renderedRows = reducedMotion ? rows : rows.slice(0, visibleCount);

  return (
    <div className="overflow-hidden rounded-lg border border-primary/30 bg-[#050508]/95 shadow-[0_24px_80px_rgba(0,0,0,0.34),0_0_34px_rgba(255,0,204,0.1)]">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.035] px-4 py-3">
        <div className="flex gap-2" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
          tania.system
        </span>
      </div>
      <div className="min-h-[18rem] space-y-3 px-4 py-5 font-mono text-sm leading-7 text-text sm:text-base">
        {renderedRows.map((row, index) => (
          <p
            className={index % 2 === 0 ? "text-primary-soft" : "text-text"}
            key={`${row}-${index}`}
          >
            {row}
            {index === renderedRows.length - 1 && !reducedMotion ? (
              <span className="ml-1 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-primary" />
            ) : null}
          </p>
        ))}
      </div>
    </div>
  );
}

export function StackFlipCards({ locale }: AboutVisualProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotionPreference();
  const labels = getAboutVisualLocale(locale);
  const stackLayers = stackLayersByLocale[labels];

  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-[radial-gradient(circle_at_50%_0%,rgba(255,0,204,0.14),transparent_22rem),radial-gradient(circle_at_94%_18%,rgba(122,122,255,0.09),transparent_18rem),rgba(17,17,24,0.88)] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:46px_46px] opacity-20" />
      <div className="relative grid gap-4 lg:grid-cols-3">
        {stackLayers.map((layer, index) => {
          const isActive = activeIndex === index;
          const motionClass = reducedMotion
            ? isActive
              ? "opacity-0"
              : "opacity-100"
            : isActive
              ? "opacity-0 [transform:rotateY(180deg)]"
              : "opacity-100 [transform:rotateY(0deg)] lg:group-hover:opacity-0 lg:group-hover:[transform:rotateY(180deg)]";
          const backMotionClass = reducedMotion
            ? isActive
              ? "opacity-100"
              : "opacity-0"
            : isActive
              ? "opacity-100 [transform:rotateY(0deg)]"
              : "opacity-0 [transform:rotateY(-180deg)] lg:group-hover:opacity-100 lg:group-hover:[transform:rotateY(0deg)]";

          return (
            <button
              aria-label={`${layer.title}: revelar tecnologias`}
              aria-pressed={isActive}
              className="group relative min-h-[29rem] w-full cursor-pointer rounded-lg text-left [perspective:1200px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              key={layer.title}
              onBlur={() => setActiveIndex(null)}
              onClick={() => setActiveIndex((current) => (current === index ? null : index))}
              type="button"
            >
              <span className="sr-only">Revelar camada {layer.title}</span>
              <span
                className={`absolute inset-0 rounded-lg border border-border bg-[radial-gradient(circle_at_top,rgba(255,0,204,0.12),transparent_16rem),rgba(10,10,15,0.94)] p-6 shadow-[0_22px_70px_rgba(0,0,0,0.28)] transition duration-500 ease-out [backface-visibility:hidden] ${motionClass}`}
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs font-black uppercase tracking-[0.22em] text-primary-soft">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full border border-primary/35 bg-primary/10 px-3 py-1 font-mono text-[0.62rem] font-black uppercase tracking-[0.14em] text-primary-soft">
                    {reducedMotion ? "tap" : "hover / tap"}
                  </span>
                </span>
                <span className="mt-16 block font-display text-5xl uppercase leading-none text-text sm:text-6xl lg:text-5xl xl:text-6xl">
                  {layer.title}
                </span>
                <span className="mt-5 block max-w-sm text-base leading-7 text-text-muted">
                  {layer.text}
                </span>
                <span className="absolute inset-x-6 bottom-6 h-px bg-gradient-to-r from-primary/70 via-white/15 to-transparent" />
              </span>

              <span
                className={`absolute inset-0 flex flex-col rounded-lg border border-primary/55 bg-[radial-gradient(circle_at_82%_12%,rgba(255,0,204,0.16),transparent_14rem),rgba(5,5,8,0.96)] p-6 shadow-[0_28px_86px_rgba(0,0,0,0.34),0_0_32px_rgba(255,0,204,0.12)] transition duration-500 ease-out [backface-visibility:hidden] ${backMotionClass}`}
              >
                <span className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs font-black uppercase tracking-[0.22em] text-primary-soft">
                    camada {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_rgba(255,0,204,0.85)]" />
                </span>
                <span className="mt-7 grid gap-2">
                  {layer.items.map((item) => (
                    <span
                      className="rounded-md border border-white/10 bg-background/70 px-3 py-2 font-mono text-sm font-bold text-text shadow-[0_0_18px_rgba(255,0,204,0.04)]"
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </span>
                <span className="mt-auto block border-t border-white/10 pt-5 text-sm font-semibold leading-6 text-primary-soft">
                  {layer.footer}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

