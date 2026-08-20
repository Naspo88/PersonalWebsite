import type { LocalizedList, LocalizedText } from "@/lib/cv-schema";

export type ProjectLink = {
  label: LocalizedText;
  href: string;
};

export type Project = {
  slug: string;
  name: string;
  year: string;
  featured: boolean;
  role: LocalizedText;
  summary: LocalizedText;
  problem: LocalizedText;
  approach: LocalizedText;
  outcome: LocalizedText;
  highlights: LocalizedList;
  stack: string[];
  links: ProjectLink[];
};

export function featuredFirst(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.year.localeCompare(a.year);
  });
}
