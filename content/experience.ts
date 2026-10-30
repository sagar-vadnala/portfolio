import { ExperienceEntry } from "./types";

export const experience: ExperienceEntry[] = [
  {
    id: "hikigai-swe",
    role: "Software Engineer",
    company: "Hikigai Inc.",
    startDate: "Mar 2025",
    endDate: "Present",
    tech: ["Next.js", "React", "TypeScript", "Flutter", "WebSocket", "REST APIs", "Docker", "CI/CD"],
    summary: [
      "Ship full-stack features across web (Next.js, React, TypeScript) and mobile (Flutter), from design to production.",
      "Build real-time WebSocket systems, REST APIs, and third-party integrations; improved app performance by up to 55%.",
      "Set up build and deployment pipelines, and restore legacy projects to full functionality.",
    ],
    highlights: [
      "Build and ship full-stack features across web (Next.js, React, TypeScript) and mobile (Flutter), collaborating with cross-functional teams from design to production.",
      "Work across the stack — real-time WebSocket systems, REST APIs, third-party integrations, and data persistence.",
      "Improved application performance by up to 55% through profiling and optimization.",
      "Write tested, type-safe, maintainable code, and set up build and deployment pipelines.",
      "Debug and restore legacy projects to full functionality.",
    ],
  },
  {
    id: "codforge-jsd",
    role: "Junior Software Developer",
    company: "CodForge",
    startDate: "Jul 2024",
    endDate: "Mar 2025",
    tech: ["Flutter", "Dart", "Firebase", "REST APIs", "Git"],
    summary: [
      "Built and shipped three cross-platform mobile apps for Android and iOS.",
      "Ran version control and release workflows across builds.",
    ],
    highlights: [
      "Built and shipped three cross-platform mobile applications (Flutter, Dart, Firebase, REST APIs) for both Android and iOS.",
      "Managed version control and release workflows with Git, resolving integration and runtime issues across builds.",
    ],
  },
];
