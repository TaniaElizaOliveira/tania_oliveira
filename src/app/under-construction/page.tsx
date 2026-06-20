import type { Metadata } from "next";
import { cookies } from "next/headers";
import { UnderConstructionPage } from "@/components/site/under-construction-page";
import { getDictionary } from "@/content/dictionaries";
import { routing, type Locale } from "@/i18n/routing";

export const metadata: Metadata = {
  title: "Página em construção | Tânia Oliveira",
  description: "Estou a lançar este portfolio por etapas.",
};

function isLocale(value: string | undefined): value is Locale {
  return routing.locales.includes(value as Locale);
}

async function getPreferredLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;

  return isLocale(cookieLocale) ? cookieLocale : routing.defaultLocale;
}

export default async function UnderConstructionRoute() {
  const locale = await getPreferredLocale();
  const dictionary = getDictionary(locale);

  return (
    <UnderConstructionPage
      content={dictionary.site.underConstruction}
      locale={locale}
    />
  );
}
