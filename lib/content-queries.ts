import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import type { Prisma, Profile, Settings } from "@/app/generated/prisma/client";
import type { Achievement, ExperienceEntry, Project, ProjectRecognition, SkillCategory } from "@/content/types";
import {
  profile as staticProfile,
  socialLinks as staticSocialLinks,
  experience as staticExperience,
  projects as staticProjects,
  achievements as staticAchievements,
  skills as staticSkills,
  education as staticEducation,
  certifications as staticCertifications,
  articles as staticArticles,
} from "@/content";

// Public reads: PUBLISHED rows only, mapped into the shapes the UI components expect.
// Pass includeDrafts=true (admin preview only) to also surface DRAFT rows.
//
// When no database is configured, every reader falls back to the static content in
// content/*.ts, so the site works out of the box. Once DATABASE_URL is set, the
// database (managed from /admin, seeded from the same files) is the source of truth.

function statusFilter(includeDrafts: boolean): Prisma.EnumContentStatusFilter {
  return includeDrafts ? { in: ["DRAFT", "PUBLISHED"] } : { equals: "PUBLISHED" };
}

function splitLines(value: string | null | undefined) {
  return (value ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function splitCsv(value: string | null | undefined) {
  return (value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function getProfile(): Promise<Profile | null> {
  if (!isDatabaseConfigured) {
    return {
      id: "profile",
      ...staticProfile,
      githubUrl: staticSocialLinks.find((l) => l.icon === "github")?.url ?? null,
      linkedinUrl: staticSocialLinks.find((l) => l.icon === "linkedin")?.url ?? null,
      heroVisible: true,
      updatedAt: new Date(),
    };
  }
  try {
    return await prisma.profile.findUnique({ where: { id: "profile" } });
  } catch {
    return null;
  }
}

export async function getSettings(): Promise<Settings | null> {
  if (!isDatabaseConfigured) {
    return { id: "settings", heroProofLineVisible: true, updatedAt: new Date() };
  }
  try {
    return await prisma.settings.findUnique({ where: { id: "settings" } });
  } catch {
    return null;
  }
}

export async function getPublicExperience(includeDrafts = false): Promise<ExperienceEntry[]> {
  if (!isDatabaseConfigured) return staticExperience;
  try {
    const rows = await prisma.experience.findMany({
      where: { status: statusFilter(includeDrafts) },
      orderBy: { order: "asc" },
    });
    return rows.map((e) => ({
      id: e.id,
      role: e.role,
      company: e.company,
      companyUrl: e.companyUrl ?? undefined,
      startDate: e.startDate,
      endDate: e.current ? "Present" : e.endDate,
      summary: splitLines(e.summary),
      highlights: splitLines(e.highlights),
      tech: splitCsv(e.tech),
    }));
  } catch {
    return [];
  }
}

function parseArchitecture(value: string | null) {
  if (!value) return undefined;
  const stages = value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [title, description] = line.split("::").map((p) => p?.trim() ?? "");
      return { title, description };
    });
  return stages.length > 0 ? stages : undefined;
}

export async function getPublicProjects(includeDrafts = false): Promise<Project[]> {
  if (!isDatabaseConfigured) return staticProjects;
  try {
    const rows = await prisma.project.findMany({
      where: { status: statusFilter(includeDrafts) },
      orderBy: { order: "asc" },
    });
    return rows.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      tagline: p.tagline,
      badge: p.badge ?? undefined,
      period: p.period ?? undefined,
      problem: p.problem,
      solution: p.solution,
      architecture: parseArchitecture(p.architecture),
      tech: splitCsv(p.tech),
      contributions: splitLines(p.contributions),
      results: splitLines(p.results),
      links: [
        p.githubUrl ? { label: "GitHub", url: p.githubUrl } : null,
        p.demoUrl ? { label: "Live Demo", url: p.demoUrl } : null,
      ].filter((l): l is { label: string; url: string } => l !== null),
      featured: p.featured,
      pressCoverage: p.pressCoverage,
      certificateNote: p.certificateNote ?? undefined,
    }));
  } catch {
    return [];
  }
}

export async function getProjectRecognition(projectId: string, includeDrafts = false) {
  if (!isDatabaseConfigured) return null;
  try {
    const achievement = await prisma.achievement.findFirst({
      where: { projectId, status: statusFilter(includeDrafts) },
      include: { certificateMedia: true, photoMedia: true },
    });
    if (!achievement) return null;
    return {
      certificate: achievement.certificateMedia
        ? {
            url: achievement.certificateMedia.url,
            kind: achievement.certificateMedia.kind,
            altText: achievement.certificateMedia.altText ?? undefined,
          }
        : null,
      photo: achievement.photoMedia
        ? {
            url: achievement.photoMedia.url,
            altText: achievement.photoMedia.altText ?? "Winning moment",
          }
        : null,
    };
  } catch {
    return null;
  }
}

export async function getPublicAchievements(includeDrafts = false): Promise<Achievement[]> {
  if (!isDatabaseConfigured) return staticAchievements;
  try {
    const rows = await prisma.achievement.findMany({
      where: { status: statusFilter(includeDrafts) },
      orderBy: { order: "asc" },
      include: { project: true, photoMedia: true },
    });
    return rows.map((a) => ({
      id: a.id,
      title: a.title,
      meta: a.meta ?? undefined,
      description: a.description,
      year: a.year ?? undefined,
      link: a.link ?? (a.project ? "#projects" : undefined),
      linkLabel: a.linkLabel ?? (a.project ? "View project" : undefined),
      photo: a.photoMedia
        ? { url: a.photoMedia.url, altText: a.photoMedia.altText ?? "Winning moment" }
        : undefined,
    }));
  } catch {
    return [];
  }
}

