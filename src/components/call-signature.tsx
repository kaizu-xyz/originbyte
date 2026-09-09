import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const FUNCTION_NAMES = [
  "public_goods_for_sui",
  "token_launch",
  "scale_launchpad",
  "open_orderbook",
  "post_limit_order",
  "fill_orderbook",
  "mint_collection",
  "enforce_royalties",
  "secondary_market",
  "unity_sdk",
  "unreal_sdk",
  "originmate",
];

export function CallSignature() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const timers: number[] = [];
    const id = window.setInterval(() => {
      if (reduced) {
        setIndex((i) => (i + 1) % FUNCTION_NAMES.length);
        return;
      }
      setVisible(false);
      timers.push(
        window.setTimeout(() => {
          setIndex((i) => (i + 1) % FUNCTION_NAMES.length);
          setVisible(true);
        }, 180),
      );
    }, 2000);

    return () => {
      window.clearInterval(id);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <p className="flex min-h-[2.5rem] flex-wrap items-baseline gap-x-2 font-mono text-2xl tracking-tight sm:min-h-10 sm:text-3xl">
      <span className="text-primary">call</span>
      <span
        aria-live="polite"
        className={cn(
          "text-fg transition-[opacity,transform] duration-200 ease-out",
          visible ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
        )}
      >
        {FUNCTION_NAMES[index]}
      </span>
    </p>
  );
}
