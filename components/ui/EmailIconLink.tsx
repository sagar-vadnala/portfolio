"use client";

import { useEffect, useState } from "react";
import { Check, Mail } from "lucide-react";
import { track, ANALYTICS_EVENTS } from "@/lib/analytics";

/**
 * Mail icon that opens the visitor's mail app AND copies the address. mailto: silently does
 * nothing when no default mail app is set up (common for webmail users), so the copy plus
 * a "Copied" tooltip makes sure every click has a visible result.
 */
export function EmailIconLink({ email, className }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2500);
    return () => clearTimeout(timer);
  }, [copied]);

  function handleClick() {
    track(ANALYTICS_EVENTS.EXTERNAL_LINK_CLICK, { label: "Email" });
    // Clipboard can be blocked (permissions, insecure context); the mailto link still runs.
    navigator.clipboard?.writeText(email).then(
      () => setCopied(true),
      () => {},
    );
  }

  return (
    <a
      href={`mailto:${email}`}
      onClick={handleClick}
      aria-label={`Email ${email}`}
      title={email}
      className={`relative ${className ?? ""}`}
    >
      {copied ? (
        <Check className="size-4 text-accent" aria-hidden="true" />
      ) : (
        <Mail className="size-4" aria-hidden="true" />
      )}
      <span
        role="status"
        className={`pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-background-elevated px-2.5 py-1 text-xs font-medium text-foreground shadow-lg transition-opacity ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        {copied ? `Copied ${email}` : ""}
      </span>
    </a>
  );
}
