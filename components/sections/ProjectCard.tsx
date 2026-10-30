import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/types";
import { TechIcon } from "@/components/ui/TechIcon";

export function ProjectCard({
  project,
  position,
  onOpen,
}: {
  project: Project;
  /** Zero-based order in the list, shown as "01", "02", ... */
  position: number;
  onOpen: () => void;
}) {
  const highlights = (project.results.length > 0 ? project.results : project.contributions).slice(0, 3);

  return (
    <article
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
      }}
      className="group relative overflow-hidden rounded-2xl card-surface transition-colors hover:border-accent/35 has-focus-visible:border-accent has-focus-visible:ring-2 has-focus-visible:ring-accent/30"
    >
      <div
        aria-hidden
        className="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Desktop: details top-left, CTA bottom-left, highlights spanning the right column.
          Mobile stacks in DOM order: details, highlights, CTA. */}
      <div className="relative grid gap-x-10 gap-y-7 p-6 sm:p-8 md:grid-cols-[1.2fr_1fr] md:grid-rows-[1fr_auto]">
        <div className="md:col-start-1 md:row-start-1">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-accent">{String(position + 1).padStart(2, "0")}</span>
            {project.badge && (
              <span className="rounded-md bg-achievement/10 px-2 py-0.5 text-[11px] font-medium text-achievement ring-1 ring-achievement/25">
                {project.badge}
              </span>
            )}
          </div>

          <h3 className="mt-4 text-2xl sm:text-3xl font-semibold tracking-tight">{project.name}</h3>
          {project.period && <p className="mt-1 font-mono text-xs text-muted-soft">{project.period}</p>}
          <p className="mt-3 text-[15px] leading-relaxed text-muted text-pretty">{project.tagline}</p>

          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Stack">
            {project.tech.slice(0, 8).map((t) => (
              <li
                key={t}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background/50 px-2 py-1 text-xs text-muted"
              >
                <TechIcon name={t} className="size-3.5" />
                {t}
              </li>
            ))}
            {project.tech.length > 8 && (
              <li className="rounded-md px-1.5 py-1 text-xs text-muted-soft">+{project.tech.length - 8}</li>
            )}
          </ul>
        </div>

        {highlights.length > 0 && (
          <div className="md:col-start-2 md:row-span-2 md:row-start-1 md:border-l md:border-border md:pl-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-soft">Highlights</p>
            <ul className="mt-3 space-y-2.5">
              {highlights.map((h) => (
                <li key={h} className="flex gap-2.5 text-sm leading-relaxed text-foreground/85">
                  <span aria-hidden className="mt-[0.55rem] size-1 shrink-0 rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="md:col-start-1 md:row-start-2 md:self-end">
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent outline-none after:absolute after:inset-0 after:content-['']"
          >
            Read the case study
            <span className="sr-only">: {project.name}</span>
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </button>
        </div>
      </div>
    </article>
  );
}
