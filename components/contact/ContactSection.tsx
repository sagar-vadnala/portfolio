import { Mail, MapPin, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import { ContactForm } from "./ContactForm";

const TITLE = "Let's build something that holds up in production.";

export function ContactSection({
  index,
  email,
  location,
  githubUrl,
  linkedinUrl,
  formEnabled,
}: {
  index?: string;
  email: string;
  location?: string;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  /** The form stores leads in the database, so without one the section is email-first. */
  formEnabled: boolean;
}) {
  const details = (
    <div className="space-y-5">
      {email && (
        <div className="flex flex-wrap items-center gap-2">
          <TrackedLink
            href={`mailto:${email}`}
            eventName={ANALYTICS_EVENTS.EXTERNAL_LINK_CLICK}
            metadata={{ label: "Email" }}
            className={
              formEnabled
                ? "inline-flex items-center gap-2 rounded-lg border border-border-strong bg-background-elevated px-4 py-2 text-sm font-medium hover:border-accent/50 transition-colors"
                : "inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:brightness-110 transition-[filter]"
            }
          >
            <Mail size={16} className={formEnabled ? "text-accent" : undefined} />
            {email}
          </TrackedLink>
          <CopyEmailButton email={email} />
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        {linkedinUrl && (
          <TrackedLink
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            eventName={ANALYTICS_EVENTS.LINKEDIN_CLICK}
            className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors"
          >
            <LinkedinIcon className="size-4" />
            LinkedIn
            <ArrowUpRight size={14} />
          </TrackedLink>
        )}
        {githubUrl && (
          <TrackedLink
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            eventName={ANALYTICS_EVENTS.GITHUB_CLICK}
            className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors"
          >
            <GithubIcon className="size-4" />
            GitHub
            <ArrowUpRight size={14} />
          </TrackedLink>
        )}
        {location && (
          <span className="inline-flex items-center gap-2 text-muted">
            <MapPin size={15} />
            {location}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <section id="contact" className="container-page py-16 sm:py-28 scroll-mt-4">
      {formEnabled ? (
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div>
            <SectionHeading
              index={index}
              eyebrow="Contact"
              title={TITLE}
              description="Open to full-stack, frontend, and mobile engineering roles. Leave a note, or email me directly — LinkedIn and a message are both optional."
            />
            {details}
          </div>
          <div className="self-start rounded-2xl card-surface p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-3xl card-surface p-7 sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 -right-24 size-96 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
          />
          <div className="relative">
            <SectionHeading
              index={index}
              eyebrow="Contact"
              title={TITLE}
              description="Open to full-stack, frontend, and mobile engineering roles. Email is the fastest way to reach me."
            />
            {details}
          </div>
        </div>
      )}
    </section>
  );
}
