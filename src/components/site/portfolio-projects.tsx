import type { SiteContent } from "@/content/dictionaries";
import { getLocalizedProjects } from "@/data/projects";
import type { Locale } from "@/i18n/routing";
import { PageShell, SectionHeading } from "./portfolio-page-shell";
import { ProjectShowcase } from "./project-showcase";
import { Reveal } from "./reveal";

type PortfolioPageProps = {
  content: SiteContent;
  locale: Locale;
};

function ProjectShowcaseBlock({ content, locale }: PortfolioPageProps) {
  const localizedProjects = getLocalizedProjects(locale);
  const projectCards = localizedProjects.map((project) => ({
    href: project.href,
    role: project.role,
    shortDescription: project.shortDescription,
    slug: project.slug,
    tag: project.tag,
    technologies: project.technologies,
    title: project.title,
    visualClass: project.visualClass,
  }));

  return (
    <ProjectShowcase
      ariaLabel={content.projects.ariaLabel}
      cardAriaLabel={content.projects.cardAriaLabel}
      detailsLabel={content.projects.detailsLabel}
      locale={locale}
      nextLabel={content.projects.nextLabel}
      previousLabel={content.projects.previousLabel}
      projects={projectCards}
      progressLabel={content.projects.progressLabel}
    />
  );
}

export function PortfolioProjects({ content, locale }: PortfolioPageProps) {
  return (
    <PageShell content={content} locale={locale}>
      <main
        className="min-h-screen bg-background px-5 pb-20 pt-32 text-text sm:px-6 lg:px-8"
        id="content"
      >
        <section className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              description={content.projects.description}
              eyebrow={content.projects.eyebrow}
              title={content.projects.title}
            />
          </Reveal>
          <div className="mt-10">
            <Reveal delay={0.08}>
              <ProjectShowcaseBlock content={content} locale={locale} />
            </Reveal>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
