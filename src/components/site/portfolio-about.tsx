import Link from "next/link";
import type { SiteContent } from "@/content/dictionaries";
import type { Locale } from "@/i18n/routing";
import {
  AnimatedTerminal,
  InteractiveTimeline,
  StackFlipCards,
} from "./about-visuals";
import { QuantumScatterHero } from "./quantum-scatter-hero";
import { PageShell } from "./portfolio-page-shell";
import { Reveal } from "./reveal";

type PortfolioPageProps = {
  content: SiteContent;
  locale: Locale;
};

function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="max-w-4xl">
      <p className="font-display text-base uppercase text-primary-soft sm:text-lg">
        {eyebrow}
      </p>
      <h2 className="font-display mt-3 text-4xl uppercase leading-[0.92] text-text sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {text ? (
        <p className="mt-5 max-w-3xl text-base leading-8 text-text-muted sm:text-lg">
          {text}
        </p>
      ) : null}
    </div>
  );
}

const aboutContent = {
  pt: {
    heroEyebrow: "SOBRE MIM",
    heroTitle: "NÃO SOU APENAS FRONTEND. GOSTO DE ENTENDER O SISTEMA TODO.",
    heroText:
      "Sou a Tânia Oliveira, finalista em Engenharia de Software e developer júnior com experiência prática em interfaces, APIs, integrações com Sage 50c, e-commerce, backoffice e aplicações internas.",
    introEyebrow: "Perfil humano",
    introTitle: "QUEM SOU NO MEIO DESTE SISTEMA",
    introHighlights: ["curiosidade", "prática", "contexto"],
    introParagraphs: [
      "Sou a Tânia Oliveira, uma developer em evolução, curiosa e persistente, que está a construir o seu percurso entre Engenharia de Software, desenvolvimento web e sistemas empresariais.",
      "Gosto de perceber o contexto antes de escrever código. Não me interessa apenas “fazer uma página”: quero entender quem vai usar, que dados entram, que API responde, onde o erro pode acontecer e como a solução se mantém depois.",
      "O meu caminho tem sido feito com estudo, prática e projetos reais. Já trabalhei com interfaces, APIs, integrações com Sage 50c, WooCommerce, backoffice, deploys, validação de erros e documentação técnica. Ainda estou a crescer, mas não estou a começar do zero.",
    ],
    timelineEyebrow: "Percurso",
    timelineTitle: "O MEU PERCURSO EM CAMADAS",
    timelineText:
      "Cada etapa trouxe uma nova forma de olhar para o desenvolvimento: primeiro a interface, depois as aplicações web, depois os sistemas reais e agora uma visão mais completa entre frontend, dados e integração.",
    terminalEyebrow: "Terminal",
    terminalTitle: "PARTÍCULAS EM EXECUÇÃO",
    terminalText:
      "A minha forma de aprender é prática: construir, testar, errar, corrigir, documentar e voltar a melhorar. Cada projeto acrescenta uma nova partícula ao meu perfil.",
    stackEyebrow: "Stack",
    stackTitle: "AS TRÊS CAMADAS DA MINHA STACK",
    stackText:
      "Ferramentas diferentes, organizadas em três dimensões do meu trabalho: construir, ligar e entregar.",
    ctaTitle: "QUER VER O QUE JÁ CONSTRUÍ?",
    ctaText:
      "Veja os projetos, experiências e soluções que mostram como estas camadas se transformam em trabalho real.",
    projectsButton: "Ver projetos",
    cvButton: "Baixar CV",
    contactButton: "Contactar",
  },
  en: {
    heroEyebrow: "ABOUT ME",
    heroTitle: "I AM NOT JUST FRONTEND. I LIKE TO UNDERSTAND THE WHOLE SYSTEM.",
    heroText:
      "I am Tânia Oliveira, a Software Engineering student in my final stage and a junior developer with practical experience in interfaces, APIs, Sage 50c integrations, e-commerce, backoffice and internal applications.",
    introEyebrow: "Human profile",
    introTitle: "WHO I AM INSIDE THIS SYSTEM",
    introHighlights: ["curiosity", "practice", "context"],
    introParagraphs: [
      "I am Tânia Oliveira, a developer in evolution, curious and persistent, building my path between Software Engineering, web development and business systems.",
      "I like to understand the context before writing code. I am not interested only in “making a page”: I want to understand who will use it, what data enters, which API responds, where errors can happen and how the solution is maintained afterwards.",
      "My path has been built through study, practice and real projects. I have worked with interfaces, APIs, Sage 50c integrations, WooCommerce, backoffice, deployments, error validation and technical documentation. I am still growing, but I am not starting from zero.",
    ],
    timelineEyebrow: "Path",
    timelineTitle: "MY PATH IN LAYERS",
    timelineText:
      "Each stage brought a new way of looking at development: first the interface, then web applications, then real systems and now a broader view between frontend, data and integration.",
    terminalEyebrow: "Terminal",
    terminalTitle: "PARTICLES IN EXECUTION",
    terminalText:
      "My way of learning is practical: build, test, fail, fix, document and improve again. Each project adds a new particle to my profile.",
    stackEyebrow: "Stack",
    stackTitle: "THE THREE LAYERS OF MY STACK",
    stackText:
      "Different tools, organized into three dimensions of my work: building, connecting and delivering.",
    ctaTitle: "WANT TO SEE WHAT I HAVE BUILT?",
    ctaText:
      "See the projects, experiences and solutions that show how these layers become real work.",
    projectsButton: "View projects",
    cvButton: "Download CV",
    contactButton: "Contact",
  },
  fr: {
    heroEyebrow: "À PROPOS",
    heroTitle: "JE NE SUIS PAS SEULEMENT FRONTEND. J’AIME COMPRENDRE TOUT LE SYSTÈME.",
    heroText:
      "Je suis Tânia Oliveira, étudiante en dernière phase d’Ingénierie Logicielle et développeuse junior avec une expérience pratique en interfaces, APIs, intégrations Sage 50c, e-commerce, backoffice et applications internes.",
    introEyebrow: "Profil humain",
    introTitle: "QUI JE SUIS AU MILIEU DE CE SYSTÈME",
    introHighlights: ["curiosité", "pratique", "contexte"],
    introParagraphs: [
      "Je suis Tânia Oliveira, une développeuse en évolution, curieuse et persévérante, qui construit son parcours entre ingénierie logicielle, développement web et systèmes d’entreprise.",
      "J’aime comprendre le contexte avant d’écrire du code. Je ne veux pas seulement “faire une page” : je veux comprendre qui va l’utiliser, quelles données entrent, quelle API répond, où l’erreur peut se produire et comment la solution sera maintenue ensuite.",
      "Mon parcours s’est construit avec de l’étude, de la pratique et des projets réels. J’ai déjà travaillé avec des interfaces, des APIs, des intégrations Sage 50c, WooCommerce, des backoffices, des déploiements, la validation d’erreurs et la documentation technique. Je continue à évoluer, mais je ne pars pas de zéro.",
    ],
    timelineEyebrow: "Parcours",
    timelineTitle: "MON PARCOURS PAR COUCHES",
    timelineText:
      "Chaque étape a apporté une nouvelle façon de voir le développement : d'abord l'interface, puis les applications web, ensuite les systèmes réels et maintenant une vision plus complète entre frontend, données et intégration.",
    terminalEyebrow: "Terminal",
    terminalTitle: "PARTICULES EN EXÉCUTION",
    terminalText:
      "Ma manière d'apprendre est pratique : construire, tester, se tromper, corriger, documenter et améliorer encore. Chaque projet ajoute une nouvelle particule à mon profil.",
    stackEyebrow: "Stack",
    stackTitle: "LES TROIS COUCHES DE MA STACK",
    stackText:
      "Des outils différents, organisés en trois dimensions de mon travail : construire, connecter et livrer.",
    ctaTitle: "VOUS VOULEZ VOIR CE QUE J’AI DÉJÀ CONSTRUIT ?",
    ctaText:
      "Découvrez les projets, expériences et solutions qui montrent comment ces couches deviennent un travail réel.",
    projectsButton: "Voir les projets",
    cvButton: "Télécharger le CV",
    contactButton: "Contact",
  },
  es: {
    heroEyebrow: "SOBRE MÍ",
    heroTitle: "NO SOY SOLO FRONTEND. ME GUSTA ENTENDER TODO EL SISTEMA.",
    heroText:
      "Soy Tânia Oliveira, estudiante en la fase final de Ingeniería de Software y developer junior con experiencia práctica en interfaces, APIs, integraciones con Sage 50c, e-commerce, backoffice y aplicaciones internas.",
    introEyebrow: "Perfil humano",
    introTitle: "QUIÉN SOY DENTRO DE ESTE SISTEMA",
    introHighlights: ["curiosidad", "práctica", "contexto"],
    introParagraphs: [
      "Soy Tânia Oliveira, una developer en evolución, curiosa y persistente, que está construyendo su recorrido entre Ingeniería de Software, desarrollo web y sistemas empresariales.",
      "Me gusta entender el contexto antes de escribir código. No me interesa solo “hacer una página”: quiero entender quién la va a usar, qué datos entran, qué API responde, dónde puede ocurrir el error y cómo se mantiene la solución después.",
      "Mi camino se ha construido con estudio, práctica y proyectos reales. Ya he trabajado con interfaces, APIs, integraciones con Sage 50c, WooCommerce, backoffice, despliegues, validación de errores y documentación técnica. Sigo creciendo, pero no estoy empezando desde cero.",
    ],
    timelineEyebrow: "Recorrido",
    timelineTitle: "MI RECORRIDO POR CAPAS",
    timelineText:
      "Cada etapa trajo una nueva forma de mirar el desarrollo: primero la interfaz, después las aplicaciones web, luego los sistemas reales y ahora una visión más completa entre frontend, datos e integración.",
    terminalEyebrow: "Terminal",
    terminalTitle: "PARTÍCULAS EN EJECUCIÓN",
    terminalText:
      "Mi forma de aprender es práctica: construir, probar, equivocarme, corregir, documentar y volver a mejorar. Cada proyecto añade una nueva partícula a mi perfil.",
    stackEyebrow: "Stack",
    stackTitle: "LAS TRES CAPAS DE MI STACK",
    stackText:
      "Herramientas diferentes, organizadas en tres dimensiones de mi trabajo: construir, conectar y entregar.",
    ctaTitle: "¿QUIERES VER LO QUE YA HE CONSTRUIDO?",
    ctaText:
      "Mira los proyectos, experiencias y soluciones que muestran cómo estas capas se transforman en trabajo real.",
    projectsButton: "Ver proyectos",
    cvButton: "Descargar CV",
    contactButton: "Contactar",
  },
};

