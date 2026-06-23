"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Section, SectionHeader } from "./section";
import { EASE_OUT } from "./motion";
import { PROJECTS, type Project } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Projects() {
  const reduce = useReducedMotion();
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = React.useState(0);
  const [edges, setEdges] = React.useState({ start: true, end: false });

  const sync = React.useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const center = scroller.scrollLeft + scroller.clientWidth / 2;
    let nearest = 0;
    let min = Infinity;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(cardCenter - center);
      if (dist < min) {
        min = dist;
        nearest = i;
      }
    });
    setActive(nearest);

    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    setEdges({
      start: scroller.scrollLeft <= 4,
      end: scroller.scrollLeft >= maxScroll - 4,
    });
  }, []);

  React.useEffect(() => {
    sync();
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      scroller.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const scrollToCard = (i: number) => {
    const clamped = Math.max(0, Math.min(PROJECTS.length - 1, i));
    cardRefs.current[clamped]?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <Section id="projects">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Selected work"
            title="Things we shipped"
            accent="and still run."
            description="Client systems and products from our own ecosystem — chosen for what they prove, not how they look in a portfolio."
            className="md:max-w-xl"
          />

          {/* Desktop arrow controls */}
          <div className="hidden items-center gap-2 md:flex">
            <CarouselButton
              direction="prev"
              disabled={edges.start}
              onClick={() => scrollToCard(active - 1)}
            />
            <CarouselButton
              direction="next"
              disabled={edges.end}
              onClick={() => scrollToCard(active + 1)}
            />
          </div>
        </div>
      </div>

      {/* Track — native scroll-snap, swipeable on touch */}
      <div className="relative mt-12">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-12 bg-gradient-to-r from-background to-transparent md:block" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-12 bg-gradient-to-l from-background to-transparent md:block" />

        <div
          ref={scrollerRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Selected projects"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              scrollToCard(active - 1);
            }
            if (e.key === "ArrowRight") {
              e.preventDefault();
              scrollToCard(active + 1);
            }
          }}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:outline-none [&::-webkit-scrollbar]:hidden"
        >
          {/* leading spacer keeps first card off the hard edge on desktop */}
          <div className="shrink-0 md:w-2" aria-hidden />
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.name}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              project={project}
              index={i}
              reduce={!!reduce}
            />
          ))}
          <div className="shrink-0 md:w-2" aria-hidden />
        </div>

        {/* Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {PROJECTS.map((project, i) => (
            <button
              key={project.name}
              type="button"
              aria-label={`Go to ${project.name}`}
              aria-current={active === i ? "true" : undefined}
              onClick={() => scrollToCard(i)}
              className={cn(
                "h-2 cursor-pointer rounded-full bg-foreground transition-all duration-300",
                active === i ? "w-7 opacity-90" : "w-2 opacity-25 hover:opacity-50"
              )}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

// --- Card -------------------------------------------------------------------

type ProjectCardProps = {
  project: Project;
  index: number;
  reduce: boolean;
};

const ProjectCard = React.forwardRef<HTMLElement, ProjectCardProps>(
  ({ project, index, reduce }, ref) => {
    const external = project.href.startsWith("http");
    return (
      <motion.article
        ref={ref}
        initial={reduce ? false : { opacity: 0, y: 26 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: index * 0.06 }}
        className="group card-surface relative flex w-[80vw] shrink-0 snap-center flex-col overflow-hidden rounded-3xl transition-colors duration-300 hover:border-foreground/25 sm:w-[360px] lg:w-[400px]"
      >
        <ProjectMockup project={project} />

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex items-center gap-2.5">
            <span
              className={cn(
                "rounded-full border px-2.5 py-0.5 font-mono text-[0.7rem] uppercase tracking-wider",
                project.kind === "Ecosystem"
                  ? "border-foreground/30 text-foreground"
                  : "border-foreground/12 text-muted-foreground"
              )}
            >
              {project.kind}
            </span>
            <h3 className="text-lg font-semibold tracking-tight">
              {project.name}
            </h3>
          </div>

          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
            {project.outcome}
          </p>

          <div className="mt-auto flex flex-col gap-4 pt-2">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-foreground/[0.05] px-2 py-0.5 font-mono text-[0.7rem] text-foreground/65"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={project.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer noopener" : undefined}
              className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {external ? "Visit live" : "View project"}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </motion.article>
    );
  }
);
ProjectCard.displayName = "ProjectCard";

// --- Generated mockup -------------------------------------------------------
// Self-contained "app window" so there are no external image requests and no
// layout shift. Swap in a real screenshot via `image` (rendered lazily).

function ProjectMockup({
  project,
  image,
}: {
  project: Project;
  image?: string;
}) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden border-b border-foreground/10 bg-gradient-to-b from-foreground/[0.06] to-transparent">
      {/* faint per-project glow — kept low so the palette stays chrome */}
      <div
        className="pointer-events-none absolute -top-10 left-1/2 size-56 -translate-x-1/2 rounded-full opacity-40 blur-2xl"
        style={{ background: `hsl(${project.hue} 45% 60% / 0.12)` }}
        aria-hidden
      />

      {image ? (
        <img
          src={image}
          alt={`${project.name} interface`}
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col">
          {/* window bar */}
          <div className="flex items-center gap-1.5 border-b border-foreground/10 px-3.5 py-3">
            <span className="size-2 rounded-full bg-foreground/20" />
            <span className="size-2 rounded-full bg-foreground/15" />
            <span className="size-2 rounded-full bg-foreground/10" />
            <span className="ml-2 truncate rounded-md bg-foreground/[0.06] px-2 py-0.5 font-mono text-[0.6rem] text-foreground/40">
              {project.name
                .normalize("NFD")
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "")}
              .app
            </span>
          </div>

          {/* body: sidebar + content */}
          <div className="grid flex-1 grid-cols-[1fr_2.4fr]">
            <div className="flex flex-col gap-2 border-r border-foreground/10 p-3.5">
              {[0, 1, 2, 3].map((n) => (
                <span
                  key={n}
                  className="h-1.5 rounded-full bg-foreground/10"
                  style={{ width: `${70 - n * 8}%` }}
                />
              ))}
            </div>
            <div className="relative flex flex-col justify-between p-3.5">
              <div className="flex flex-col gap-2">
                <span className="h-1.5 w-1/3 rounded-full bg-foreground/15" />
                <span className="h-1.5 w-2/3 rounded-full bg-foreground/8" />
              </div>
              {/* sparkline */}
              <svg
                viewBox="0 0 120 40"
                preserveAspectRatio="none"
                className="h-10 w-full text-foreground/40"
                aria-hidden
              >
                <polyline
                  points="0,32 18,26 34,30 52,16 70,21 88,9 104,14 120,4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Arrow control ----------------------------------------------------------

function CarouselButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled?: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous projects" : "Next projects"}
      disabled={disabled}
      onClick={onClick}
      className="grid size-11 cursor-pointer place-items-center rounded-full border border-foreground/12 bg-foreground/[0.03] text-foreground transition-colors hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 disabled:cursor-not-allowed disabled:opacity-30"
    >
      <Icon className="size-5" />
    </button>
  );
}
