"use client";

import * as React from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  animate,
  type Variants,
  type HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Shared motion language for the site.
 *
 * Curves are deliberate and physically believable — fast-out / slow-settle,
 * no overshoot or bounce. Restraint is the brand signal, so reveals are short
 * and read as "considered", not "animated for the sake of it".
 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

// --- Single reveal ----------------------------------------------------------

type RevealProps = HTMLMotionProps<"div"> & {
  /** Distance (px) the element travels up into place. */
  y?: number;
  /** Seconds to wait before starting. */
  delay?: number;
  /** Animation duration in seconds. */
  duration?: number;
};

export function Reveal({
  children,
  className,
  y = 22,
  delay = 0,
  duration = 0.7,
  ...props
}: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, ease: EASE_OUT, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// --- Staggered group ---------------------------------------------------------

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: EASE_OUT },
  },
};

type StaggerProps = HTMLMotionProps<"div"> & { margin?: string };

export function Stagger({
  children,
  className,
  margin = "-80px",
  ...props
}: StaggerProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} {...(props as React.HTMLAttributes<HTMLDivElement>)}>
        {children as React.ReactNode}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, ...props }: HTMLMotionProps<"div">) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={className} {...(props as React.HTMLAttributes<HTMLDivElement>)}>
        {children as React.ReactNode}
      </div>
    );
  }

  return (
    <motion.div className={className} variants={itemVariants} {...props}>
      {children}
    </motion.div>
  );
}

// --- Count-up number ---------------------------------------------------------

type CounterProps = {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

export function Counter({
  value,
  duration = 1.4,
  prefix = "",
  suffix = "",
  className,
}: CounterProps) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {Math.round(display)}
      {suffix}
    </span>
  );
}

// --- Word-by-word text reveal -----------------------------------------------

type WordRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  y?: number;
};

export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.05,
  duration = 0.6,
  y = 18,
}: WordRevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");

  // The animated class (often a `background-clip: text` chrome gradient) MUST
  // live on the same element that carries the transform. If the gradient sits
  // on a parent while children get `will-change: transform`, the children are
  // promoted to their own layer and the clipped gradient never paints onto
  // them — the words render invisible. So apply `className` per word.
  return (
    <span className="inline" aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden
          className={cn("mr-[0.26em] inline-block", className)}
          initial={{ opacity: 0, y }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration, ease: EASE_OUT, delay: delay + i * stagger }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

// --- Scroll-linked parallax wrapper -----------------------------------------

export function Parallax({
  children,
  className,
  distance = 40,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

// --- Scroll-drawn colored wave (background graphic) -------------------------

// Serpentine path on a 100 x 1200 canvas — weaves left/right so it threads
// down through the gutters between stacked cards.
const WAVE_PATH =
  "M50 0 C50 70 16 110 16 190 C16 280 84 310 84 400 C84 500 16 520 16 610 C16 700 84 730 84 820 C84 910 16 940 16 1030 C16 1110 84 1140 50 1200";

export function ScrollWave({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.2"],
  });
  // Spring-smoothed so the line fills fluidly rather than snapping to scroll.
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 100 1200"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="scrollwave-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7da5ff" />
            <stop offset="48%" stopColor="#a08cff" />
            <stop offset="100%" stopColor="#3fb8d8" />
          </linearGradient>
        </defs>
        {/* faint full track showing where the wave will fill */}
        <path
          d={WAVE_PATH}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {/* colored line that draws in as the section scrolls past */}
        <motion.path
          d={WAVE_PATH}
          stroke="url(#scrollwave-grad)"
          strokeWidth={2.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: reduce ? 1 : pathLength }}
          className="[filter:drop-shadow(0_0_5px_rgba(125,165,255,0.55))]"
        />
      </svg>
    </div>
  );
}
