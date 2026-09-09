import { Link, useParams } from "@tanstack/react-router";
import { docsNav, type DocsNavItem } from "@/data/docs";
import { cn } from "@/lib/cn";

export function DocsNav() {
  const params = useParams({ strict: false }) as { _splat?: string };
  const current = params._splat ?? "overview";
  const tree = (
    <ul className="flex flex-col gap-0.5">
      {docsNav.map((item) => (
        <NavNode key={item.slug} item={item} current={current} depth={0} />
      ))}
    </ul>
  );

  return (
    <nav className="lg:sticky lg:top-8 lg:max-h-[calc(100vh-4rem)] lg:self-start lg:overflow-y-auto">
      <details className="lg:hidden">
        <summary className="cursor-pointer font-mono text-xs uppercase tracking-wider text-muted">
          Documentation
        </summary>
        <div className="mt-3">{tree}</div>
      </details>
      <div className="hidden lg:block">
        <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">Documentation</p>
        {tree}
      </div>
    </nav>
  );
}

function NavNode({ item, current, depth }: { item: DocsNavItem; current: string; depth: number }) {
  const active = item.slug === current;
  return (
    <li>
      <DocLink slug={item.slug} active={active} depth={depth}>
        {item.title}
      </DocLink>
      {item.children ? (
        <ul className="mt-0.5 flex flex-col gap-0.5">
          {item.children.map((child) => (
            <NavNode key={child.slug} item={child} current={current} depth={depth + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

function DocLink({
  slug,
  active,
  depth,
  children,
}: {
  slug: string;
  active: boolean;
  depth: number;
  children: string;
}) {
  const className = cn(
    "block rounded-md py-1.5 text-sm",
    depth === 0 ? "px-3" : depth === 1 ? "pl-5 pr-3" : "pl-8 pr-3",
    active ? "bg-primary/8 font-medium text-primary" : "text-muted hover:bg-fg/5 hover:text-fg",
  );
  if (slug === "overview") {
    return (
      <Link to="/docs" className={className}>
        {children}
      </Link>
    );
  }
  return (
    <Link to="/docs/$" params={{ _splat: slug }} className={className}>
      {children}
    </Link>
  );
}
