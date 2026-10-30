"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles, MessageCircle, Mail } from "lucide-react";
import { useEngagement } from "@/lib/engagement-context";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import { ContactForm } from "./ContactForm";

export type EngagementContact = {
  /** False when no database is configured: the prompt offers email instead of the form. */
  formEnabled: boolean;
  email: string;
};

export function EngagementPrompt({ formEnabled, email }: EngagementContact) {
  const { showPrompt, expanded, expand, dismiss } = useEngagement();

  return (
    <AnimatePresence>
      {showPrompt && !expanded && (
        <motion.button
          key="bubble"
          type="button"
          onClick={expand}
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          aria-label="Open contact prompt"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-accent py-3 pl-4 pr-5 text-accent-foreground shadow-2xl hover:brightness-110 transition-[filter]"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-foreground/60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-foreground" />
          </span>
          <MessageCircle size={18} />
          <span className="text-sm font-semibold">Let&apos;s talk</span>
        </motion.button>
      )}

      {showPrompt && expanded && (
        <motion.div
          key="form"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          role="dialog"
          aria-label="Contact prompt"
          className="fixed bottom-5 right-5 left-5 sm:left-auto z-50 w-auto sm:w-95 max-h-[calc(100vh-2.5rem)] overflow-y-auto card-glass rounded-2xl p-5 shadow-2xl"
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2 text-accent">
              <Sparkles size={16} />
              <p className="text-sm font-semibold">Enjoying the work?</p>
            </div>
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="shrink-0 text-muted hover:text-foreground transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {formEnabled ? (
            <>
              <p className="text-sm text-muted mb-4">Leave a quick note and I&apos;ll get back to you.</p>
              <ContactForm compact />
            </>
          ) : (
            <>
              <p className="text-sm text-muted mb-4">I&apos;d love to hear from you — email is the fastest way to reach me.</p>
              <div className="flex flex-wrap items-center gap-2">
                <TrackedLink
                  href={`mailto:${email}`}
                  eventName={ANALYTICS_EVENTS.EXTERNAL_LINK_CLICK}
                  metadata={{ label: "Email (prompt)" }}
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:brightness-110 transition-[filter]"
                >
                  <Mail size={15} />
                  Email me
                </TrackedLink>
                <CopyEmailButton email={email} />
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
