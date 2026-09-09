import { createFileRoute, Link } from "@tanstack/react-router";
import { BrandMark } from "@/components/brand-mark";
import { CallSignature } from "@/components/call-signature";
import { PackageCard } from "@/components/package-card";
import { Button } from "@/components/ui/button";
import { packages, partners, values } from "@/data/packages";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main>
      <section className="mx-auto flex max-w-4xl flex-col px-5 pb-8 pt-16 sm:px-8 sm:pt-24">
        <div className="flex items-start justify-between gap-4">
          <CallSignature />
          <BrandMark size={28} className="mt-1 hidden sm:inline-grid" />
        </div>

        <h1 className="mt-8 max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-6xl">
          Composable trading
          <br />
          layer on Sui
        </h1>

        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4 text-primary">
            <a
              href="https://x.com/Origin_Byte"
              target="_blank"
              rel="noreferrer"
              aria-label="OriginByte on X"
              className="grid size-11 place-items-center rounded-full hover:bg-primary/8"
            >
              <XIcon />
            </a>
            <a
              href="https://github.com/Origin-Byte"
              target="_blank"
              rel="noreferrer"
              aria-label="OriginByte on GitHub"
              className="grid size-11 place-items-center rounded-full hover:bg-primary/8"
            >
              <GitHubIcon />
            </a>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" size="lg">
              <Link to="/docs">Docs</Link>
            </Button>
            <Button asChild size="lg">
              <Link to="/login">
                <BrandMark size={14} className="[&>span]:bg-primary-fg" />
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 grid max-w-5xl gap-4 px-5 sm:grid-cols-2 sm:px-8">
        {packages.map((item) => (
          <PackageCard key={item.slug} item={item} />
        ))}
      </section>

      <section className="mx-auto mt-16 grid max-w-5xl gap-4 px-5 sm:grid-cols-2 sm:px-8">
        {values.map((item) => (
          <article
            key={item.slug}
            className="rounded-lg border border-border bg-card p-5"
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="size-2.5 rounded-[2px] bg-primary" />
              <span className="font-mono text-sm font-medium">{item.name}</span>
            </div>
            <p className="text-sm leading-relaxed text-muted">{item.summary}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-24 max-w-5xl px-5 text-center sm:px-8">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Trusted by Sui's best
        </h2>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {partners.map((name) => (
            <li
              key={name}
              className="rounded-lg border border-border bg-card px-4 py-5 text-sm font-medium tracking-tight text-muted"
            >
              {name}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.477 2 2 6.486 2 12.021c0 4.425 2.865 8.18 6.839 9.504.5.093.682-.217.682-.483 0-.237-.009-.866-.013-1.7-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.621.069-.609.069-.609 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.847-2.339 4.695-4.566 4.943.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.749 0 .268.18.58.688.481A10.019 10.019 0 0 0 22 12.021C22 6.486 17.523 2 12 2z" />
    </svg>
  );
}
