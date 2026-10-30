import type { ComponentType, SVGProps } from "react";
import {
  SiTypescript,
  SiJavascript,
  SiDart,
  SiOpenjdk,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiFlutter,
  SiRedux,
  SiTailwindcss,
  SiRadixui,
  SiMui,
  SiNodedotjs,
  SiExpress,
  SiSocketdotio,
  SiFirebase,
  SiMongodb,
  SiMysql,
  SiSqlite,
  SiJest,
  SiTestinglibrary,
  SiDocker,
  SiGithub,
  SiGit,
  SiXcode,
  SiAndroidstudio,
  SiPostman,
  SiGooglemaps,
  SiJsonwebtokens,
} from "react-icons/si";
import {
  Braces,
  Bug,
  Code,
  CreditCard,
  Database,
  Gauge,
  HeartPulse,
  Hexagon,
  KeyRound,
  Layers,
  Network,
  Puzzle,
  Radio,
  ShieldCheck,
  Webhook,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>> | LucideIcon;

// Centralized so content/skills.ts can stay plain strings while the UI
// consistently resolves each technology to a Simple Icons brand mark,
// falling back to a generic Lucide icon for concepts with no real logo.
const TECH_ICONS: Record<string, IconComponent> = {
  // Languages
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Dart: SiDart,
  Java: SiOpenjdk,
  SQL: Database,
  HTML: SiHtml5,
  CSS: SiCss,
  // Frontend & mobile
  React: SiReact,
  "Next.js": SiNextdotjs,
  "React Native": SiReact,
  Flutter: SiFlutter,
  "Redux Toolkit": SiRedux,
  Riverpod: Layers,
  "Tailwind CSS": SiTailwindcss,
  Radix: SiRadixui,
  MUI: SiMui,
  // Backend & APIs
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "REST APIs": Webhook,
  WebSocket: Radio,
  "WebSocket / Socket.io": SiSocketdotio,
  "Socket.io": SiSocketdotio,
  OAuth: KeyRound,
  JWT: SiJsonwebtokens,
  "SMART-on-FHIR": HeartPulse,
  "Third-party SDK integration": Puzzle,
  // Data
  Firebase: SiFirebase,
  "Firebase Firestore": SiFirebase,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  SQLite: SiSqlite,
  Hive: Hexagon,
  // Testing & quality
  Jest: SiJest,
  "React Testing Library": SiTestinglibrary,
  "TypeScript strict mode": ShieldCheck,
  Debugging: Bug,
  Profiling: Gauge,
  "Performance optimization": Zap,
  // DevOps & tools
  Docker: SiDocker,
  "CI/CD": Workflow,
  "CI/CD pipelines": Workflow,
  Git: SiGit,
  "Git/GitHub": SiGithub,
  "VS Code": Code,
  Xcode: SiXcode,
  "Android Studio": SiAndroidstudio,
  Postman: SiPostman,
  // Project integrations
  "Google Maps": SiGooglemaps,
  MyFatoorah: CreditCard,
  Dio: Network,
};

/** "Next.js 15" → "Next.js", "Next.js (App Router)" → "Next.js". */
function baseName(name: string) {
  return name
    .replace(/\s*\(.*\)\s*$/, "")
    .replace(/\s+\d+(\.\d+)*$/, "")
    .trim();
}

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const Icon = TECH_ICONS[name] ?? TECH_ICONS[baseName(name)] ?? Braces;
  return <Icon className={className} aria-hidden="true" />;
}
