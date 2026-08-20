import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { localePath, type Dictionary, type Locale } from "@/lib/i18n";
import type { Project } from "@/lib/project-schema";
import { Tag } from "@/components/tag";

export function ProjectCard({
  project,
  locale,
  dictionary,
}: {
  project: Project;
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <article className="group relative flex flex-col rounded-lg border border-border bg-surface p-6 transition-colors duration-200 hover:border-border-strong hover:bg-surface-hover">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-mono text-lg font-medium">
          <Link
            href={localePath(locale, `projects/${project.slug}`)}
            className="after:absolute after:inset-0"
          >
            {project.name}
          </Link>
        </h3>
        <time className="shrink-0 font-mono text-sm text-fg-muted">{project.year}</time>
      </div>

      <p className="mt-1 font-mono text-sm text-accent">{project.role[locale]}</p>
      <p className="mt-4 flex-1 text-sm text-fg-muted">{project.summary[locale]}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((item, index) => (
          <li key={`${item}-${index}`}>
            <Tag>{item}</Tag>
          </li>
        ))}
      </ul>

      <p className="mt-6 flex items-center gap-1 font-mono text-sm text-fg-muted transition-colors duration-200 group-hover:text-accent">
        {dictionary.projects.viewProject}
        <ArrowUpRight size={16} aria-hidden />
      </p>
    </article>
  );
}
