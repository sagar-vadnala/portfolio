"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export type ExperienceItemData = {
  id: string;
  role: string;
  company: string;
  companyUrl?: string | null;
  startDate: string;
  endDate: string;
  summary: string[];
  highlights: string[];
  tech: string[];
};

export function Experience({ index, items }: { index?: string; items: ExperienceItemData[] }) {
  if (items.length === 0) return null;

  return (
    <section id="experience" className="container-page py-16 sm:py-24 scroll-mt-4">
      <SectionHeading index={index} eyebrow="Experience" title="Where I've been shipping" />

      <ol className="border-t border-border">
        {items.map((entry, i) => (
          <ExperienceItem key={entry.id} entry={entry} index={i} />
        ))}
      </ol>
    </section>
  );
}

function ExperienceItem({ entry, index }: { entry: ExperienceItemData; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const hasDetails = entry.highlights.length > 0;
  // "Show full details" swaps the concise summary for the long-form bullets rather than repeating them.
  const bullets = expanded && hasDetails ? entry.highlights : entry.summary;
  const isCurrent = entry.endDate.toLowerCase() === "present";

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="grid gap-4 border-b border-border py-9 md:grid-cols-[13rem_1fr] md:gap-10"
    >
      <div className="flex flex-wrap items-center gap-3 md:block">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">
          {entry.startDate} — {entry.endDate}
        </p>
        {isCurrent && (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent ring-1 ring-accent/25 md:mt-3">
            <span className="size-1.5 rounded-full bg-accent" />
            Current
          </span>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold tracking-tight">
          {entry.role}
          <span className="font-normal text-muted"> · </span>
          {entry.companyUrl ? (
            <a
              href={entry.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-accent hover:underline underline-offset-4"
            >
              {entry.company}
              <ArrowUpRight size={16} />
            </a>
          ) : (
            <span className="text-accent">{entry.company}</span>
          )}
        </h3>

        <motion.ul
          key={expanded ? "details" : "summary"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="mt-4 space-y-2.5"
        >
          {bullets.map((b) => (
            <li
              key={b}
              className="relative pl-5 text-[15px] leading-relaxed text-muted before:absolute before:left-0 before:top-[0.7rem] before:h-px before:w-2.5 before:bg-accent/60"
            >
              {b}
            </li>
          ))}
        </motion.ul>

        {entry.tech.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
            {entry.tech.map((t) => (
              <li
                key={t}
                className="rounded-md border border-border bg-background-elevated/60 px-2 py-0.5 font-mono text-[11px] text-muted"
              >
                {t}
              </li>
            ))}
          </ul>
        )}

        {hasDetails && (
          <button
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-muted hover:text-accent transition-colors"
          >
            {expanded ? "Show summary" : "Show full details"}
            <ChevronDown size={14} className={expanded ? "rotate-180 transition-transform" : "transition-transform"} />
          </button>
        )}
      </div>
    </motion.li>
  );
}
