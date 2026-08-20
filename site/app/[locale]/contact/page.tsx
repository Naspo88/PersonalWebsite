import { getDictionary } from "@/lib/i18n";
import { resolveLocale, type LocaleParams } from "@/lib/route-params";
import { buildMetadata } from "@/lib/metadata";
import { profile } from "@/content/profile";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact-form";

type PageProps = { params: LocaleParams };

export async function generateMetadata({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);

  return buildMetadata({
    locale,
    title: dictionary.contact.title,
    description: dictionary.contact.subtitle,
    path: "contact",
  });
}

export default async function ContactPage({ params }: PageProps) {
  const locale = await resolveLocale(params);
  const dictionary = getDictionary(locale);

  return (
    <Container>
      <PageHeader title={dictionary.contact.title} subtitle={dictionary.contact.subtitle} />

      <div className="pb-24">
        <ContactForm dictionary={dictionary} />

        <p className="mt-12 border-t border-border pt-8 text-sm text-fg-muted">
          {dictionary.contact.orEmailMe}{" "}
          <a
            href={`mailto:${profile.email}`}
            className="text-accent underline underline-offset-4"
          >
            {profile.email}
          </a>
        </p>
      </div>
    </Container>
  );
}
