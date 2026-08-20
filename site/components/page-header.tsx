export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="py-16 lg:py-20">
      <h1 className="text-2xl font-bold lg:text-3xl">{title}</h1>
      {subtitle && <p className="mt-4 max-w-[60ch] text-lg text-fg-muted">{subtitle}</p>}
    </header>
  );
}
