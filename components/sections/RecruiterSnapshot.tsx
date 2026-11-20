"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Download, FolderKanban, Mail } from "lucide-react";
import { recruiterSnapshot } from "@/content/snapshot";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";

export function RecruiterSnapshot({
  open,
  onClose,
  name,
  location,
  resumeUrl,
  currentRole,
}: {
  open: boolean;
  onClose: () => void;
  name: string;
  location?: string;
  resumeUrl?: string | null;
  currentRole?: { role: string; company: string };
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const rows = [
    { label: "Experience", value: recruiterSnapshot.experience },
    { label: "Core stack", value: recruiterSnapshot.stack },
    { label: "Focus", value: recruiterSnapshot.focus },
    { label: "Impact", value: recruiterSnapshot.impact },
    ...(location ? [{ label: "Based in", value: location }] : []),
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-60 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            aria-hidden
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Recruiter snapshot"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl card-surface bg-background-elevated"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              autoFocus
              className="absolute right-4 top-4 rounded-lg p-1.5 text-muted hover:bg-white/5 hover:text-foreground transition-colors"
            >
              <X size={18} />
            </button>

            <div className="border-b border-border bg-accent/6 px-6 py-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                Recruiter view · 30-second read
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">{name}</h3>
              {currentRole && (
                <p className="mt-0.5 text-sm text-muted">
                  {currentRole.role} at {currentRole.company}
                </p>
              )}
            </div>

            <dl className="divide-y divide-border px-6">
              {rows.map((row) => (
                <div key={row.label} className="grid grid-cols-[6.5rem_1fr] gap-3 py-3.5">
                  <dt className="pt-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-soft">
                    {row.label}
                  </dt>
                  <dd className="text-sm leading-relaxed">{row.value}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap gap-2.5 border-t border-border px-6 py-5">
              <TrackedLink
                href={resumeUrl ?? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/resume.pdf`}
                download
                eventName={ANALYTICS_EVENTS.RESUME_DOWNLOAD}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:brightness-110 transition-[filter]"
              >
                <Download size={15} />
                Download resume
              </TrackedLink>
              <a
                href="#projects"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-lg border border-border-strong px-4 py-2 text-sm font-semibold hover:bg-white/5 transition-colors"
              >
                <FolderKanban size={15} />
                See work
              </a>
              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
              >
                <Mail size={15} />
                Contact
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
