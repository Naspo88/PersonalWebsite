import { en } from "@/content/i18n/en";
import { it } from "@/content/i18n/it";

export const locales = ["en", "it"] as const;
export const defaultLocale = "en";

export type Locale = (typeof locales)[number];
export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, it };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function localePath(locale: Locale, path = ""): string {
  const normalized = path.replace(/^\/+|\/+$/g, "");
  return normalized ? `/${locale}/${normalized}/` : `/${locale}/`;
}
