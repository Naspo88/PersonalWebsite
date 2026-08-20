import { ArrowRight, DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { getDictionary, localePath } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/route-params";
import { buildMetadata } from "@/lib/metadata";
import { buildPersonSchema } from "@/lib/structured-data";
import { featuredFirst } from "@/lib/project-schema";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { ButtonLink } from "@/components/button-link";
import { ProjectCard } from "@/components/project-card";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";

type PageProps = { params: LocaleParams };

export async function generateMetadata({ params }: PageProps) {
  const locale = await resolveLocale(params);

  return buildMetadata({
    locale,
    title: `${profile.name} — ${profile.role[locale]}`,
    description: profile.positioning[locale],
  });
}

export default async function HomePage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);
  const featured = featuredFirst(projects).filter((project) => project.featured);

  return (
    <Container>
      <JsonLd schema={buildPersonSchema(locale)} />

      <section className="py-20 lg:py-28">
        <p className="font-mono text-sm text-accent">$ {dictionary.home.eyebrow}</p>
        <h1 className="mt-6 text-2xl font-bold lg:text-3xl">{profile.name}</h1>
        <p className="mt-3 font-mono text-lg text-fg-muted">{profile.role[locale]}</p>
        <p className="mt-8 max-w-[60ch] text-lg">{profile.positioning[locale]}</p>

        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href={`/cv-${locale}.pdf`} download>
            <DownloadSimple size={16} aria-hidden />
            {dictionary.home.ctaPrimary}
          </ButtonLink>
          <ButtonLink href={localePath(locale, "contact")} variant="secondary">
            {dictionary.home.ctaSecondary}
          </ButtonLink>
        </div>
      </section>

      <Section title={dictionary.home.selectedWork}>
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((project, index) => (
            <Reveal key={project.slug} delayMs={index * 50}>
              <ProjectCard project={project} locale={locale} dictionary={dictionary} />
            </Reveal>
          ))}
        </div>

        <p className="mt-8">
          <ButtonLink href={localePath(locale, "projects")} variant="secondary">
            {dictionary.home.seeAllWork}
            <ArrowRight size={16} aria-hidden />
          </ButtonLink>
        </p>
      </Section>

      <Section title={dictionary.home.about}>
        <div className="max-w-[68ch] space-y-4 text-lg">
          {profile.about[locale].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <p className="mt-8">
          <ButtonLink href={localePath(locale, "cv")} variant="secondary">
            {dictionary.home.seeFullCv}
            <ArrowRight size={16} aria-hidden />
          </ButtonLink>
        </p>
      </Section>
    </Container>
  );
}
