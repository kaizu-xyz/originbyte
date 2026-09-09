import { Link } from "@tanstack/react-router";
import type { Package } from "@/data/packages";

export function PackageCard({ item }: { item: Package }) {
  return (
    <Link
      to="/packages/$slug"
      params={{ slug: item.slug }}
      className="block rounded-lg border border-border bg-card p-5 transition-colors duration-200 hover:border-primary/30"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="size-2.5 rounded-[2px] bg-fg" />
        <span className="font-mono text-sm font-medium tracking-tight">
          {item.name}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-muted">{item.summary}</p>
    </Link>
  );
}
