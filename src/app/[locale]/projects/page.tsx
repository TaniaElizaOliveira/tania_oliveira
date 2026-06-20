import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PortfolioProjects } from "@/components/site/portfolio-projects";
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
    title: `${dictionary.site.projects.title} | Tânia Oliveira`,
    description: dictionary.site.projects.description,
    alternates: {
      canonical: `/${currentLocale}/projects`,
      languages: {
        pt: "/pt/projects",
        en: "/en/projects",
        es: "/es/projects",
      },
    },
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  const currentLocale = getLocale(locale);
  const dictionary = getDictionary(currentLocale);

  setRequestLocale(currentLocale);

  return <PortfolioProjects content={dictionary.site} locale={currentLocale} />;
}
