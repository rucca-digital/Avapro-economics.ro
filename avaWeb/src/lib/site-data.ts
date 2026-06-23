import {
  Code2,
  Layers,
  Compass,
  Workflow,
  Hammer,
  Rocket,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

// --- Credibility band -------------------------------------------------------

export type Stat = { value: number; suffix?: string; label: string; sub: string };

export const STATS: Stat[] = [
  { value: 14, label: "National medals", sub: "Informatics & AI Olympiads" },
  { value: 4, label: "International medals", sub: "Informatics " },
  { value: 100, suffix: "+", label: "Contests participated", sub: "national + international" },
  { value: 4, label: "Hackathons won", sub: "on the core team" },
];

export const COMPETITIONS: string[] = [
  "ONAI — Olimpiada Nationalain AI",
  "CEOI — Central European OI",
  "Info1Cup - international informatics contest",
  "Balkan Olympiad in Informatics",
  "National Informatics Olympiad",
];

// --- Services ---------------------------------------------------------------

export type Service = {
  icon: LucideIcon;
  kicker: string;
  title: string;
  pitch: string;
  capabilities: string[];
};

export const SERVICES: Service[] = [
  {
    icon: Code2,
    kicker: "Track 01",
    title: "Custom Software for Clients",
    pitch:
      "Greenfield products and load-bearing systems — architected, shipped, and owned alongside your team.",
    capabilities: ["Web & mobile platforms", "AI / ML systems", "Data & infrastructure", "Performance rescue"],
  },
  {
    icon: Layers,
    kicker: "Track 02",
    title: "Our Own App Ecosystem",
    pitch:
      "A growing family of products we build, fund, and operate — proving the standard we hold client work to.",
    capabilities: ["Developer tooling", "AI agents", "Productivity apps", "Open-source"],
  },
];

// --- Projects ---------------------------------------------------------------

export type Project = {
  name: string;
  kind: "Client" | "Ecosystem";
  outcome: string;
  tags: string[];
  href: string;
  /** Hue (deg) used to tint the generated mockup. Stays achromatic-leaning. */
  hue: number;
};

export const PROJECTS: Project[] = [
  {
    name: "FTC SCORER PRO",
    kind: "Client",
    outcome:
      "Aplicația FTC Into the Deep Scoring este un instrument cuprinzător conceput pentru echipele care participă la sezonul „Into the Deep”. Această aplicație simplifică calculele de punctaj, facilitând urmărirea punctelor în timpul meciurilor și include o funcție de simulare a meciurilor care permite echipelor să simuleze meciuri complete, ajutându-le să își creeze strategii și să își optimizeze performanța.",
    tags: ["React Native", "TypeScript", "Node.js", "PostgreSQL"],
    href: "https://play.google.com/store/apps/details?id=com.SoftHoardersApp&hl=ro",
    hue: 35,
  },
  {
    name: "Feast",
    kind: "Ecosystem",
    outcome:
      "The loyalty platform that powers the Feast ecosystem — helping businesses reward their customers and helping customers get rewarded for their loyalty.",
    tags: ["React Native", "POS integration", "WebSockets"],
    href: "https://admin.feastapp.ro/login",
    hue: 165,
  },
  {
    name: "Feast Business",
    kind: "Ecosystem",
    outcome:
      " The business card behind Feast — helping businesses undersand Feast better.",
    tags: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL"],
    href: "https://business.feastapp.ro/",
    hue: 215,
  },
  {
    name: "Feast Kiosk",
    kind: "Ecosystem",
    outcome:
      "In-store kiosk that plugs into checkout and verifies the points added on every transaction.",
    tags: ["React Native", "POS integration", "WebSockets"],
    href: "https://business.feastapp.ro/",
    hue: 165,
  },
   {
    name: "Feast Admin",
    kind: "Ecosystem",
    outcome:
      "The platform that business owners use to manage their Feast account, view analytics, manage their menius, promotions, and more.",
    tags: ["React Native", "POS integration", "WebSockets"],
    href: "https://admin.feastapp.ro/login",
    hue: 165,
  },
  {
    name: "Erasmus Platform",
    kind: "Client",
    outcome:
      "An Erasmus programme platform built for Colegiul Național Frații Buzești to run applications and mobilities.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    href: "https://erasmus.softhoarders.me/",
    hue: 255,
  },
];

// --- Process ----------------------------------------------------------------

export type Step = { icon: LucideIcon; index: string; title: string; body: string };

export const PROCESS: Step[] = [
  {
    icon: Compass,
    index: "01",
    title: "Discovery",
    body: "We map the real problem, its constraints, and the system it has to live inside.",
  },
  {
    icon: Workflow,
    index: "02",
    title: "Architecture",
    body: "Decisions made for the next five years — not just the next sprint.",
  },
  {
    icon: Hammer,
    index: "03",
    title: "Build",
    body: "Tight feedback loops, production-grade from the first commit.",
  },
  {
    icon: Rocket,
    index: "04",
    title: "Grow",
    body: "We stay — instrumenting, scaling, and compounding the system over time.",
  },
];

// --- Contact / socials ------------------------------------------------------

export const CONTACT_EMAIL = "hello@feastapp.ro";

export type Social = { label: string; href: string };

export const SOCIALS: Social[] = [
  { label: "GitHub", href: "https://github.com" },
  { label: "X", href: "https://x.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];
