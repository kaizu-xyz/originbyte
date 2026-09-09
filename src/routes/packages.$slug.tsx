import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { getPackage } from "@/data/packages";

export const Route = createFileRoute("/packages/$slug")({
  component: PackagePage,
});

function PackagePage() {
  const { slug } = Route.useParams();
  const item = getPackage(slug);
  if (!item) throw notFound();

  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <Link to="/" className="text-sm text-muted hover:text-fg">
        ← All packages
      </Link>
      <div className="mt-6 flex items-center gap-2">
        <span className="size-2.5 rounded-[2px] bg-fg" />
        <h1 className="font-mono text-3xl font-semibold tracking-tight">
          {item.name}
        </h1>
      </div>
      <p className="mt-2 font-mono text-sm text-primary">{item.language}</p>
      <p className="mt-6 text-[16px] leading-relaxed text-muted">{item.summary}</p>
      <p className="mt-4 text-[16px] leading-relaxed text-muted">{item.details}</p>
      {item.install && (
        <pre className="mt-8 overflow-x-auto rounded-lg border border-border bg-card p-4 font-mono text-[13px]">
          <code>{item.install}</code>
        </pre>
      )}
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <a href={item.github} target="_blank" rel="noreferrer">
            View on GitHub
          </a>
        </Button>
        <Button asChild variant="outline">
          <Link to="/docs">Read the docs</Link>
        </Button>
      </div>
    </main>
  );
}
