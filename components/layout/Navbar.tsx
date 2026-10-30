"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#projects", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Stack" },
  { href: "#resume", label: "Resume" },
];

// The hero and contact sections are observed too, so scrolling back to the top
// (or down to the CTA) clears the highlight instead of leaving a stale one.
const OBSERVED_IDS = ["#top", ...NAV_LINKS.map((l) => l.href), "#contact"];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function Navbar({ name }: { name: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = OBSERVED_IDS.map((id) => document.querySelector(id)).filter(
      (el): el is Element => el !== null,
    );
    // A thin band across the middle of the viewport: whichever section crosses it is "current".
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:pt-4">
      <nav
        className={`mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 rounded-2xl border pl-2.5 pr-2 transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled || open
            ? "card-glass shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)]"
            : "border-transparent"
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5 rounded-lg pr-2">
          <span
            aria-hidden
            className="grid size-8 place-items-center rounded-lg bg-accent font-display text-[13px] font-bold tracking-tight text-accent-foreground"
          >
            {initials(name)}
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight">{name}</span>
        </a>

        <ul className="hidden md:flex items-center gap-1 text-sm">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`rounded-lg px-3 py-1.5 transition-colors ${
                    isActive ? "bg-white/[0.07] text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center rounded-lg bg-foreground px-3.5 py-2 text-sm font-semibold text-background hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Let&apos;s talk
        </a>

        <button
          className="md:hidden rounded-lg p-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden mx-auto mt-2 max-w-5xl rounded-2xl border border-border bg-background-elevated p-2 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)]">
          <ul className="flex flex-col text-sm">
            {[...NAV_LINKS, { href: "#contact", label: "Contact" }].map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-muted hover:bg-white/5 hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
