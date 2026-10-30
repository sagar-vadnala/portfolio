"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { track, ANALYTICS_EVENTS } from "@/lib/analytics";

/** Copies the address to the clipboard — more reliable than mailto: on machines without a mail app. */
export function CopyEmailButton({ email, className }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      track(ANALYTICS_EVENTS.EXTERNAL_LINK_CLICK, { label: "Copy email" });
    } catch {
      // Clipboard can be blocked (permissions, insecure context); the mailto link still works.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Email copied" : `Copy ${email}`}
      className={
        className ??
        "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted hover:text-foreground hover:border-border-strong transition-colors"
      }
    >
      {copied ? <Check size={15} className="text-accent" /> : <Copy size={15} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