export function PortfolioAbout({ content, locale }: PortfolioPageProps) {
  const aboutLocale =
    locale === "en" || locale === "fr" || locale === "es" ? locale : "pt";
  const labels = aboutContent[aboutLocale];
  const constructionHref = `/${locale}/under-construction`;
  const cvHrefByLocale: Record<string, string> = {
    en: "/cv/Tania_Oliveira_CV_EN.pdf",
    es: "/cv/Tania_Oliveira_CV_ES.pdf",
    fr: "/cv/Tania_Oliveira_CV_FR.pdf",
    pt: "/cv/Tania_Oliveira_CV_PT.pdf",
  };
  const cvHref = cvHrefByLocale[locale] ?? cvHrefByLocale.pt;

  return (
    <PageShell content={content} locale={locale}>
      <main
        className="min-h-screen overflow-x-hidden bg-background px-5 pb-20 pt-32 text-text sm:px-6 lg:px-8"
        id="content"
      >
        <section className="mx-auto grid max-w-7xl items-center gap-10 xl:grid-cols-[0.86fr_1.14fr]">
          <Reveal>
            <div className="max-w-4xl xl:max-w-none">
              <p className="font-display text-lg uppercase text-primary-soft">
                {labels.heroEyebrow}
              </p>
              <h1 className="font-display mt-4 text-4xl uppercase leading-[0.88] text-text min-[390px]:text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">
                {labels.heroTitle}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-text-muted sm:text-xl">
                {labels.heroText}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <QuantumScatterHero locale={aboutLocale} />
          </Reveal>
        </section>

        <section className="mx-auto mt-18 max-w-7xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-lg border border-primary/30 bg-[radial-gradient(circle_at_14%_18%,rgba(255,0,204,0.13),transparent_18rem),radial-gradient(circle_at_88%_8%,rgba(122,122,255,0.1),transparent_16rem),rgba(17,17,24,0.88)] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.3),0_0_34px_rgba(255,0,204,0.09)] sm:p-8 lg:p-10">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />
              <div className="relative grid gap-8 lg:grid-cols-[1fr_0.38fr] lg:items-end">
                <div className="max-w-4xl">
                  <p className="font-display text-base uppercase text-primary-soft sm:text-lg">
                    {labels.introEyebrow}
                  </p>
                  <h2 className="font-display mt-3 text-4xl uppercase leading-[0.92] text-text sm:text-5xl lg:text-6xl">
                    {labels.introTitle}
                  </h2>
                  <div className="mt-6 space-y-5 text-base leading-8 text-text-muted sm:text-lg">
                    {labels.introParagraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  {labels.introHighlights.map((item, index) => (
                    <div
                      className="relative overflow-hidden rounded-lg border border-border bg-background/62 px-4 py-4 shadow-[0_16px_48px_rgba(0,0,0,0.22)]"
                      key={item}
                    >
                      <span className="font-mono text-xs font-black text-primary-soft">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <strong className="mt-2 block font-display text-2xl uppercase text-text">
                        {item}
                      </strong>
                      <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-primary shadow-[0_0_18px_rgba(255,0,204,0.85)]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto mt-18 max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow={labels.timelineEyebrow}
              text={labels.timelineText}
              title={labels.timelineTitle}
            />
          </Reveal>
          <div className="mt-8">
            <Reveal delay={0.08}>
              <InteractiveTimeline locale={aboutLocale} />
            </Reveal>
          </div>
        </section>

        <section className="mx-auto mt-18 grid max-w-7xl gap-8 lg:grid-cols-[0.45fr_0.55fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow={labels.terminalEyebrow}
              text={labels.terminalText}
              title={labels.terminalTitle}
            />
          </Reveal>
          <Reveal delay={0.08}>
            <AnimatedTerminal locale={aboutLocale} />
          </Reveal>
        </section>

        <section className="mx-auto mt-18 max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow={labels.stackEyebrow}
              text={labels.stackText}
              title={labels.stackTitle}
            />
          </Reveal>
          <div className="mt-8">
            <Reveal delay={0.08}>
              <StackFlipCards locale={aboutLocale} />
            </Reveal>
          </div>
        </section>

        <section className="mx-auto mt-18 max-w-7xl">
          <Reveal>
            <div className="grid gap-6 rounded-lg border border-primary/35 bg-[linear-gradient(135deg,rgba(255,0,204,0.13),rgba(17,17,24,0.94)_42%,rgba(122,122,255,0.1))] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.34),0_0_34px_rgba(255,0,204,0.1)] sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="min-w-0">
                <h2 className="font-display text-5xl uppercase leading-[0.9] text-text sm:text-6xl">
                  {labels.ctaTitle}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-text-muted sm:text-lg">
                  {labels.ctaText}
                </p>
              </div>
              <div className="flex min-w-0 flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-primary/60 bg-primary/15 px-5 py-3 text-sm font-black uppercase text-text shadow-[0_0_24px_rgba(255,0,204,0.16)] transition hover:-translate-y-0.5 hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/50"
                  href={constructionHref}
                >
                  {labels.projectsButton}
                </Link>
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border bg-surface/90 px-5 py-3 text-sm font-black uppercase text-text transition hover:-translate-y-0.5 hover:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary/50"
                  download
                  href={cvHref}
                >
                  {labels.cvButton}
                </a>
                <a
                  className="inline-flex min-h-12 items-center justify-center rounded-lg border border-border bg-surface/90 px-5 py-3 text-sm font-black uppercase text-text transition hover:-translate-y-0.5 hover:border-primary/60 focus-visible:ring-2 focus-visible:ring-primary/50"
                  href={`mailto:${content.contact.email}`}
                >
                  {labels.contactButton}
                </a>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </PageShell>
  );
}
