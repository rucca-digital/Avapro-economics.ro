import * as React from "react";
import { Medal } from "lucide-react";
import { Section, Eyebrow } from "./section";
import { Reveal, Stagger, StaggerItem, Counter, WordReveal } from "./motion";
import { STATS, COMPETITIONS } from "@/lib/site-data";

// Restrained cool accents — color only blooms on hover.
const ACCENTS = ["#7da5ff", "#a08cff", "#6ed2e6", "#8cd0a8"];

export function Credibility() {
  return (
    <Section id="team" className="border-y border-foreground/10">
      {/* subtle texture so the proof band reads as its own surface */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-40" />

      <div className="flex flex-col gap-14">
        <div className="flex max-w-3xl flex-col gap-5">
          <Reveal y={12}>
            <Eyebrow>Credentials</Eyebrow>
          </Reveal>
          <h2 className="text-balance text-3xl font-semibold leading-[1.1] tracking-tight md:text-4xl lg:text-[2.75rem]">
            <WordReveal text="The people solving your hardest problems" />
            <WordReveal
              text="already solved the world's hardest ones."
              className="text-chrome"
              delay={0.34}
            />
          </h2>
          <Reveal delay={0.15} y={14}>
            <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Our team is built from National and International Informatics &amp;
              AI Olympiad medalists — the same people who, under a clock,
              out-built the best in the world. That instinct is what we point at
              your roadmap.
            </p>
          </Reveal>
        </div>

        {/* Stats — staggered count-up, color blooms on hover */}
        <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/10 lg:grid-cols-4">
          {STATS.map((stat, i) => {
            const accent = ACCENTS[i % ACCENTS.length];
            return (
              <StaggerItem
                key={stat.label}
                className="hover-sheen group relative flex flex-col gap-2 overflow-hidden bg-background p-6 transition-colors duration-300 hover:bg-foreground/[0.03] md:p-8"
                style={{ ["--sheen" as string]: `${accent}3d` } as React.CSSProperties}
              >
                {/* accent bloom behind the number on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-3 -top-4 size-28 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-50"
                  style={{ background: accent }}
                />
                {/* accent bar that grows in on hover */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: accent }}
                />
                <span className="text-chrome relative font-mono text-5xl font-semibold tracking-tight transition-transform duration-300 group-hover:scale-[1.04] md:text-6xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="relative text-sm font-medium text-foreground">
                  {stat.label}
                </span>
                <span className="relative text-xs leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-foreground/70">
                  {stat.sub}
                </span>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Competition roll-call — monospace chips */}
        <Reveal className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <Medal className="size-4" aria-hidden />
            <span className="font-mono text-xs uppercase tracking-[0.2em]">
              Where they earned it
            </span>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {COMPETITIONS.map((comp) => (
              <span
                key={comp}
                className="rounded-full border border-foreground/12 bg-foreground/[0.03] px-3.5 py-1.5 font-mono text-xs text-foreground/75 transition-colors duration-200 hover:border-foreground/30 hover:text-foreground"
              >
                {comp}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
