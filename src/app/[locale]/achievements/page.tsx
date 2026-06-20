import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PortfolioAchievements } from "@/components/site/portfolio-achievements";
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
    title: `${dictionary.site.achievements.title} | Tânia Oliveira`,
    description: dictionary.site.achievements.description,
    alternates: {
      canonical: `/${currentLocale}/achievements`,
      languages: {
        pt: "/pt/achievements",
        en: "/en/achievements",
        es: "/es/achievements",
      },
    },
  };
}

export default async function AchievementsPage({ params }: Props) {
  const { locale } = await params;
  const currentLocale = getLocale(locale);
  const dictionary = getDictionary(currentLocale);

  setRequestLocale(currentLocale);

  return (
    <PortfolioAchievements content={dictionary.site} locale={currentLocale} />
  );
}
