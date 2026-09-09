import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { user, isPending } = useCurrentUserState();
  if (!isPending && user) return <Navigate to="/workspace" />;

  return (
    <main className="mx-auto grid min-h-[70vh] max-w-lg place-items-center px-5 py-16">
      <div className="w-full rounded-lg border border-border bg-card p-8">
        <BrandMark size={22} />
        <h1 className="mt-5 text-2xl font-bold tracking-tight">Get Started</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Sign in to save your stack and open a workspace with protocol, orderbook,
          SDK, and CLI quickstarts. Everything stays free — this just keeps your place.
        </p>
        <div className="mt-8 space-y-3">
          {isPending ? (
            <div className="h-11 animate-pulse rounded-pill bg-fg/8" />
          ) : authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => signIn(p.providerId, { callbackURL: "/workspace" })}
              >
                Continue with {p.label}
              </Button>
            ))
          ) : (
            <p className="text-sm text-muted">Sign-in is disabled.</p>
          )}
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          Prefer to browse first?{" "}
          <Link to="/docs" className="text-primary hover:underline">
            Read the docs
          </Link>
        </p>
      </div>
    </main>
  );
}
