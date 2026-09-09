import { createFileRoute, Link } from "@tanstack/react-router";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Button } from "@/components/ui/button";
import { packages } from "@/data/packages";

export const Route = createFileRoute("/workspace")({ component: Workspace });

const steps = [
  {
    title: "Install suivm",
    detail: "Pin a Sui CLI the way nvm pins Node.",
    code: "cargo install suivm",
  },
  {
    title: "Add token-launch",
    detail: "Drop the standard into your Move package.",
    code: `git = "https://github.com/Origin-Byte/nft-protocol.git"`,
  },
  {
    title: "Pick an engine SDK",
    detail: "Unity and Unreal clients speak Sui JSON-RPC out of the box.",
    href: "/docs/unity-sdk" as const,
  },
];

function Workspace() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return (
      <main className="mx-auto max-w-3xl px-5 py-16">
        <div className="h-10 w-64 animate-pulse rounded-md bg-fg/8" />
        <div className="mt-8 h-40 animate-pulse rounded-lg bg-fg/8" />
      </main>
    );
  }
  if (!user) return <RedirectToSignIn />;

  const name = user.displayName ?? user.primaryEmail ?? "creator";

  return (
    <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <p className="font-mono text-sm text-primary">workspace</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">
        Welcome, {name}
      </h1>
      <p className="mt-3 text-muted">
        Three steps to a Sui-native collection or market. Skip whatever you already
        have running.
      </p>
      <ol className="mt-10 space-y-4">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="rounded-lg border border-border bg-card p-5"
          >
            <p className="font-mono text-xs text-primary">0{i + 1}</p>
            <h2 className="mt-1 text-lg font-semibold">{step.title}</h2>
            <p className="mt-1 text-sm text-muted">{step.detail}</p>
            {step.code && (
              <pre className="mt-4 overflow-x-auto rounded-md bg-bg p-3 font-mono text-[13px]">
                <code>{step.code}</code>
              </pre>
            )}
          </li>
        ))}
      </ol>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/docs">Open docs</Link>
        </Button>
        <Button asChild variant="outline">
          <a href="https://github.com/Origin-Byte" target="_blank" rel="noreferrer">
            GitHub org
          </a>
        </Button>
      </div>
      <h2 className="mt-16 text-lg font-semibold">Packages</h2>
      <ul className="mt-4 divide-y divide-border rounded-lg border border-border bg-card">
        {packages.map((p) => (
          <li key={p.slug}>
            <Link
              to="/packages/$slug"
              params={{ slug: p.slug }}
              className="flex items-center justify-between px-4 py-3 text-sm hover:bg-bg"
            >
              <span className="font-mono">{p.name}</span>
              <span className="text-muted">{p.language}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
