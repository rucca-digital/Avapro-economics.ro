import { Section, SectionHeader } from "./section";
import { Stagger, StaggerItem } from "./motion";
import { PROCESS } from "@/lib/site-data";

export function Process() {
  return (
    <Section id="process" className="cv-section border-t border-foreground/10">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-30" />

      <div className="flex flex-col gap-14">
        <SectionHeader
          eyebrow="How we work"
          title="Built to compound,"
          accent="not to hand off."
          description="We don't disappear at launch. Every engagement is set up as a system that keeps paying down over years — not a one-off delivery."
        />

        <Stagger className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step) => {
            const Icon = step.icon;
            return (
              <StaggerItem
                key={step.index}
                className="group relative flex flex-col gap-5 bg-background p-7 transition-colors duration-300 hover:bg-foreground/[0.02] md:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-muted-foreground">
                    {step.index}
                  </span>
                  <span className="grid size-10 place-items-center rounded-lg border border-foreground/12 bg-gradient-to-b from-foreground/10 to-transparent text-foreground">
                    <Icon className="size-5" aria-hidden />
                  </span>
                </div>
                <div className="flex flex-col gap-2.5">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}
