import Link from "next/link";
import type { ReactNode } from "react";

const BASE =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded px-5 font-mono text-sm transition-colors duration-200";

const VARIANTS = {
  primary: "bg-accent text-on-accent hover:bg-accent-hover",
  secondary: "border border-border-strong text-fg hover:border-fg hover:bg-surface",
} as const;

export function ButtonLink({
  href,
  variant = "primary",
  download,
  children,
}: {
  href: string;
  variant?: keyof typeof VARIANTS;
  download?: boolean;
  children: ReactNode;
}) {
  const className = `${BASE} ${VARIANTS[variant]}`;

  if (download) {
    return (
      <a href={href} download className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
