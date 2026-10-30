import { SkillCategory } from "./types";

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Dart", "Java", "SQL", "HTML", "CSS"],
  },
  {
    category: "Frontend & Mobile",
    items: [
      "React",
      "Next.js (App Router)",
      "React Native",
      "Flutter",
      "Redux Toolkit",
      "Riverpod",
      "Tailwind CSS",
      "Radix",
      "MUI",
    ],
  },
  {
    category: "Backend & APIs",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "WebSocket / Socket.io",
      "OAuth",
      "SMART-on-FHIR",
      "Third-party SDK integration",
    ],
  },
  {
    category: "Databases",
    items: ["Firebase Firestore", "MongoDB", "MySQL", "SQLite", "Hive"],
  },
  {
    category: "Testing & Quality",
    items: [
      "Jest",
      "React Testing Library",
      "TypeScript strict mode",
      "Debugging",
      "Profiling",
      "Performance optimization",
    ],
  },
  {
    category: "DevOps & Tools",
    items: ["Docker", "CI/CD pipelines", "Git/GitHub", "VS Code", "Xcode", "Android Studio", "Postman"],
  },
];
