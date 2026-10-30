import { Achievement } from "./types";

// Rendered as the "By the numbers" strip under the hero: a short `title` shows
// as the big metric, `meta` as its label, and `description` as the detail line.
export const achievements: Achievement[] = [
  {
    id: "carepilot-commits",
    title: "215/391",
    meta: "Commits — largest contributor",
    description: "On CarePilot, a 34k-line TypeScript healthcare product.",
    link: "#projects",
    linkLabel: "Read the case study",
  },
  {
    id: "performance",
    title: "55%",
    meta: "Performance gains",
    description: "Up to 55% faster application performance at Hikigai, through profiling and optimization.",
  },
  {
    id: "ehr-integrations",
    title: "4",
    meta: "EHR platforms integrated",
    description: "SMART-on-FHIR launch flows for Epic, Cerner, Athena, and eClinicalWorks.",
  },
  {
    id: "mobile-apps",
    title: "3",
    meta: "Mobile apps shipped",
    description: "Cross-platform Flutter apps released to Android and iOS at CodForge.",
  },
];
