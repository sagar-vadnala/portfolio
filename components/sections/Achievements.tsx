"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ImageIcon, X } from "lucide-react";

export type AchievementItemData = {
  id: string;
  title: string;
  meta?: string;
  description: string;
  link?: string;
  linkLabel?: string;
  photo?: { url: string; altText: string };
};

/** "By the numbers" strip: short titles ("55%", "215/391") render as big metrics. */
export function Achievements({ items }: { items: AchievementItemData[] }) {
  const [lightboxId, setLightboxId] = useState<string | null>(null);
  if (items.length === 0) return null;

  const lightboxItem = items.find((a) => a.id === lightboxId);

  return (
    <section id="achievements" aria-labelledby="achievements-heading" className="container-page pb-8 scroll-mt-24">
      <h2
        id="achievements-heading"
        className="mb-5 flex items-center gap-3 font-mono text-xs font-normal uppercase tracking-[0.18em] text-muted"
      >
        <span aria-hidden className="h-px w-8 bg-border-strong" />
        By the numbers
      </h2>

      <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {items.map((a, i) => {
          const isMetric = a.title.length <= 9;
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="flex flex-col bg-background-elevated p-6"
            >
              <p
                className={
                  isMetric
                    ? "font-display text-4xl font-semibold tracking-tight text-gradient sm:text-[2.75rem]"
                    : "font-display text-lg font-semibold leading-snug"
                }
              >
                {a.title}
              </p>
              {a.meta && <p className="mt-2 text-sm font-semibold text-foreground">{a.meta}</p>}
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{a.description}</p>

              {(a.link || a.photo) && (
                <div className="mt-auto flex items-center gap-4 pt-4">
                  {a.link && (
                    <a
                      href={a.link}
                      className="inline-flex w-fit items-center gap-1 text-sm font-medium text-accent hover:underline underline-offset-4"
                    >
                      {a.linkLabel ?? "View more"}
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                  {a.photo && (
                    <button
                      type="button"
                      onClick={() => setLightboxId(a.id)}
                      className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground transition-colors"
                    >
                      <ImageIcon size={14} />
                      View photo
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

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
              aria-label={lightboxItem.title}
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
                <Image
                  src={lightboxItem.photo.url}
                  alt={lightboxItem.photo.altText}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
