import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { profile } from "@/content/profile";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dictionary = getDictionary(locale as Locale);

  return (
    <Container>
      <section className="py-24">
        <p className="font-mono text-sm text-accent">$ {dictionary.home.eyebrow}</p>
        <h1 className="mt-4 text-3xl font-bold">{profile.name}</h1>
        <p className="mt-2 font-mono text-lg text-fg-muted">{profile.role[locale as Locale]}</p>
      </section>
    </Container>
  );
}
