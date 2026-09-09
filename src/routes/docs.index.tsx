import { createFileRoute } from "@tanstack/react-router";
import { DocsMarkdown } from "@/components/docs-markdown";
import { getDoc } from "@/data/docs";

export const Route = createFileRoute("/docs/")({ component: DocsIndex });

function DocsIndex() {
  const overview = getDoc("overview");
  return (
    <article>
      <p className="font-mono text-sm text-primary">docs</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        {overview?.title ?? "OriginByte docs"}
      </h1>
      <div className="mt-8">
        {overview ? (
          <DocsMarkdown markdown={overview.markdown} />
        ) : (
          <p className="text-muted">Documentation is being restored.</p>
        )}
      </div>
    </article>
  );
}
