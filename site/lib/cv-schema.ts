import type { Locale } from "@/lib/i18n";

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type Experience = {
  company: string;
  companyUrl?: string;
  title: LocalizedText;
  location: string;
  startDate: string;
  endDate: string | null;
  summary: LocalizedText;
  highlights: LocalizedList;
  stack: string[];
};

export type Education = {
  institution: string;
  qualification: LocalizedText;
  field: LocalizedText;
  location: string;
  startDate: string;
  endDate: string;
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  url?: string;
};

export type SkillGroup = {
  label: LocalizedText;
  items: string[];
};

export type Language = {
  name: LocalizedText;
  level: LocalizedText;
};

export type Cv = {
  updatedAt: string;
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  skills: SkillGroup[];
  languages: Language[];
};

const MONTH_FORMATTER: Record<Locale, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" }),
  it: new Intl.DateTimeFormat("it-IT", { month: "short", year: "numeric" }),
};

const MONTH_PATTERN = /^(\d{4})-(\d{2})$/;

export function formatMonth(value: string, locale: Locale): string {
  const match = MONTH_PATTERN.exec(value);
  if (!match) return value;

  const year = Number(match[1]);
  const month = Number(match[2]);
  return MONTH_FORMATTER[locale].format(new Date(Date.UTC(year, month - 1, 1)));
}

export function formatDateRange(
  startDate: string,
  endDate: string | null,
  locale: Locale,
  presentLabel: string,
): string {
  const end = endDate ? formatMonth(endDate, locale) : presentLabel;
  return `${formatMonth(startDate, locale)} — ${end}`;
}
