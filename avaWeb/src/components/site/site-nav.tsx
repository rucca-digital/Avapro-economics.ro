"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SpotlightNavbar } from "@/components/ui/spotlight-navbar";
import { LiquidMetalButton } from "@/components/ui/liquid-metal";
import { Logo } from "./logo";
import { NAV_ITEMS } from "@/lib/site-data";
import { scrollToHash } from "@/lib/scroll";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [activeIdx, setActiveIdx] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the nav item whose section is crossing the
  // middle of the viewport, so the spotlight follows the page.
  React.useEffect(() => {
    const ids = NAV_ITEMS.map((i) => i.href.slice(1));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        // pick the section nearest the top of the band
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        const idx = ids.indexOf(top.target.id);
        if (idx >= 0) setActiveIdx(idx);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Lock body scroll while the mobile sheet is open.
  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const go = (href: string) => {
    setMenuOpen(false);
    // Wait a frame so the scroll lock releases before scrolling.
    requestAnimationFrame(() => scrollToHash(href));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          // Mobile: compact, floating, crisp glass pill with inner highlight.
          "mx-6 mt-3 flex items-center justify-between gap-4 rounded-xl border border-foreground/15 bg-background/65 px-4 py-2 backdrop-blur-md blur-trim-mobile premium-inset transition-all duration-300",
          // Desktop: full-width transparent bar; subtle divider once scrolled.
          "md:mx-auto md:mt-0 md:max-w-7xl md:rounded-none md:border-0 md:border-b md:border-transparent md:bg-transparent md:px-6 md:py-4 md:backdrop-blur-none",
          scrolled &&
            "md:border-foreground/10 md:bg-background/70 md:backdrop-blur-xl"
        )}
      >
        {/* Left — logo */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            go("#top");
          }}
          className="rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
          aria-label="AvaPro — home"
        >
          <Logo />
        </a>

        {/* Center — spotlight navbar (md and up), driven by scroll-spy */}
        <div className="hidden md:block">
          <SpotlightNavbar
            className="pt-0"
            items={NAV_ITEMS}
            activeIndex={activeIdx}
            onItemClick={(item) => scrollToHash(item.href)}
          />
        </div>

        {/* Right — CTA (md+) + mobile toggle */}
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LiquidMetalButton
              size="sm"
              onClick={() => scrollToHash("#contact")}
            >
              Start a Project
            </LiquidMetalButton>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="grid size-10 cursor-pointer place-items-center rounded-xl border border-foreground/10 bg-foreground/[0.04] text-foreground transition-colors hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "open"}
                initial={reduce ? false : { opacity: 0, rotate: -90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, rotate: 90, scale: 0.7 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="grid place-items-center"
              >
                {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mx-6 mt-2 overflow-hidden rounded-xl border border-foreground/15 bg-background/90 p-2 premium-inset blur-trim-mobile backdrop-blur-md md:hidden"
          >
            <motion.nav
              className="flex flex-col"
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
              }}
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  variants={{
                    hidden: reduce ? {} : { opacity: 0, x: -12 },
                    show: { opacity: 1, x: 0 },
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.href);
                  }}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground"
                >
                  {item.label}
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.a>
              ))}
              <div className="p-2 pt-3">
                <LiquidMetalButton
                  size="md"
                  className="w-full"
                  onClick={() => go("#contact")}
                >
                  Start a Project
                </LiquidMetalButton>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
