"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, ExternalLink, ImageIcon, X } from "lucide-react";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";

export type CertificationItemData = {
  id: string;
  name: string;
  issuer?: string;
  issued?: string;
  credentialUrl?: string;
  photo?: { url: string; kind: "IMAGE" | "PDF"; altText: string };
};

/** Compact credentials list, rendered inside the resume section. */
export function Certifications({ items }: { items: CertificationItemData[] }) {
  const [lightboxId, setLightboxId] = useState<string | null>(null);
  if (items.length === 0) return null;

  const lightboxItem = items.find((c) => c.id === lightboxId);

  return (
    <>
      <ul className="space-y-3">
        {items.map((c) => {
          const meta = [c.issuer, c.issued].filter(Boolean).join(" · ");
          return (
            <li key={c.id} className="flex items-start gap-3">
              <BadgeCheck size={17} className="mt-0.5 shrink-0 text-accent" aria-hidden />
              <div className="min-w-0">
                <p className="text-sm font-medium">{c.name}</p>
                {meta && <p className="mt-0.5 text-xs text-muted">{meta}</p>}
                {(c.credentialUrl || c.photo) && (
                  <div className="mt-1 flex items-center gap-3 text-xs">
                    {c.credentialUrl && (
                      <TrackedLink
                        href={c.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        eventName={ANALYTICS_EVENTS.EXTERNAL_LINK_CLICK}
                        metadata={{ credential: c.name }}
                        className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
                      >
                        Verify
                        <ExternalLink size={12} />
                      </TrackedLink>
                    )}
                    {c.photo && (
                      <button
                        type="button"
                        onClick={() => setLightboxId(c.id)}
                        className="inline-flex items-center gap-1 font-medium text-muted hover:text-foreground transition-colors"
                      >
                        <ImageIcon size={12} />
                        View certificate
                      </button>
                    )}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {lightboxItem?.photo && (
          <motion.div
            className="fixed inset-0 z-70 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              aria-hidden
              className="fixed inset-0 bg-black/85"
              onClick={() => setLightboxId(null)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Certificate"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-3xl"
            >
              <div className="flex items-center justify-end mb-2">
                <button
                  onClick={() => setLightboxId(null)}
                  aria-label="Close"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="relative h-[70vh] w-full rounded-xl overflow-hidden bg-white">
                {lightboxItem.photo.kind === "PDF" ? (
                  <embed src={lightboxItem.photo.url} type="application/pdf" className="w-full h-full" />
                ) : (
                  <Image
                    src={lightboxItem.photo.url}
                    alt={lightboxItem.photo.altText}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    className="object-contain"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
