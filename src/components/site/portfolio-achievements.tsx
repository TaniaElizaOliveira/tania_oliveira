import TerminalDemo from "@/components/terminal-demo";
import type { SiteContent } from "@/content/dictionaries";
import type { Locale } from "@/i18n/routing";
import { PageShell, SectionHeading } from "./portfolio-page-shell";
import { Reveal } from "./reveal";

type PortfolioPageProps = {
  content: SiteContent;
  locale: Locale;
};

export function PortfolioAchievements({
  content,
  locale,
}: PortfolioPageProps) {
  return (
    <PageShell content={content} locale={locale}>
      <main
        className="min-h-screen bg-surface/45 px-5 pb-20 pt-32 text-text sm:px-6 lg:px-8"
        id="content"
      >
        <section className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              description={content.achievements.description}
              eyebrow={content.achievements.eyebrow}
              title={content.achievements.title}
            />
          </Reveal>
          <Reveal delay={0.12}>
            <TerminalDemo />
          </Reveal>
        </section>
      </main>
    </PageShell>
  );
}
