import type { MetadataRoute } from "next";
import { locales, localePath } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/site-config";
import { projects } from "@/content/projects";

const STATIC_PATHS = ["", "projects", "cv", "notes", "contact"];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...STATIC_PATHS, ...projects.map((project) => `projects/${project.slug}`)];

  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: absoluteUrl(localePath(locale, path)),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((candidate) => [candidate, absoluteUrl(localePath(candidate, path))]),
        ),
      },
    })),
  );
}
