import { cn } from "@/lib/cn";

export function BrandMark({ className, size = 18 }: { className?: string; size?: number }) {
  const gap = Math.max(2, Math.round(size * 0.18));
  const dot = Math.max(4, Math.round(size * 0.32));
  return (
    <span
      className={cn("inline-grid shrink-0 grid-cols-2", className)}
      style={{ gap, width: size, height: size }}
      aria-hidden
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <span
          key={i}
          className="rounded-full bg-primary"
          style={{ width: dot, height: dot }}
        />
      ))}
    </span>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <BrandMark size={16} />
      <span className="text-[17px] font-medium tracking-tight text-fg">
        originbyte
      </span>
    </span>
  );
}
