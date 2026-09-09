import { Outlet, createFileRoute } from "@tanstack/react-router";
import { DocsNav } from "@/components/docs-nav";

export const Route = createFileRoute("/docs")({ component: DocsLayout });

function DocsLayout() {
  return (
    <main className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[240px_1fr]">
      <DocsNav />
      <Outlet />
    </main>
  );
}
