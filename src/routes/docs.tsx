import { createFileRoute, Link } from "@tanstack/react-router";
import { docsNav, getDoc } from "@/data/docs";

export const Route = createFileRoute("/docs")({ component: DocsIndex });

function DocsIndex() {
  const overview = getDoc("overview");
  return (
    <main className="mx-auto grid w-full max-w-5xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[220px_1fr]">
      <DocsNav current="overview" />
      <article>
        <p className="font-mono text-sm text-primary">docs</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {overview?.title}
        </h1>
        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-muted">
          {overview?.body.map((block, i) => (
            <div key={i}>
              {block.heading && (
                <h2 className="mb-2 text-lg font-semibold text-fg">
                  {block.heading}
                </h2>
              )}
              {block.paragraphs.map((p) => (
                <p key={p} className="mb-3">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {docsNav
            .filter((d) => d.slug !== "overview")
            .map((d) => (
              <Link
                key={d.slug}
                to="/docs/$slug"
                params={{ slug: d.slug }}
                className="rounded-lg border border-border bg-card px-4 py-4 text-sm font-medium hover:border-primary/30"
              >
                {d.title}
              </Link>
            ))}
        </div>
      </article>
    </main>
  );
}

export function DocsNav({ current }: { current: string }) {
  return (
    <nav className="lg:sticky lg:top-8 lg:self-start">
      <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">
        Documentation
      </p>
      <ul className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
        {docsNav.map((item) => (
          <li key={item.slug}>
            <Link
              to={item.slug === "overview" ? "/docs" : "/docs/$slug"}
              params={item.slug === "overview" ? undefined : { slug: item.slug }}
              className={
                item.slug === current
                  ? "block rounded-md bg-primary/8 px-3 py-2 text-sm font-medium text-primary"
                  : "block rounded-md px-3 py-2 text-sm text-muted hover:bg-fg/5 hover:text-fg"
              }
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
