import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { UnderConstructionPage } from "@/components/site/under-construction-page";
import { getDictionary } from "@/content/dictionaries";
import type { Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale as Locale;
  const dictionary = getDictionary(currentLocale);
  const content = dictionary.site.underConstruction;

  return {
    title: `${content.title} | Tânia Oliveira`,
    description: content.subtitle,
    alternates: {
      canonical: `/${currentLocale}/under-construction`,
      languages: {
        pt: "/pt/under-construction",
        en: "/en/under-construction",
        es: "/es/under-construction",
      },
    },
  };
}

export default async function LocalizedUnderConstructionRoute({
  params,
}: Props) {
  const { locale } = await params;
  const currentLocale = locale as Locale;
  const dictionary = getDictionary(currentLocale);

  setRequestLocale(currentLocale);

  return (
    <UnderConstructionPage
      content={dictionary.site.underConstruction}
      locale={currentLocale}
    />
  );
}
