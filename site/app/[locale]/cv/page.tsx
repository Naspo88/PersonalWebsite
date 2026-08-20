import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { getDictionary } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/route-params";
import { buildMetadata } from "@/lib/metadata";
import { formatMonth } from "@/lib/cv-schema";
import { cv } from "@/content/cv";
import { profile } from "@/content/profile";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/button-link";
import { CvExperience } from "@/components/cv-experience";
import { CvSidebar } from "@/components/cv-sidebar";
import "./print.css";

type PageProps = { params: LocaleParams };

export async function generateMetadata({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);

  return buildMetadata({
    locale,
    title: `${dictionary.cv.title} — ${profile.name}`,
    description: profile.positioning[locale],
    path: "cv",
  });
}

export default async function CvPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);

  return (
    <Container>
      <div className="cv-document pb-24">
        <header className="flex flex-wrap items-end justify-between gap-6 py-16 lg:py-20">
          <div>
            <h1 className="text-2xl font-bold lg:text-3xl">{profile.name}</h1>
            <p className="mt-3 font-mono text-lg text-fg-muted">{profile.role[locale]}</p>
            <p className="mt-2 text-sm text-fg-muted">
              {profile.location[locale]} · <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>
          </div>

          <div className="cv-hide-in-print flex flex-col items-start gap-2">
            <ButtonLink href={`/cv-${locale}.pdf`} download>
              <DownloadSimple size={16} aria-hidden />
              {dictionary.cv.download}
            </ButtonLink>
            <p className="font-mono text-xs text-fg-muted">
              {dictionary.cv.updated} <time className="tabular">{formatMonth(cv.updatedAt, locale)}</time>
            </p>
          </div>
        </header>

        <div className="grid gap-16 border-t border-border pt-12 lg:grid-cols-[2fr_1fr]">
          <CvExperience locale={locale} dictionary={dictionary} />
          <CvSidebar locale={locale} dictionary={dictionary} />
        </div>
      </div>
    </Container>
  );
}
