"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  SiTypescript,
  SiRust,
  SiGo,
  SiReact,
  SiNextdotjs,
  SiPython,
  SiPostgresql,
  SiKubernetes,
  SiDocker,
  SiGraphql,
  SiRedis,
  SiPytorch,
} from "react-icons/si";
import { Sparkles, LineChart, Network } from "lucide-react";
import type { TechTile, BentoItem } from "@/components/ui/staggered-grid";
import { Section, SectionHeader } from "./section";
import { Stagger, StaggerItem, EASE_OUT, ScrollWave } from "./motion";
import { projectImage } from "@/lib/mockup";
import { cn } from "@/lib/utils";

// Lazy-load the GSAP-heavy grid so it (and gsap) only ship when actually shown.
const StaggeredGrid = React.lazy(() =>
  import("@/components/ui/staggered-grid").then((m) => ({
    default: m.StaggeredGrid,
  }))
);

const TECH: TechTile[] = [
  { name: "TypeScript", icon: <SiTypescript /> },
  { name: "Rust", icon: <SiRust /> },
  { name: "Go", icon: <SiGo /> },
  { name: "React", icon: <SiReact /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Python", icon: <SiPython /> },
  { name: "PostgreSQL", icon: <SiPostgresql /> },
  { name: "Kubernetes", icon: <SiKubernetes /> },
  { name: "Docker", icon: <SiDocker /> },
  { name: "GraphQL", icon: <SiGraphql /> },
  { name: "Redis", icon: <SiRedis /> },
  { name: "PyTorch", icon: <SiPytorch /> },
];

const BENTO: BentoItem[] = [
  {
    id: "feast",
    title: "Feast",
    subtitle: "Ecosystem",
    description: "Loyalty & rewards app — live on Google Play.",
    icon: <Sparkles className="size-4" />,
    image: projectImage({ name: "Feast", hue: 35, kind: "Ecosystem" }),
    href: "https://play.google.com/store/apps/details?id=com.SoftHoardersApp&hl=ro",
  },
  {
    id: "feast-business",
    title: "Feast Business",
    subtitle: "Ecosystem",
    description: "Merchant portal for rewards & transactions.",
    icon: <LineChart className="size-4" />,
    image: projectImage({ name: "Feast Business", hue: 215, kind: "Ecosystem" }),
    href: "https://business.feastapp.ro/",
  },
  {
    id: "erasmus",
    title: "Erasmus",
    subtitle: "Client",
    description: "Erasmus platform for CN Frații Buzești.",
    icon: <Network className="size-4" />,
    image: projectImage({ name: "Erasmus", hue: 255, kind: "Client" }),
    href: "https://erasmus.softhoarders.me/",
  },
];

export function StackShowcase() {
  const reduce = useReducedMotion();

  return (
    <Section id="stack" className="overflow-hidden">
      <SectionHeader
        eyebrow="The toolkit"
        title="The stack behind the work,"
        accent="and the apps we run on it."
        description="The languages and systems we reach for, wrapped around a few products from our own ecosystem."
        align="center"
        className="mx-auto"
      />

      {/* Desktop: the animated staggered grid (skipped for reduced motion) */}
      {!reduce && (
        <div className="mt-6 hidden lg:block">
          <React.Suspense fallback={<div className="h-[60vh]" />}>
            <StaggeredGrid
              centerText="BUILD"
              techStack={TECH}
              bentoItems={BENTO}
              showFooter={false}
            />
          </React.Suspense>
        </div>
      )}

      {/* Mobile / reduced-motion: an animated showcase (not just static cards).
          Scroll-driven reveals + tap feedback — no idle loops, smooth on phones. */}
      <div
        className={cn(
          "relative isolate",
          reduce ? "mt-12" : "mt-12 lg:hidden"
        )}
      >
        {/* Colored wave that draws through the card gutters as you scroll */}
        <ScrollWave />

        {/* BUILD wordmark — letters flip up on scroll */}
        <div className="flex justify-center overflow-hidden py-2 [perspective:800px]">
          <div className="flex gap-1 sm:gap-2" aria-label="Build">
            {"BUILD".split("").map((ch, i) => (
              <motion.span
                key={i}
                aria-hidden
                initial={reduce ? false : { opacity: 0, y: 44, rotateX: -70 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: i * 0.07 }}
                className="text-chrome-bright font-mono text-6xl font-bold tracking-tight sm:text-7xl"
              >
                {ch}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Technologies — staggered reveal, springy tap */}
        <Stagger className="mt-8 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
          {TECH.map((tech) => (
            <StaggerItem key={tech.name}>
              <motion.div
                whileTap={reduce ? undefined : { scale: 0.93 }}
                className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-foreground/10 bg-foreground/[0.03] transition-colors active:bg-foreground/[0.07]"
              >
                <span className="text-2xl text-foreground/70">{tech.icon}</span>
                <span className="px-1 text-center font-mono text-[10px] leading-tight text-foreground/60">
                  {tech.name}
                </span>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Flagship products — mockup cards with lazy images */}
        <Stagger className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {BENTO.map((item) => (
            <StaggerItem key={item.id}>
              <motion.a
                href={item.href}
                target="_blank"
                rel="noreferrer noopener"
                whileTap={reduce ? undefined : { scale: 0.985 }}
                className="card-surface block overflow-hidden rounded-2xl transition-colors hover:border-foreground/25"
              >
                <div className="aspect-[16/10] overflow-hidden border-b border-foreground/10">
                  <img
                    src={item.image}
                    alt={`${item.title} interface`}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold tracking-tight">
                      {item.title}
                    </span>
                    <span className="text-foreground/55">{item.icon}</span>
                  </div>
                  <span className="font-mono text-[0.7rem] uppercase tracking-wider text-muted-foreground">
                    {item.subtitle}
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
