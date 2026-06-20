import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PortfolioAbout } from "@/components/site/portfolio-about";
import { getDictionary } from "@/content/dictionaries";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

function getLocale(locale: string): Locale {
  return routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : routing.defaultLocale;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = getLocale(locale);
  const dictionary = getDictionary(currentLocale);

  return {
    title: `${dictionary.site.about.eyebrow} | Tânia Oliveira`,
    description: dictionary.site.about.description,
    alternates: {
      canonical: `/${currentLocale}/about`,
      languages: {
        pt: "/pt/about",
        en: "/en/about",
        es: "/es/about",
      },
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const currentLocale = getLocale(locale);
  const dictionary = getDictionary(currentLocale);

  setRequestLocale(currentLocale);

  return <PortfolioAbout content={dictionary.site} locale={currentLocale} />;
}
