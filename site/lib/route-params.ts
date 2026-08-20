import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";

export type LocaleParams = Promise<{ locale: string }>;
export type LocaleSlugParams = Promise<{ locale: string; slug: string }>;

export async function resolveLocale(params: LocaleParams): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}
