"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { localePath, type Dictionary, type Locale } from "@/lib/i18n";
import { Container } from "@/components/container";
import { LocaleSwitcher } from "@/components/locale-switcher";

type NavItem = { href: string; label: string };

export function SiteNav({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const items = buildNavItems(locale, dictionary);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur">
      <Container>
        <nav aria-label={dictionary.nav.menu} className="flex h-16 items-center justify-between">
          <Link
            href={localePath(locale)}
            className="font-mono text-base font-medium tracking-tight text-fg"
          >
            <span className="text-accent">▚</span> rminghi
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {items.map((item) => (
              <li key={item.href}>
                <NavLink item={item} isActive={isActive(pathname, item.href)} />
              </li>
            ))}
            <li>
              <LocaleSwitcher locale={locale} dictionary={dictionary} />
            </li>
          </ul>

          <button
            type="button"
            aria-label={dictionary.nav.menu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex size-11 cursor-pointer items-center justify-center rounded text-fg md:hidden"
          >
            {isMenuOpen ? <X size={22} aria-hidden /> : <List size={22} aria-hidden />}
          </button>
        </nav>
      </Container>

      {isMenuOpen && (
        <div id="mobile-menu" className="border-t border-border md:hidden">
          <Container>
            <ul className="flex flex-col py-2">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex min-h-11 items-center font-mono text-sm text-fg-muted"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="flex min-h-11 items-center">
                <LocaleSwitcher locale={locale} dictionary={dictionary} />
              </li>
            </ul>
          </Container>
        </div>
      )}
    </header>
  );
}

function NavLink({ item, isActive }: { item: NavItem; isActive: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={`font-mono text-sm transition-colors duration-200 ${
        isActive ? "text-accent" : "text-fg-muted hover:text-fg"
      }`}
    >
      {item.label}
    </Link>
  );
}

function buildNavItems(locale: Locale, dictionary: Dictionary): NavItem[] {
  return [
    { href: localePath(locale, "projects"), label: dictionary.nav.projects },
    { href: localePath(locale, "cv"), label: dictionary.nav.cv },
    { href: localePath(locale, "notes"), label: dictionary.nav.notes },
    { href: localePath(locale, "contact"), label: dictionary.nav.contact },
  ];
}

function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(href);
}
