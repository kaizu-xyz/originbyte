import { Link } from "@tanstack/react-router";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { BrandMark, Wordmark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const { isPending } = useCurrentUserState();

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
      <Link to="/" className="shrink-0" aria-label="OriginByte home">
        <Wordmark />
      </Link>
      <div className="flex items-center gap-3">
        {isPending ? (
          <div className="h-11 w-32 animate-pulse rounded-pill bg-fg/8" />
        ) : (
          <>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Button asChild size="md">
                <Link to="/login">
                  <BrandMark size={14} className="[&>span]:bg-primary-fg" />
                  Get Started
                </Link>
              </Button>
            </SignedOut>
          </>
        )}
      </div>
    </header>
  );
}
