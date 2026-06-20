import type { Locale } from "@/i18n/routing";
import en from "../../messages/en.json";
import es from "../../messages/es.json";
import pt from "../../messages/pt.json";

const dictionaries: Record<Locale, typeof pt> = {
  pt,
  en,
  es,
};

export type SiteDictionary = typeof pt;
export type SiteContent = SiteDictionary["site"];

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
