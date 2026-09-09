import { createFileRoute, notFound } from "@tanstack/react-router";
import { DocsNav } from "@/routes/docs";
import { getDoc } from "@/data/docs";

export const Route = createFileRoute("/docs/$slug")({
  component: DocPage,
});

function DocPage() {
  const { slug } = Route.useParams();
  const doc = getDoc(slug);
  if (!doc) throw notFound();

  return (
    <main className="mx-auto grid w-full max-w-5xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[220px_1fr]">
      <DocsNav current={slug} />
      <article>
        <p className="font-mono text-sm text-primary">docs/{slug}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {doc.title}
        </h1>
        <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-muted">
          {doc.body.map((block, i) => (
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
              {block.code && (
                <pre className="mt-4 overflow-x-auto rounded-lg border border-border bg-card p-4 font-mono text-[13px] text-fg">
                  <code>{block.code}</code>
                </pre>
              )}
            </div>
          ))}
        </div>
      </article>
    </main>
  );
}
