import { ArrowUp } from "lucide-react";
import { PlatformIcon } from "@/components/ui/SocialIcon";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { EmailIconLink } from "@/components/ui/EmailIconLink";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";

export function Footer({
  name,
  email,
  codingProfiles,
}: {
  name: string;
  email: string;
  codingProfiles: { label: string; url: string }[];
}) {
  return (
    <footer className="mt-12 border-t border-border">
      <div className="container-page flex flex-col items-center justify-between gap-5 py-10 text-sm text-muted sm:flex-row">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} {name}
          <span className="text-muted-soft"> · Built with Next.js, Tailwind CSS & Framer Motion</span>
        </p>
        <div className="flex items-center gap-2">
          {codingProfiles.map((link) => (
            <TrackedLink
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              eventName={ANALYTICS_EVENTS.EXTERNAL_LINK_CLICK}
              metadata={{ label: link.label }}
              className="inline-flex size-9 items-center justify-center rounded-lg border border-border hover:text-foreground hover:border-border-strong transition-colors"
              aria-label={link.label}
            >
              <PlatformIcon label={link.label} className="size-4" />
            </TrackedLink>
          ))}
          {email && (
            <EmailIconLink
              email={email}
              className="inline-flex size-9 items-center justify-center rounded-lg border border-border hover:text-foreground hover:border-border-strong transition-colors"
            />
          )}
          <a
            href="#top"
            className="ml-2 inline-flex items-center gap-1.5 rounded-lg px-2 py-2 hover:text-accent transition-colors"
          >
            Back to top
            <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
