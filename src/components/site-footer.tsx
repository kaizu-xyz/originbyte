import { Link } from "@tanstack/react-router";
import { Wordmark } from "@/components/brand-mark";

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-24 w-full max-w-6xl border-t border-border px-5 py-10 sm:px-8">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <Wordmark />
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <Link to="/docs" className="hover:text-fg">
            Docs
          </Link>
          <a
            href="https://github.com/Origin-Byte"
            target="_blank"
            rel="noreferrer"
            className="hover:text-fg"
          >
            GitHub
          </a>
          <a
            href="https://x.com/Origin_Byte"
            target="_blank"
            rel="noreferrer"
            className="hover:text-fg"
          >
            X
          </a>
        </nav>
      </div>
      <p className="mt-8 text-xs text-muted">Composable trading layer on Sui</p>
    </footer>
  );
}
