import { BriefcaseBusiness, Code2, Mail } from "lucide-react";
import type { SiteContent } from "@/content/dictionaries";
import type { Locale } from "@/i18n/routing";
import { PageShell, SectionHeading } from "./portfolio-page-shell";
import { Reveal } from "./reveal";

type PortfolioPageProps = {
  content: SiteContent;
  locale: Locale;
};

function ContactCards({ content }: { content: SiteContent }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
      <a
        className="group flex min-w-0 flex-col gap-4 rounded-lg border border-border bg-surface p-5 text-text-muted transition hover:-translate-y-1 hover:border-primary/60 hover:text-primary focus-visible:border-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        href={`mailto:${content.contact.email}`}
      >
        <Mail aria-hidden="true" className="text-primary-soft" size={22} />
        <span className="font-display text-2xl uppercase text-text">Email</span>
        <span className="break-all text-sm leading-6">
          {content.contact.email}
        </span>
      </a>
      <a
        className="group flex min-w-0 flex-col gap-4 rounded-lg border border-border bg-surface p-5 text-text-muted transition hover:-translate-y-1 hover:border-primary/60 hover:text-primary focus-visible:border-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        href={content.social.linkedin}
        rel="noopener noreferrer"
        target="_blank"
      >
        <BriefcaseBusiness
          aria-hidden="true"
          className="text-primary-soft"
          size={22}
        />
        <span className="font-display text-2xl uppercase text-text">
          LinkedIn
        </span>
        <span className="break-all text-sm leading-6">
          linkedin.com/in/oliveira-tania
        </span>
      </a>
      <a
        className="group flex min-w-0 flex-col gap-4 rounded-lg border border-border bg-surface p-5 text-text-muted transition hover:-translate-y-1 hover:border-primary/60 hover:text-primary focus-visible:border-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        href={content.social.github}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Code2 aria-hidden="true" className="text-primary-soft" size={22} />
        <span className="font-display text-2xl uppercase text-text">GitHub</span>
        <span className="break-all text-sm leading-6">
          github.com/TaniaElizaOliveira
        </span>
      </a>
    </div>
  );
}

export function PortfolioContact({ content, locale }: PortfolioPageProps) {
  return (
    <PageShell content={content} locale={locale}>
      <main
        className="min-h-screen bg-surface/50 px-5 pb-20 pt-32 text-text sm:px-6 lg:px-8"
        id="content"
      >
        <section className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeading
              description={content.contact.description}
              eyebrow={content.contact.eyebrow}
              title={content.contact.title}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <ContactCards content={content} />
          </Reveal>
        </section>
      </main>
    </PageShell>
  );
}
