import { formatDateRange, type Experience } from "@/lib/cv-schema";
import type { Dictionary, Locale } from "@/lib/i18n";
import { cv } from "@/content/cv";
import { Tag } from "@/components/tag";

export function CvExperience({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <section>
      <h2 className="font-mono text-sm tracking-widest text-fg-muted uppercase">
        {dictionary.cv.experience}
      </h2>

      <ol className="mt-8 space-y-12">
        {cv.experience.map((entry) => (
          <li key={`${entry.company}-${entry.startDate}`}>
            <ExperienceEntry entry={entry} locale={locale} dictionary={dictionary} />
          </li>
        ))}
      </ol>
    </section>
  );
}

function ExperienceEntry({
  entry,
  locale,
  dictionary,
}: {
  entry: Experience;
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <article>
      <h3 className="font-mono text-lg font-medium">{entry.title[locale]}</h3>

      <p className="mt-1 text-sm text-fg-muted">
        <span className="text-accent">{entry.company}</span> · {entry.location} ·{" "}
        <time className="tabular">
          {formatDateRange(entry.startDate, entry.endDate, locale, dictionary.cv.present)}
        </time>
      </p>

      <p className="mt-4 max-w-[68ch]">{entry.summary[locale]}</p>

      <ul className="mt-4 space-y-2">
        {entry.highlights[locale].map((highlight) => (
          <li key={highlight} className="flex gap-3 text-sm text-fg-muted">
            <span className="mt-0.5 font-mono text-accent" aria-hidden>
              —
            </span>
            {highlight}
          </li>
        ))}
      </ul>

      <ul className="mt-4 flex flex-wrap gap-2">
        {entry.stack.map((item, index) => (
          <li key={`${item}-${index}`}>
            <Tag>{item}</Tag>
          </li>
        ))}
      </ul>
    </article>
  );
}
