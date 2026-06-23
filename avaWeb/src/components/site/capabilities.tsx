"use client";

import { useReducedMotion } from "framer-motion";
import { FlipFadeText } from "@/components/ui/flip-fade-text";
import { TwistingRibbon } from "@/components/ui/twisting-ribbon";
import { Container, Eyebrow } from "./section";
import { Reveal } from "./motion";

const PHRASES = [
  "Problem solving",
  "System design",
  "Machine Learning",
  "Full-stack development",
  "Performance",
  "Architecture",
];

// Iridescent cool-metal palette — silver face catching blue / violet / cyan,
// so it reads as a colored metallic ribbon while staying on-brand.
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

export function Capabilities() {
  const reduce = useReducedMotion();

  return (
    <section
      id="capabilities"
      className="relative isolate flex min-h-[78vh] scroll-mt-28 items-center overflow-hidden border-y border-foreground/10 py-24 md:py-28"
    >
      {/* Background: tamed metallic ribbon (or a static wash for reduced motion) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {reduce ? (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--foreground)_8%,transparent),transparent_70%)]" />
        ) : (
          <TwistingRibbon
            className="absolute inset-0 size-full rounded-none opacity-90"
            segments={340}
            waveAmplitude={1.25}
            twistCycles={5}
            ribbonWidth={36}
            darkColors={RIBBON_DARK}
            lightColors={RIBBON_LIGHT}
          />
        )}
        {/* Radial scrim: just enough darkening behind the centered text for
            legibility, while the colored ribbon stays clearly visible. */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_66%_58%_at_50%_50%,color-mix(in_oklab,var(--background)_64%,transparent),color-mix(in_oklab,var(--background)_8%,transparent))]" />
        {/* fade into the section borders top & bottom */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      <Container className="flex flex-col items-center gap-8 text-center">
        <Reveal className="flex flex-col items-center gap-4">
          <Eyebrow>Capabilities</Eyebrow>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            We&apos;re built for the part of the project everyone else routes
            around. What we&apos;re great at:
          </p>
        </Reveal>

        {reduce ? (
          <p className="text-3xl font-bold uppercase tracking-wider text-foreground md:text-5xl">
            Problem solving · System design · Applied AI
          </p>
        ) : (
          <FlipFadeText
            words={PHRASES}
            interval={3800}
            letterDuration={0.5}
            staggerDelay={0.045}
            exitStaggerDelay={0.028}
            className="min-h-[420px] md:min-h-[460px]"
            textClassName="text-[clamp(1.35rem,5vw,3.25rem)] md:text-[clamp(1.35rem,5vw,3.25rem)] gap-[0.04em] font-bold uppercase tracking-tight text-foreground"
          />
        )}
      </Container>
    </section>
  );
}
