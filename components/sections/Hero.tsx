"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText, IdCard } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import { LiveConsole } from "./LiveConsole";
import { RecruiterSnapshot } from "./RecruiterSnapshot";

export type HeroProps = {
  name: string;
  headline: string;
  summary: string;
  proofLine: string;
  location: string;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  resumeUrl?: string | null;
  currentRole?: { role: string; company: string };
  showProofLine?: boolean;
};

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

export function Hero({
  name,
  headline,
  summary,
  proofLine,
  location,
  githubUrl,
  linkedinUrl,
  resumeUrl,
  currentRole,
  showProofLine = true,
}: HeroProps) {
  const [snapshotOpen, setSnapshotOpen] = useState(false);
  const focusAreas = proofLine
    .split("·")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-lines opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 h-140 w-170 rounded-full opacity-[0.16] blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-48 -left-48 h-105 w-115 rounded-full opacity-[0.08] blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--achievement), transparent 70%)" }}
      />

      <div className="container-page relative grid items-center gap-14 pt-32 pb-16 sm:pt-40 sm:pb-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div>
          {currentRole && (
            <motion.p
              {...fadeUp(0)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background-elevated/70 py-1 pl-2.5 pr-3 text-xs font-medium text-muted"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              <span>
                {currentRole.role} at <span className="text-foreground">{currentRole.company}</span>
              </span>
              {location && <span className="hidden sm:inline text-muted-soft">· {location}</span>}
            </motion.p>
          )}

          <motion.h1
            {...fadeUp(0.05)}
            className="mt-6 text-5xl sm:text-7xl font-semibold tracking-[-0.04em] leading-[0.95]"
          >
            {name}
          </motion.h1>

          <motion.p
            {...fadeUp(0.1)}
            className="mt-6 max-w-xl text-xl sm:text-2xl font-medium leading-snug text-balance text-gradient"
          >
            {headline}
          </motion.p>

          {summary && (
            <motion.p {...fadeUp(0.15)} className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
              {summary}
            </motion.p>
          )}

          {showProofLine && focusAreas.length > 0 && (
            <motion.ul {...fadeUp(0.2)} className="mt-6 flex flex-wrap gap-2" aria-label="Focus areas">
              {focusAreas.map((area) => (
                <li
                  key={area}
                  className="rounded-md border border-border bg-background-elevated/60 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted"
                >
                  {area}
                </li>
              ))}
            </motion.ul>
          )}

          <motion.div {...fadeUp(0.25)} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:brightness-110 transition-[filter]"
            >
              See my work
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#resume"
              className="inline-flex items-center gap-2 rounded-lg border border-border-strong px-5 py-2.5 text-sm font-semibold hover:bg-white/5 transition-colors"
            >
              <FileText size={16} />
              Resume
            </a>
            {(githubUrl || linkedinUrl) && (
              // Grouped so the icon buttons wrap together on narrow screens.
              <div className="flex gap-3">
                {githubUrl && (
                  <TrackedLink
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    eventName={ANALYTICS_EVENTS.GITHUB_CLICK}
                    aria-label="GitHub"
                    className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted hover:text-foreground hover:border-border-strong transition-colors"
                  >
                    <GithubIcon className="size-4.5" />
                  </TrackedLink>
                )}
                {linkedinUrl && (
                  <TrackedLink
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    eventName={ANALYTICS_EVENTS.LINKEDIN_CLICK}
                    aria-label="LinkedIn"
                    className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted hover:text-foreground hover:border-border-strong transition-colors"
                  >
                    <LinkedinIcon className="size-4.5" />
                  </TrackedLink>
                )}
              </div>
            )}
          </motion.div>

          <motion.button
            {...fadeUp(0.3)}
            onClick={() => setSnapshotOpen(true)}
            className="group mt-6 inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors"
          >
            <IdCard size={15} />
            Recruiter view — the 30-second version
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <LiveConsole />
        </motion.div>
      </div>

      <RecruiterSnapshot
        open={snapshotOpen}
        onClose={() => setSnapshotOpen(false)}
        name={name}
        location={location}
        resumeUrl={resumeUrl}
        currentRole={currentRole}
      />
    </section>
  );
}
