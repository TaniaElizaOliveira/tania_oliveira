import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PortfolioContact } from "@/components/site/portfolio-contact";
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
    title: `${dictionary.site.contact.title} | Tânia Oliveira`,
    description: dictionary.site.contact.description,
    alternates: {
      canonical: `/${currentLocale}/contact`,
      languages: {
        pt: "/pt/contact",
        en: "/en/contact",
        es: "/es/contact",
      },
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const currentLocale = getLocale(locale);
  const dictionary = getDictionary(currentLocale);

  setRequestLocale(currentLocale);

  return <PortfolioContact content={dictionary.site} locale={currentLocale} />;
}
