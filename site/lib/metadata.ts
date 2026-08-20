import type { Metadata } from "next";
import { locales, localePath, type Locale } from "@/lib/i18n";
import { siteConfig, absoluteUrl } from "@/lib/site-config";
import { profile } from "@/content/profile";

type PageMeta = {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
};

export function buildMetadata({ locale, title, description, path = "" }: PageMeta): Metadata {
  const canonical = absoluteUrl(localePath(locale, path));
  const socialImage = absoluteUrl(`/og-${locale}.png`);

  return {
    title,
    description,
    metadataBase: new URL(siteConfig.siteUrl),
    alternates: {
      canonical,
      languages: Object.fromEntries([
        ...locales.map((candidate) => [candidate, absoluteUrl(localePath(candidate, path))]),
        ["x-default", absoluteUrl(localePath("en", path))],
      ]),
    },
    openGraph: {
      type: "website",
      siteName: profile.name,
      locale,
      title,
      description,
      url: canonical,
      images: [{ url: socialImage, width: 1200, height: 630, alt: profile.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}
