"use client";

import { useReducedMotion } from "framer-motion";
import { GenerateButton } from "@/components/ui/generate-button";
import { TwistingRibbon } from "@/components/ui/twisting-ribbon";
import { Reveal, WordReveal } from "./motion";
import { Eyebrow } from "./section";
import { CONTACT_EMAIL } from "@/lib/site-data";

const RIBBON_DARK = {
  face: "#e3e8f2",
  foldA: "#5b8def",
  foldB: "#8b6cf0",
  foldC: "#3fb8d8",
};
const RIBBON_LIGHT = {
  face: "#3f4654",
  foldA: "#4f7fe0",
  foldB: "#7a5ce0",
  foldC: "#2f9fc4",
};

export function ClosingCTA() {
  const reduce = useReducedMotion();

  return (
    <section
      id="contact"
      className="relative isolate scroll-mt-28 overflow-hidden py-28 md:py-36"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        {!reduce && (
          <TwistingRibbon
            className="absolute inset-0 size-full rounded-none opacity-70"
            segments={200}
            waveAmplitude={0.85}
            twistCycles={5}
            ribbonWidth={38}
            darkColors={RIBBON_DARK}
            lightColors={RIBBON_LIGHT}
          />
        )}
        {/* darken toward the center so the CTA reads cleanly */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_64%_56%_at_50%_50%,color-mix(in_oklab,var(--background)_72%,transparent),color-mix(in_oklab,var(--background)_16%,transparent))]" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-30" />
      </div>

      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-6 text-center">
        <div className="flex flex-col items-center gap-6">
          <Reveal y={12}>
            <Eyebrow>Start a project</Eyebrow>
          </Reveal>
          <h2 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            <WordReveal text="Let's build something" />
            <WordReveal
              text="that lasts."
              className="text-chrome-bright"
              delay={0.1}
            />
          </h2>
          <Reveal delay={0.2} y={14}>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Tell us about the hard part. If it&apos;s worth solving well,
              it&apos;s the kind of problem we look for.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="flex flex-col items-center gap-5">
          <GenerateButton
            hue={210}
            idleText="Contact"
            activeText="Connecting"
            onClick={() => {
              window.location.href = `mailto:${CONTACT_EMAIL}`;
            }}
          />
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {CONTACT_EMAIL}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
