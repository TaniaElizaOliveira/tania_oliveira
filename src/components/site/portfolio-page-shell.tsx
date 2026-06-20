import type { ReactNode } from "react";
import type { SiteContent } from "@/content/dictionaries";
import type { Locale } from "@/i18n/routing";
import { Footer } from "./footer";
import { MouseParticleField } from "./mouse-particle-field";
import { Navigation } from "./navigation";

type PageShellProps = {
  children: ReactNode;
  content: SiteContent;
  locale: Locale;
};

export function PageShell({ children, content, locale }: PageShellProps) {
  return (
    <>
      <MouseParticleField />
      <Navigation content={content.navigation} locale={locale} />
      {children}
      <Footer content={content.footer} social={content.social} />
    </>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="font-display text-lg uppercase text-primary-soft">
        {eyebrow}
      </p>
      <h1 className="font-display mt-3 text-5xl uppercase leading-[0.92] text-text sm:text-6xl lg:text-7xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-5 text-lg leading-8 text-text-muted">{description}</p>
      ) : null}
    </div>
  );
}
