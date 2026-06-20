import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { getDictionary } from "@/content/dictionaries";
import { getLocalizedProjectBySlug, projects } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { SaasCaseStudy } from "@/components/site/saas-case-study";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

function getLocale(locale: string): Locale {
  return routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : routing.defaultLocale;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({
      locale,
      slug: project.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const currentLocale = getLocale(locale);
  const labels = getDictionary(currentLocale).site.projectDetail;
  const project = getLocalizedProjectBySlug(slug, currentLocale);

  if (!project) {
    return {
      title: `${labels.notFoundTitle} | Tânia Oliveira`,
    };
  }

  return {
    title: `${project.title} | Tânia Oliveira`,
    description: project.shortDescription,
    alternates: {
      canonical: `/${currentLocale}/projects/${project.slug}`,
      languages: {
        pt: `/pt/projects/${project.slug}`,
        en: `/en/projects/${project.slug}`,
        es: `/es/projects/${project.slug}`,
      },
    },
    openGraph: {
      title: `${project.title} | Tânia Oliveira`,
      description: project.shortDescription,
      type: "article",
      locale: currentLocale,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const currentLocale = getLocale(locale);
  const project = getLocalizedProjectBySlug(slug, currentLocale);
  const labels = getDictionary(currentLocale).site.projectDetail;

  setRequestLocale(currentLocale);

  if (!project) {
    return (
      <main className="min-h-screen bg-background px-5 pb-20 pt-32 text-text sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-soft transition hover:text-primary"
            href="/projects"
            locale={currentLocale}
          >
            <ArrowLeft aria-hidden="true" size={18} />
            {labels.back}
          </Link>
          <section className="mt-12 rounded-lg border border-border bg-surface p-8">
            <p className="font-display text-xl uppercase text-primary-soft">
              {labels.notFoundEyebrow}
            </p>
            <h1 className="font-display mt-4 text-5xl uppercase leading-none text-text sm:text-6xl">
              {labels.notFoundTitle}
            </h1>
            <p className="mt-5 max-w-2xl leading-7 text-text-muted">
              {labels.notFoundDescription}
            </p>
          </section>
        </div>
      </main>
    );
  }

  if (project.slug === "multi-tenant-saas-platform") {
    return <SaasCaseStudy locale={currentLocale} project={project} />;
  }

  return (
    <main className="min-h-screen bg-background px-5 pb-20 pt-32 text-text sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary-soft transition hover:text-primary"
          href="/projects"
          locale={currentLocale}
        >
          <ArrowLeft aria-hidden="true" size={18} />
          {labels.back}
        </Link>

        <header className="mt-12 border-b border-border pb-10">
          <p className="font-display text-xl uppercase text-primary-soft">
            {project.tag}
          </p>
          <h1 className="font-display mt-4 max-w-5xl text-6xl uppercase leading-none text-text sm:text-7xl lg:text-8xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-text-muted">
            {project.shortDescription}
          </p>
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="h-fit rounded-lg border border-border bg-surface p-6">
            <h2 className="font-display text-3xl uppercase text-text">
              {labels.technicalStack}
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.map((technology: string) => (
                <span
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-text-muted"
                  key={technology}
                >
                  {technology}
                </span>
              ))}
            </div>
          </aside>

          <div className="space-y-6">
            <section className="rounded-lg border border-border bg-surface p-6 sm:p-8">
              <p className="font-display text-lg uppercase text-primary-soft">
                {labels.overview}
              </p>
              <p className="mt-4 text-lg leading-8 text-text-muted">
                {project.description}
              </p>
            </section>

            <section className="rounded-lg border border-border bg-surface p-6 sm:p-8">
              <p className="font-display text-lg uppercase text-primary-soft">
                {labels.objective}
              </p>
              <p className="mt-4 text-lg leading-8 text-text-muted">
                {project.objective}
              </p>
            </section>

            <section className="rounded-lg border border-border bg-surface p-6 sm:p-8">
              <p className="font-display text-lg uppercase text-primary-soft">
                {labels.contribution}
              </p>
              <p className="mt-4 text-lg leading-8 text-text-muted">
                {project.role}
              </p>
            </section>

            <section className="rounded-lg border border-border bg-surface p-6 sm:p-8">
              <p className="font-display text-lg uppercase text-primary-soft">
                {labels.implementationSummary}
              </p>
              <p className="mt-4 text-lg leading-8 text-text-muted">
                {project.implementationSummary}
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
