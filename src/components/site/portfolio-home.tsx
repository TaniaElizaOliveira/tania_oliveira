import type { SiteContent } from "@/content/dictionaries";
import type { Locale } from "@/i18n/routing";
import { EducationRunnerSection } from "./education-runner-section";
import { Hero } from "./hero";
import { PageShell } from "./portfolio-page-shell";

type PortfolioPageProps = {
  content: SiteContent;
  locale: Locale;
};

export function PortfolioHome({ content, locale }: PortfolioPageProps) {
  return (
    <PageShell content={content} locale={locale}>
      <main id="content">
        <Hero content={content.hero} />
        <EducationRunnerSection content={content.educationRunner} />
      </main>
    </PageShell>
  );
}
