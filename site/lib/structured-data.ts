import { localePath, type Locale } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site-config";
import { profile } from "@/content/profile";
import { cv } from "@/content/cv";

export function buildPersonSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role[locale],
    description: profile.positioning[locale],
    email: `mailto:${profile.email}`,
    url: absoluteUrl(localePath(locale)),
    sameAs: profile.socials.map((social) => social.href),
    knowsLanguage: cv.languages.map((language) => language.name[locale]),
    alumniOf: cv.education.map((entry) => ({
      "@type": "EducationalOrganization",
      name: entry.institution,
    })),
    worksFor: cv.experience
      .filter((entry) => entry.endDate === null)
      .map((entry) => ({ "@type": "Organization", name: entry.company })),
  };
}
