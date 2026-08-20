import Link from "next/link";
import { localePath, type Dictionary, type Locale } from "@/lib/i18n";
import { Container } from "@/components/container";
import { profile } from "@/content/profile";
import { siteConfig } from "@/lib/site-config";

function copyrightYears(): string {
  const currentYear = new Date().getFullYear();
  return currentYear > profile.foundedYear ? `${profile.foundedYear}–${currentYear}` : `${currentYear}`;
}

export function SiteFooter({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  return (
    <footer className="mt-24 border-t border-border bg-bg-deep py-12">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-mono text-sm text-fg">{profile.name}</p>
            <p className="mt-2 text-sm text-fg-muted">{dictionary.footer.builtWith}</p>
          </div>

          <ul className="flex flex-col gap-3 md:items-end">
            {profile.socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  rel="me noreferrer"
                  target="_blank"
                  className="font-mono text-sm text-fg-muted transition-colors duration-200 hover:text-accent"
                >
                  {social.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={siteConfig.repositoryUrl}
                rel="noreferrer"
                target="_blank"
                className="font-mono text-sm text-fg-muted transition-colors duration-200 hover:text-accent"
              >
                {dictionary.footer.sourceOnGitHub}
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-fg-muted md:flex-row md:justify-between">
          <p>
            © <span className="tabular">{copyrightYears()}</span> {profile.name}.{" "}
            {dictionary.footer.rights}
          </p>
          <Link href={localePath(locale, "contact")} className="hover:text-accent">
            {dictionary.nav.contact}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
