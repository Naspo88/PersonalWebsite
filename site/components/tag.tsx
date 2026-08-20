import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded border border-border px-2 py-1 font-mono text-xs text-fg-muted">
      {children}
    </span>
  );
}
