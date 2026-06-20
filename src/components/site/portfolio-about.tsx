import type { SiteContent } from "@/content/dictionaries";
import type { Locale } from "@/i18n/routing";
import { AboutFlipCard } from "./about-flip-card";
import { PageShell, SectionHeading } from "./portfolio-page-shell";
import { Reveal } from "./reveal";

type PortfolioPageProps = {
  content: SiteContent;
  locale: Locale;
};

export function PortfolioAbout({ content, locale }: PortfolioPageProps) {
  return (
    <PageShell content={content} locale={locale}>
      <main
        className="min-h-screen bg-background px-5 pb-20 pt-32 text-text sm:px-6 lg:px-8"
        id="content"
      >
        <section className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <Reveal>
            <SectionHeading
              description={content.about.description}
              eyebrow={content.about.eyebrow}
              title={content.about.title}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <article className="rounded-lg border border-border bg-surface/88 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:p-8">
              <p className="text-xl leading-9 text-text">
                {content.about.statement}
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {content.about.principles.map((principle) => (
                  <AboutFlipCard
                    key={principle.title}
                    text={principle.text}
                    title={principle.title}
                  />
                ))}
              </div>
            </article>
          </Reveal>
        </section>
      </main>
    </PageShell>
  );
}
