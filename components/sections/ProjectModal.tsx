"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { X, ExternalLink, Check } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import type { Project, ProjectRecognition } from "@/content/types";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { PressMentions } from "./PressMentions";
import { RecognitionProof } from "./RecognitionProof";
import { TechIcon } from "@/components/ui/TechIcon";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-muted-soft">{label}</h4>
      {children}
    </div>
  );
}

/** Case study, presented as a drawer that slides in from the right. */
export function ProjectModal({
  project,
  recognition,
  onClose,
}: {
  project: Project | null;
  recognition?: ProjectRecognition;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div aria-hidden className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={onClose} />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 34, stiffness: 320 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-2xl flex-col border-l border-border bg-background-elevated shadow-2xl"
          >
            <header className="flex items-start justify-between gap-4 border-b border-border px-6 py-5 sm:px-8">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">Case study</p>
                <h3 id="case-study-title" className="mt-1.5 text-2xl font-semibold tracking-tight">
                  {project.name}
                </h3>
                {project.period && <p className="mt-1 font-mono text-xs text-muted-soft">{project.period}</p>}
              </div>
              <button
                onClick={onClose}
                aria-label="Close case study"
                autoFocus
                className="shrink-0 rounded-lg border border-border p-2 text-muted hover:text-foreground hover:border-border-strong transition-colors"
              >
                <X size={18} />
              </button>
            </header>

            <div className="flex-1 space-y-8 overflow-y-auto px-6 py-7 sm:px-8">
              <div>
                {project.badge && (
                  <span className="mb-4 inline-block rounded-md bg-achievement/10 px-2 py-0.5 text-[11px] font-medium text-achievement ring-1 ring-achievement/25">
                    {project.badge}
                  </span>
                )}
                <p className="text-lg leading-relaxed text-foreground/90 text-balance">{project.tagline}</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Block label="Problem">
                  <p className="text-sm leading-relaxed text-muted">{project.problem}</p>
                </Block>
                <Block label="Solution">
                  <p className="text-sm leading-relaxed text-muted">{project.solution}</p>
                </Block>
              </div>

              {project.architecture && (
                <Block label="How it works">
                  <ArchitectureDiagram stages={project.architecture} />
                </Block>
              )}

              <Block label="What I built">
                <ul className="space-y-2.5">
                  {project.contributions.map((c) => (
                    <li
                      key={c}
                      className="relative pl-5 text-sm leading-relaxed text-muted before:absolute before:left-0 before:top-[0.6rem] before:h-px before:w-2.5 before:bg-accent/60"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </Block>

              {project.results.length > 0 && (
                <Block label="Results">
                  <ul className="space-y-2 rounded-xl border border-accent/20 bg-accent/5 p-4">
                    {project.results.map((r) => (
                      <li key={r} className="flex gap-2.5 text-sm leading-relaxed text-foreground/90">
                        <Check size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                        {r}
                      </li>
                    ))}
                  </ul>
                </Block>
              )}

              <Block label="Stack">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs text-muted"
                    >
                      <TechIcon name={t} className="size-3.5" />
                      {t}
                    </span>
                  ))}
                </div>
              </Block>

              {project.pressCoverage && (
                <Block label="Recognition">
                  {project.certificateNote && (
                    <p className="text-sm text-muted leading-relaxed mb-4">{project.certificateNote}</p>
                  )}
                  {recognition && (recognition.certificate || recognition.photo) && (
                    <div className="mb-4">
                      <RecognitionProof recognition={recognition} />
                    </div>
                  )}
                  <PressMentions />
                </Block>
              )}

              {project.links.length > 0 && (
                <div className="flex flex-wrap gap-3 border-t border-border pt-6">
                  {project.links.map((link) => (
                    <TrackedLink
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      eventName={
                        link.label.toLowerCase().includes("demo")
                          ? ANALYTICS_EVENTS.PROJECT_DEMO_CLICK
                          : ANALYTICS_EVENTS.PROJECT_GITHUB_CLICK
                      }
                      metadata={{ project: project.slug }}
                      className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:brightness-110 transition-[filter]"
                    >
                      {link.label.toLowerCase().includes("demo") ? (
                        <ExternalLink size={15} />
                      ) : (
                        <GithubIcon className="size-3.75" />
                      )}
                      {link.label}
                    </TrackedLink>
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
