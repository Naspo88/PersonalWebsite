import type { Locale } from "@/lib/i18n";

export type Social = { label: string; href: string };
export type Localized = Record<Locale, string>;

export const profile = {
  name: "Roberto Minghi",
  email: "robertominghi@msn.com",
  foundedYear: 2026,
  location: { en: "TODO — City, Country", it: "TODO — Città, Paese" } satisfies Localized,
  role: { en: "TODO — your title", it: "TODO — il tuo ruolo" } satisfies Localized,
  positioning: {
    en: "TODO — one sentence on what you build, for whom, and why it matters.",
    it: "TODO — una frase su cosa costruisci, per chi e perché conta.",
  } satisfies Localized,
  about: {
    en: ["TODO — first paragraph.", "TODO — second paragraph."],
    it: ["TODO — primo paragrafo.", "TODO — secondo paragrafo."],
  } satisfies Record<Locale, string[]>,
  socials: [
    { label: "GitHub", href: "https://github.com/TODO" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/TODO" },
  ] satisfies Social[],
} as const;
