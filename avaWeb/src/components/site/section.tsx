import * as React from "react";
import { cn } from "@/lib/utils";
import { Reveal, WordReveal } from "./motion";

/** Consistent max-width / horizontal padding across every section. */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-6 md:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
  containerClassName,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-28 py-24 md:py-32", className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/** Monospace kicker — the "builders, not marketers" voice. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground",
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-foreground/50" aria-hidden />
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  /** Leading part of the heading, in normal foreground color. */
  title: string;
  /** Optional trailing part rendered in chrome gradient. */
  accent?: string;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const titleWords = title.split(" ").length;

  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-5",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      <Reveal y={12}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <h2 className="text-balance text-3xl font-semibold leading-[1.08] tracking-tight md:text-4xl lg:text-[2.75rem]">
        <WordReveal text={title} />
        {accent ? (
          <WordReveal
            text={accent}
            className="text-chrome"
            delay={titleWords * 0.05 + 0.04}
          />
        ) : null}
      </h2>
      {description ? (
        <Reveal delay={0.15} y={14}>
          <p
            className={cn(
              "text-pretty text-base leading-relaxed text-muted-foreground md:text-lg",
              align === "center" && "max-w-xl"
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
