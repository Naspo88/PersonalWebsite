"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Dictionary, type Locale } from "@/lib/i18n";

export function LocaleSwitcher({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1" aria-label={dictionary.nav.switchLanguage}>
      {locales.map((candidate, index) => (
        <span key={candidate} className="flex items-center">
          {index > 0 && <span className="px-1 text-border-strong" aria-hidden>/</span>}
          <LocaleLink
            candidate={candidate}
            isCurrent={candidate === locale}
            href={swapLocale(pathname, candidate)}
          />
        </span>
      ))}
    </div>
  );
}

function LocaleLink({
  candidate,
  isCurrent,
  href,
}: {
  candidate: Locale;
  isCurrent: boolean;
  href: string;
}) {
  if (isCurrent) {
    return (
      <span aria-current="true" className="font-mono text-sm text-accent uppercase">
        {candidate}
      </span>
    );
  }

  return (
    <Link
      href={href}
      hrefLang={candidate}
      className="font-mono text-sm text-fg-muted uppercase transition-colors duration-200 hover:text-fg"
    >
      {candidate}
    </Link>
  );
}

function swapLocale(pathname: string, target: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  segments[0] = target;
  return `/${segments.join("/")}/`;
}
