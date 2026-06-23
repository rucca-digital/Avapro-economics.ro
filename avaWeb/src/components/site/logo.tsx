import { cn } from "@/lib/utils";

/** Geometric "A" mark — an angular peak with a crossbar, set in a chrome tile. */
export function Logo({
  className,
  withWordmark = true,
}: {
  className?: string;
  withWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative grid size-8 place-items-center overflow-hidden rounded-lg border border-foreground/15 bg-gradient-to-b from-foreground/12 to-transparent">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
          className="text-foreground"
        >
          <path
            d="M5 20 L12 4 L19 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.2 13.5 H15.8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>
      {withWordmark && (
        <span className="text-[0.95rem] font-semibold tracking-tight">
          Ava<span className="text-muted-foreground">Pro</span>
        </span>
      )}
    </span>
  );
}
