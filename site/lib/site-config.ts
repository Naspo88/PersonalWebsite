export const siteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  contactEndpoint: "/api/contact",
  repositoryUrl: "https://github.com/Naspo88/PersonalWebsite",
} as const;

export function absoluteUrl(path: string): string {
  return new URL(path, siteConfig.siteUrl).toString();
}
