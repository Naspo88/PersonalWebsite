import { getDictionary } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/route-params";
import { buildMetadata } from "@/lib/metadata";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";

type PageProps = { params: LocaleParams };

export async function generateMetadata({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);

  return buildMetadata({
    locale,
    title: dictionary.notes.title,
    description: dictionary.notes.subtitle,
    path: "notes",
  });
}

export default async function NotesPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);

  return (
    <Container>
      <PageHeader title={dictionary.notes.title} subtitle={dictionary.notes.subtitle} />
      <p className="pb-24 text-fg-muted">{dictionary.notes.empty}</p>
    </Container>
  );
}
