import { Fragment, type ReactNode } from "react";
import type { HomeData } from "@/lib/content-queries";
import { Hero } from "./Hero";
import { Achievements } from "./Achievements";
import { Projects } from "./Projects";
import { Experience } from "./Experience";
import { Skills } from "./Skills";
import { ResumeSection } from "./ResumeSection";
import { ArticlesSection } from "./ArticlesSection";
import { ContactSection } from "@/components/contact/ContactSection";

/** The full home page, shared by the public site and the admin draft preview. */
export function HomeSections({ data }: { data: HomeData }) {
  const {
    profile,
    experience,
    projects,
    recognitionByProjectId,
    achievements,
    skillGroups,
    education,
    certifications,
    resume,
    articles,
    settings,
    contactFormEnabled,
  } = data;

  // Numbered sections in page order. Empty ones are skipped so numbering stays continuous.
  const numbered: { key: string; visible: boolean; render: (index: string) => ReactNode }[] = [
    {
      key: "projects",
      visible: projects.length > 0,
      render: (index) => <Projects index={index} items={projects} recognitionByProjectId={recognitionByProjectId} />,
    },
    {
      key: "experience",
      visible: experience.length > 0,
      render: (index) => <Experience index={index} items={experience} />,
    },
    {
      key: "skills",
      visible: skillGroups.length > 0,
      render: (index) => <Skills index={index} groups={skillGroups} />,
    },
    {
      key: "resume",
      visible: true,
      render: (index) => (
        <ResumeSection
          index={index}
          resumeUrl={resume?.url ?? null}
          education={education}
          certifications={certifications}
        />
      ),
    },
    {
      key: "articles",
      visible: articles.length > 0,
      render: (index) => <ArticlesSection index={index} items={articles} />,
    },
    {
      key: "contact",
      visible: true,
      render: (index) => (
        <ContactSection
          index={index}
          email={profile?.email ?? ""}
          location={profile?.location}
          githubUrl={profile?.githubUrl}
          linkedinUrl={profile?.linkedinUrl}
          formEnabled={contactFormEnabled}
        />
      ),
    },
  ];

  return (
    <>
      {profile?.heroVisible !== false && (
        <Hero
          name={profile?.name ?? ""}
          headline={profile?.headline ?? ""}
          summary={profile?.summary ?? ""}
          proofLine={profile?.proofLine ?? ""}
          location={profile?.location ?? ""}
          githubUrl={profile?.githubUrl}
          linkedinUrl={profile?.linkedinUrl}
          resumeUrl={resume?.url ?? null}
          currentRole={experience[0] ? { role: experience[0].role, company: experience[0].company } : undefined}
          showProofLine={settings?.heroProofLineVisible ?? true}
        />
      )}
      <Achievements items={achievements} />
      {numbered
        .filter((section) => section.visible)
        .map((section, i) => (
          <Fragment key={section.key}>{section.render(String(i + 1).padStart(2, "0"))}</Fragment>
        ))}
    </>
  );
}
