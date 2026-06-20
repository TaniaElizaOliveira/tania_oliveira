import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PortfolioHome } from "@/components/site/portfolio-home";
import { getDictionary } from "@/content/dictionaries";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale as Locale;
  const t = await getTranslations({ locale: currentLocale, namespace: "meta" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return {
    metadataBase: new URL(siteUrl),
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords"),
    alternates: {
      canonical: `/${currentLocale}/home`,
      languages: {
        pt: "/pt/home",
        en: "/en/home",
        es: "/es/home",
      },
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const currentLocale = locale as Locale;
  const dictionary = getDictionary(currentLocale);

  setRequestLocale(currentLocale);

  return <PortfolioHome content={dictionary.site} locale={currentLocale} />;
}
