import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { getDictionary, locales, localePath } from "@/lib/i18n";
import { resolveLocale, type LocaleSlugParams } from "@/lib/route-params";
import { buildMetadata } from "@/lib/metadata";
import type { Project } from "@/lib/project-schema";
import { projects } from "@/content/projects";
import { Container } from "@/components/container";
import { Tag } from "@/components/tag";

type PageProps = { params: LocaleSlugParams };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const project = findProject(slug);

  return buildMetadata({
    locale,
    title: project.name,
    description: project.summary[locale],
    path: `projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);
  const project = findProject(slug);

  const sections = [
    { title: dictionary.projects.role, body: project.role[locale] },
    { title: dictionary.projects.outcome, body: project.outcome[locale] },
  ];

  return (
    <Container>
      <article className="pb-24">
        <header className="py-16 lg:py-20">
          <Link
            href={localePath(locale, "projects")}
            className="inline-flex items-center gap-2 font-mono text-sm text-fg-muted transition-colors duration-200 hover:text-accent"
          >
            <ArrowLeft size={16} aria-hidden />
            {dictionary.projects.backToWork}
          </Link>

          <h1 className="mt-8 text-2xl font-bold lg:text-3xl">{project.name}</h1>
          <p className="mt-4 max-w-[60ch] text-lg text-fg-muted">{project.summary[locale]}</p>

          <dl className="mt-8 grid gap-6 sm:grid-cols-3">
            {sections.map((section) => (
              <div key={section.title}>
                <dt className="font-mono text-xs tracking-widest text-fg-muted uppercase">
                  {section.title}
                </dt>
                <dd className="mt-2 text-sm">{section.body}</dd>
              </div>
            ))}
            <div>
              <dt className="font-mono text-xs tracking-widest text-fg-muted uppercase">
                {dictionary.projects.year}
              </dt>
              <dd className="mt-2 text-sm tabular">{project.year}</dd>
            </div>
          </dl>
        </header>

        <div className="max-w-[68ch] space-y-10 border-t border-border pt-12">
          <p className="text-lg">{project.problem[locale]}</p>
          <p className="text-lg">{project.approach[locale]}</p>

          <ul className="space-y-3">
            {project.highlights[locale].map((highlight) => (
              <li key={highlight} className="flex gap-3 text-fg-muted">
                <span className="mt-1 font-mono text-accent" aria-hidden>
                  —
                </span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <footer className="mt-12 border-t border-border pt-8">
          <h2 className="font-mono text-xs tracking-widest text-fg-muted uppercase">
            {dictionary.projects.stack}
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((item, index) => (
              <li key={`${item}-${index}`}>
                <Tag>{item}</Tag>
              </li>
            ))}
          </ul>

          <ul className="mt-8 flex flex-wrap gap-6">
            {project.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-sm text-accent underline underline-offset-4"
                >
                  {link.label[locale]}
                  <ArrowUpRight size={16} aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </footer>
      </article>
    </Container>
  );
}

function findProject(slug: string): Project {
  const project = projects.find((candidate) => candidate.slug === slug);
  if (!project) notFound();
  return project;
}
