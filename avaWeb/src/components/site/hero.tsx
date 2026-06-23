"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FlipText } from "@/components/ui/flip-text";
import { TypingKeyboard } from "@/components/ui/typing-keyboard";
import { LiquidMetalButton } from "@/components/ui/liquid-metal";
import { Eyebrow } from "./section";
import { EASE_OUT } from "./motion";
import { scrollToHash } from "@/lib/scroll";

const TERMINAL = `$ ava ship --prod
> build ok
> 0 type errors
> live in 42s
`;

export function Hero() {
  const reduce = useReducedMotion();

  // Subtle entrance for the surrounding copy; the flip headline animates itself.
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.7, ease: EASE_OUT, delay },
        };

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Engineering grid + ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-70" />
        <div className="ambient-glow absolute -top-24 left-1/2 size-[680px] -translate-x-1/2 opacity-60" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-36 md:px-8 md:pt-44 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-28">
        {/* Left — copy */}
        <div className="flex flex-col items-start gap-7">
          <motion.div {...rise(0)}>
            <Eyebrow>AvaPro · Software Engineering Studio</Eyebrow>
          </motion.div>

          <h1 className="text-balance text-5xl font-semibold leading-[1.04] tracking-tight md:text-6xl lg:text-7xl">
            <FlipText
              className="block"
              loop={false}
              duration={1.3}
              delay={0.15}
            >
              We engineer software
            </FlipText>
            <span className="text-chrome-bright mt-1 block">
              that outlasts trends.
            </span>
          </h1>

          <motion.p
            {...rise(0.12)}
            className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            Two practices, one standard of craft — we ship custom software for
            ambitious teams, and we build &amp; own a growing ecosystem of our
            own products.
          </motion.p>

          <motion.div
            {...rise(0.2)}
            className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-1"
          >
            <LiquidMetalButton
              size="lg"
              onClick={() => scrollToHash("#contact")}
            >
              Start a Project
            </LiquidMetalButton>

            <button
              type="button"
              onClick={() => scrollToHash("#projects")}
              className="group inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Explore our work
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>

        {/* Right — isometric typing keyboard (decorative, lg and up) */}
        <motion.div
          aria-hidden
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, scale: 0.96 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.9, ease: EASE_OUT, delay: 0.25 },
              })}
          className="relative hidden h-[460px] w-full lg:block"
        >
          <div className="absolute inset-0 grid place-items-center">
            <TypingKeyboard
              scale={0.72}
              accentColor="#4f7cac"
              secondaryAccent="#9fb2c8"
              autoTypeText={TERMINAL}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