export async function getPublicCertifications(includeDrafts = false) {
  if (!isDatabaseConfigured) {
    return staticCertifications.map((c, i) => ({
      id: `certification-${i}`,
      name: c.name,
      issuer: c.issuer ?? "",
      issued: c.issued,
      credentialUrl: c.credentialUrl,
      photo: undefined,
    }));
  }
  try {
    const rows = await prisma.certification.findMany({
      where: { status: statusFilter(includeDrafts) },
      orderBy: { order: "asc" },
      include: { media: true },
    });
    return rows.map((c) => ({
      id: c.id,
      name: c.name,
      issuer: c.issuer,
      issued: c.issued ?? undefined,
      credentialUrl: c.credentialUrl ?? undefined,
      photo: c.media
        ? { url: c.media.url, kind: c.media.kind, altText: c.media.altText ?? `${c.name} certificate` }
        : undefined,
    }));
  } catch {
    return [];
  }
}

export async function getPublicSkills(includeDrafts = false): Promise<SkillCategory[]> {
  if (!isDatabaseConfigured) return staticSkills;
  try {
    const rows = await prisma.skill.findMany({
      where: { status: statusFilter(includeDrafts) },
      orderBy: { order: "asc" },
    });
    const byCategory = new Map<string, string[]>();
    for (const s of rows) {
      const list = byCategory.get(s.category) ?? [];
      list.push(s.name);
      byCategory.set(s.category, list);
    }
    return Array.from(byCategory.entries()).map(([category, items]) => ({ category, items }));
  } catch {
    return [];
  }
}

export async function getPublicEducation(includeDrafts = false) {
  if (!isDatabaseConfigured) {
    const { degree, institution, location, startDate, endDate, gpa } = staticEducation;
    return [{ degree, institution, location, startDate, endDate, gpa }];
  }
  try {
    const rows = await prisma.education.findMany({
      where: { status: statusFilter(includeDrafts) },
      orderBy: { order: "asc" },
    });
    return rows.map((e) => ({
      degree: e.degree,
      institution: e.institution,
      location: "",
      startDate: e.startDate,
      endDate: e.endDate,
      gpa: e.gpa ?? undefined,
    }));
  } catch {
    return [];
  }
}

export async function getCurrentResume() {
  // Plain <a href> doesn't get basePath automatically, so prefix it for GitHub Pages subpaths.
  if (!isDatabaseConfigured) return { url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/resume.pdf` };
  try {
    const resume = await prisma.resume.findFirst({
      where: { isCurrent: true },
      include: { media: true },
    });
    return resume ? { url: resume.media.url } : null;
  } catch {
    return null;
  }
}

export async function getPublicCodingProfiles(includeDrafts = false) {
  if (!isDatabaseConfigured) {
    return staticSocialLinks.filter((l) => l.icon !== "email").map((l) => ({ label: l.label, url: l.url }));
  }
  try {
    const rows = await prisma.codingProfile.findMany({
      where: { status: statusFilter(includeDrafts) },
      orderBy: { order: "asc" },
    });
    return rows.map((c) => ({ label: c.platform, url: c.url }));
  } catch {
    return [];
  }
}

export async function getPublicArticles(includeDrafts = false) {
  if (!isDatabaseConfigured) {
    return staticArticles.map((a) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      publishedAt: a.publishedAt,
      tags: a.tags,
    }));
  }
  try {
    const rows = await prisma.article.findMany({
      where: { status: statusFilter(includeDrafts) },
      orderBy: { publishedAt: "desc" },
    });
    return rows.map((a) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.summary,
      publishedAt: a.publishedAt ? a.publishedAt.toISOString().slice(0, 10) : "",
      tags: splitCsv(a.tags),
    }));
  } catch {
    return [];
  }
}

/** Everything the home page renders, fetched in parallel. includeDrafts is for the admin preview only. */
export async function getHomeData(includeDrafts = false) {
  const [profile, experience, projects, achievements, skillGroups, education, certifications, resume, articles, settings] =
    await Promise.all([
      getProfile(),
      getPublicExperience(includeDrafts),
      getPublicProjects(includeDrafts),
      getPublicAchievements(includeDrafts),
      getPublicSkills(includeDrafts),
      getPublicEducation(includeDrafts),
      getPublicCertifications(includeDrafts),
      getCurrentResume(),
      getPublicArticles(includeDrafts),
      getSettings(),
    ]);

  const recognitionByProjectId: Record<string, ProjectRecognition> = {};
  await Promise.all(
    projects
      .filter((p) => p.pressCoverage && p.id)
      .map(async (p) => {
        const recognition = await getProjectRecognition(p.id!, includeDrafts);
        if (recognition) recognitionByProjectId[p.id!] = recognition;
      }),
  );

  return {
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
    /** Contact leads are stored in the database, so the form only renders when one is configured. */
    contactFormEnabled: isDatabaseConfigured,
  };
}

export type HomeData = Awaited<ReturnType<typeof getHomeData>>;
