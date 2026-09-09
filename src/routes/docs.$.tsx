import { createFileRoute, notFound } from "@tanstack/react-router";
import { DocsMarkdown } from "@/components/docs-markdown";
import { getDoc } from "@/data/docs";

export const Route = createFileRoute("/docs/$")({
  component: DocPage,
});

function DocPage() {
  const { _splat } = Route.useParams();
  const slug = _splat ?? "";
  const doc = getDoc(slug);
  if (!doc) throw notFound();

  return (
    <article>
      <p className="font-mono text-sm text-primary">docs/{slug}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{doc.title}</h1>
      <div className="mt-8">
        <DocsMarkdown markdown={doc.markdown} />
      </div>
    </article>
  );
}
