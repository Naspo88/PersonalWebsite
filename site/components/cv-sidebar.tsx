import { formatMonth } from "@/lib/cv-schema";
import type { Dictionary, Locale } from "@/lib/i18n";
import { cv } from "@/content/cv";

export function CvSidebar({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <div className="space-y-12">
      <section>
        <SidebarHeading>{dictionary.cv.skills}</SidebarHeading>
        <dl className="mt-6 space-y-5">
          {cv.skills.map((group) => (
            <div key={group.label[locale]}>
              <dt className="font-mono text-sm text-fg">{group.label[locale]}</dt>
              <dd className="mt-1 text-sm text-fg-muted">{group.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <SidebarHeading>{dictionary.cv.education}</SidebarHeading>
        <ol className="mt-6 space-y-5">
          {cv.education.map((entry) => (
            <li key={entry.institution}>
              <p className="font-mono text-sm text-fg">{entry.qualification[locale]}</p>
              <p className="mt-1 text-sm text-fg-muted">{entry.field[locale]}</p>
              <p className="mt-1 text-sm text-fg-muted">
                {entry.institution} ·{" "}
                <time className="tabular">
                  {entry.startDate.slice(0, 4)}–{entry.endDate.slice(0, 4)}
                </time>
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <SidebarHeading>{dictionary.cv.languages}</SidebarHeading>
        <dl className="mt-6 space-y-3">
          {cv.languages.map((language) => (
            <div key={language.name[locale]} className="flex justify-between gap-4 text-sm">
              <dt className="text-fg">{language.name[locale]}</dt>
              <dd className="text-right text-fg-muted">{language.level[locale]}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <SidebarHeading>{dictionary.cv.certifications}</SidebarHeading>
        <ol className="mt-6 space-y-4">
          {cv.certifications.map((certification) => (
            <li key={`${certification.name}-${certification.date}`} className="text-sm">
              <p className="text-fg">{certification.name}</p>
              <p className="mt-1 text-fg-muted">
                {certification.issuer} ·{" "}
                <time className="tabular">{formatMonth(certification.date, locale)}</time>
              </p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function SidebarHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-sm tracking-widest text-fg-muted uppercase">{children}</h2>
  );
}
