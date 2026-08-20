import { getDictionary } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/route-params";
import { buildMetadata } from "@/lib/metadata";
import { featuredFirst } from "@/lib/project-schema";
import { projects } from "@/content/projects";
import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";

type PageProps = { params: LocaleParams };

export async function generateMetadata({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);

  return buildMetadata({
    locale,
    title: dictionary.projects.title,
    description: dictionary.projects.subtitle,
    path: "projects",
  });
}

export default async function ProjectsPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);
  const ordered = featuredFirst(projects);

  return (
    <Container>
      <PageHeader title={dictionary.projects.title} subtitle={dictionary.projects.subtitle} />

      {ordered.length === 0 ? (
        <p className="pb-24 text-fg-muted">{dictionary.projects.empty}</p>
      ) : (
        <div className="grid gap-6 pb-24 md:grid-cols-2">
          {ordered.map((project, index) => (
            <Reveal key={project.slug} delayMs={index * 50}>
              <ProjectCard project={project} locale={locale} dictionary={dictionary} />
            </Reveal>
          ))}
        </div>
      )}
    </Container>
  );
}
