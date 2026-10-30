"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Tone = "default" | "danger" | "info" | "success";

// A stylized replay of the CarePilot recording pipeline (see content/projects.ts):
// VAD → chunked streaming → network drop → local buffering → replay → in-order → EHR.
const LOG: { tag: string; text: string; tone: Tone }[] = [
  { tag: "vad", text: "speech detected — streaming", tone: "default" },
  { tag: "socket", text: "chunk #0418 sent", tone: "default" },
  { tag: "net", text: "offline — buffering locally", tone: "danger" },
  { tag: "buffer", text: "6 chunks queued, still recording", tone: "default" },
  { tag: "net", text: "reconnected — replaying 6 chunks", tone: "info" },
  { tag: "order", text: "seq 0413 → 0418 back in order", tone: "success" },
  { tag: "fhir", text: "visit posted to the EHR", tone: "success" },
];

const LOST_AT = 2; // index of "connection lost"
const BACK_AT = 4; // index of "reconnected"
const HOLD_TICKS = 4; // seconds the finished log stays up before it replays
const CYCLE = LOG.length + HOLD_TICKS;

// Fixed bar heights (%) rather than Math.random(), so server and client markup match.
const BARS = [
  38, 62, 84, 55, 30, 46, 78, 96, 70, 42, 28, 50, 74, 88, 64, 36, 58, 82, 100, 76, 48, 32, 54, 80, 92, 66, 40,
  30, 52, 72, 86, 60, 38, 44,
];

const TONE_CLASS: Record<Tone, string> = {
  default: "text-foreground/85",
  danger: "text-danger",
  info: "text-achievement",
  success: "text-accent",
};

const STATUS = {
  live: { label: "Live", dot: "bg-accent", text: "text-accent", ping: true },
  buffering: { label: "Offline · buffering", dot: "bg-danger", text: "text-danger", ping: false },
  synced: { label: "Synced", dot: "bg-achievement", text: "text-achievement", ping: false },
} as const;

function statusFor(visibleLines: number): keyof typeof STATUS {
  if (visibleLines > LOST_AT && visibleLines <= BACK_AT) return "buffering";
  if (visibleLines >= LOG.length) return "synced";
  return "live";
}

export function LiveConsole() {
  // -1 renders the finished log: what the server sends, and all reduced-motion users ever see.
  const [tick, setTick] = useState(-1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Start from an empty log while the card is still fading in, then add a line per second.
    const kickoff = setTimeout(() => setTick(0), 0);
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => {
      clearTimeout(kickoff);
      clearInterval(interval);
    };
  }, []);

  const frame = tick < 0 ? LOG.length : tick % CYCLE;
  const visibleLines = Math.min(frame, LOG.length);
  const status = STATUS[statusFor(visibleLines)];
  const elapsed = 42 + Math.max(tick, 0);
  const timer = `${String(Math.floor(elapsed / 60)).padStart(2, "0")}:${String(elapsed % 60).padStart(2, "0")}`;

  return (
    <figure className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-4xl opacity-[0.22] blur-3xl"
        style={{ background: "radial-gradient(60% 60% at 70% 30%, var(--accent), transparent 70%)" }}
      />

      <p className="sr-only">
        Illustration: a simulated replay of the CarePilot recording pipeline — voice-activity detection, chunked
        streaming over Socket.io, buffering through a dropped connection, in-order replay on reconnect, and posting
        the visit back to the EHR.
      </p>

      <div
        aria-hidden="true"
        className="relative overflow-hidden rounded-2xl card-surface shadow-[0_30px_80px_-24px_rgba(0,0,0,0.75)]"
      >
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="size-2.5 rounded-full bg-white/10" />
            <span className="size-2.5 rounded-full bg-white/10" />
          </div>
          <p className="font-mono text-[11px] text-muted">carepilot — recorder</p>
          <span
            className={`inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${status.text}`}
          >
            <span className="relative flex size-1.5">
              {status.ping && (
                <span className={`absolute inline-flex size-full animate-ping rounded-full opacity-70 ${status.dot}`} />
              )}
              <span className={`relative inline-flex size-1.5 rounded-full ${status.dot}`} />
            </span>
            {status.label}
          </span>
        </div>

        <div className="flex items-center gap-4 border-b border-border px-4 py-4">
          <div className="flex h-12 flex-1 items-center gap-0.75">
            {BARS.map((height, i) => (
              <span
                key={i}
                className="w-full rounded-full bg-accent/80 animate-wave"
                style={{
                  height: `${height}%`,
                  animationDelay: `${-(i % 9) * 0.13}s`,
                  animationDuration: `${0.9 + (i % 5) * 0.14}s`,
                }}
              />
            ))}
          </div>
          <span className="font-mono text-xs tabular-nums text-muted">{timer}</span>
        </div>

        {/* Every line is always rendered (hidden until its turn), so the log reserves its full
            height at any width and wrapped lines on small screens can't overflow the card. */}
        <ol className="space-y-1.5 px-4 py-4 font-mono text-[12px] leading-5">
          {LOG.map((line, i) => {
            const shown = i < visibleLines;
            return (
              <motion.li
                key={i}
                initial={false}
                animate={shown ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
                transition={{ duration: shown ? 0.25 : 0 }}
                className="flex gap-3"
              >
                <span className="w-14 shrink-0 text-muted-soft">{line.tag}</span>
                <span className={TONE_CLASS[line.tone]}>
                  {line.text}
                  {i === visibleLines - 1 && (
                    <span className="ml-1.5 inline-block h-3.5 w-1.75 translate-y-0.5 bg-accent animate-blink-caret" />
                  )}
                </span>
              </motion.li>
            );
          })}
        </ol>
      </div>

      <figcaption className="relative mt-3 text-center text-xs text-muted-soft">
        Simulated replay of the recording pipeline I built for{" "}
        <a href="#projects" className="text-muted underline decoration-border-strong underline-offset-4 hover:text-accent">
          CarePilot
        </a>
      </figcaption>
    </figure>
  );
}
