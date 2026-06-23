import * as React from "react";
import { Section, SectionHeader } from "./section";
import { Stagger, StaggerItem } from "./motion";
import { SERVICES } from "@/lib/site-data";

// One cool accent per track — surfaces only on hover.
const TRACK_ACCENTS = ["#7da5ff", "#a08cff"];

export function Services() {
  return (
    <Section id="services">
      <div className="flex flex-col gap-14">
        <SectionHeader
          eyebrow="What we do"
          title="Two tracks,"
          accent="one standard of craft."
          description="We split our time deliberately: building for clients keeps us sharp on real-world constraints; building for ourselves keeps us honest about quality."
        />

        <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const accent = TRACK_ACCENTS[i % TRACK_ACCENTS.length];
            return (
              <StaggerItem
                key={service.title}
                className="group card-surface hover-sheen relative flex flex-col gap-6 overflow-hidden rounded-3xl p-7 transition-colors duration-300 hover:border-foreground/25 md:p-9"
                style={{ ["--sheen" as string]: `${accent}38` } as React.CSSProperties}
              >
                {/* top highlight on hover */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                {/* accent bloom from the corner on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-12 size-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                  style={{ background: accent }}
                />

                <div className="relative flex items-center justify-between">
                  <span
                    className="grid size-12 place-items-center rounded-xl border border-foreground/12 bg-gradient-to-b from-foreground/10 to-transparent text-foreground transition-colors duration-300 group-hover:[border-color:color-mix(in_oklab,var(--track-accent)_55%,transparent)] group-hover:[color:var(--track-accent)]"
                    style={{ ["--track-accent" as string]: accent } as React.CSSProperties}
                  >
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {service.kicker}
                  </span>
                </div>

                <div className="relative flex flex-col gap-3">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-pretty text-base leading-relaxed text-muted-foreground">
                    {service.pitch}
                  </p>
                </div>

                <div className="relative mt-auto flex flex-wrap gap-2 border-t border-foreground/10 pt-6">
                  {service.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="rounded-full bg-foreground/[0.04] px-3 py-1 font-mono text-xs text-foreground/70 transition-colors duration-200 group-hover:text-foreground/85"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}
