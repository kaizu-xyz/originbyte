import { Link } from "@tanstack/react-router";
import { SignedIn, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Wordmark } from "@/components/brand-mark";

export function SiteHeader() {
  const { isPending } = useCurrentUserState();

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
      <Link to="/" className="shrink-0" aria-label="OriginByte home">
        <Wordmark />
      </Link>
      {isPending ? (
        <div className="h-11 w-11 animate-pulse rounded-pill bg-fg/8" />
      ) : (
        <SignedIn>
          <UserButton />
        </SignedIn>
      )}
    </header>
  );
}
