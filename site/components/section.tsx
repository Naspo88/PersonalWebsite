import type { ReactNode } from "react";

export function Section({
  title,
  id,
  children,
}: {
  title: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-t border-border py-16 lg:py-24">
      <h2 className="font-mono text-sm tracking-widest text-fg-muted uppercase">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}
