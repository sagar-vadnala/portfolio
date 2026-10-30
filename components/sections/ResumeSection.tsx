"use client";

import { FileText, Download, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { ANALYTICS_EVENTS } from "@/lib/analytics-events";
import { useEngagement } from "@/lib/engagement-context";
import { Certifications, type CertificationItemData } from "./Certifications";

export type EducationItemData = {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
};

export function ResumeSection({
  index,
  resumeUrl,
  education,
  certifications,
}: {
  index?: string;
  resumeUrl: string | null;
  education: EducationItemData[];
  certifications: CertificationItemData[];
}) {
  const { notifyResumeView } = useEngagement();

  return (
    <section id="resume" className="container-page py-16 sm:py-24 scroll-mt-4">
      <SectionHeading index={index} eyebrow="Resume" title="The one-page version" />

      <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
        <div className="relative flex flex-col overflow-hidden rounded-2xl card-surface p-7 sm:p-9">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
          />
          <div className="relative flex size-12 items-center justify-center rounded-xl border border-accent/30 bg-accent/10">
            <FileText size={22} className="text-accent" />
          </div>
          <h3 className="relative mt-6 text-2xl font-semibold tracking-tight">Everything above, on a single page</h3>
          <p className="relative mt-2 max-w-md text-sm leading-relaxed text-muted">
            Open it in your browser, or download the PDF to share with your team.
          </p>
          {resumeUrl && (
            <div className="relative mt-auto flex flex-wrap gap-3 pt-8">
              <TrackedLink
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                eventName={ANALYTICS_EVENTS.RESUME_VIEW}
                onClick={notifyResumeView}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground hover:brightness-110 transition-[filter]"
              >
                <FileText size={16} />
                View resume
              </TrackedLink>
              <TrackedLink
                href={resumeUrl}
                download
                eventName={ANALYTICS_EVENTS.RESUME_DOWNLOAD}
                onClick={notifyResumeView}
                className="inline-flex items-center gap-2 rounded-lg border border-border-strong px-4 py-2.5 text-sm font-semibold hover:bg-white/5 transition-colors"
              >
                <Download size={16} />
                Download PDF
              </TrackedLink>
            </div>
          )}
        </div>

        <div className="rounded-2xl card-surface p-7">
          {education.length > 0 && (
            <>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-soft">Education</p>
              <div className="space-y-5">
                {education.map((edu) => (
                  <div key={edu.degree} className="flex items-start gap-3">
                    <GraduationCap size={18} className="mt-0.5 shrink-0 text-accent" />
                    <div>
                      <h3 className="text-sm font-semibold leading-snug">{edu.degree}</h3>
                      <p className="mt-1 text-sm text-muted">
                        {edu.institution}
                        {edu.location ? `, ${edu.location}` : ""}
                      </p>
                      <p className="mt-1 font-mono text-xs text-muted-soft">
                        {edu.startDate} – {edu.endDate}
                        {edu.gpa ? ` · CGPA ${edu.gpa}` : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {certifications.length > 0 && (
            <>
              {education.length > 0 && <div className="my-6 h-px bg-border" />}
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-soft">Certifications</p>
              <Certifications items={certifications} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
