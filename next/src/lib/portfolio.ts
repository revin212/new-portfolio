import profilesRaw from "../data/profiles.json";
import projectsRaw from "../data/projects.json";
import sectionsRaw from "../data/sections.json";
import techStacksRaw from "../data/tech-stacks.json";

export type SectionId =
  | "hero"
  | "education"
  | "experience"
  | "projects"
  | "techStack"
  | "process"
  | "contact"
  | "footer";

export type SectionRegistryItem = {
  id: SectionId;
  navLabel?: string;
  anchor?: string;
};

export type Project = {
  id: string;
  title: string;
  subtitle?: string | null;
  description: string;
  techStackIds: string[];
  image?: string | null;
  links?: {
    live?: string | null;
    repo?: string | null;
  };
};

export type TechStack = {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Tools" | string;
};

export type PortfolioProfile = {
  sections: SectionId[];
  visibleProjectIds: string[];
  visibleTechStackIds: string[];
  pageTitle?: string;
  tagline?: string;
};

type ProfilesJson = Record<string, unknown>;

const profiles = profilesRaw as unknown as ProfilesJson;
const projects = projectsRaw as unknown as Project[];
const techStacks = techStacksRaw as unknown as TechStack[];
const sections = sectionsRaw as unknown as SectionRegistryItem[];

export function getProfile(slug: string): PortfolioProfile | null {
  const value = profiles[slug];
  if (!value || typeof value !== "object") return null;
  const p = value as Partial<PortfolioProfile>;
  if (!Array.isArray(p.sections)) return null;
  return {
    sections: p.sections as SectionId[],
    visibleProjectIds: (p.visibleProjectIds ?? []) as string[],
    visibleTechStackIds: (p.visibleTechStackIds ?? []) as string[],
    pageTitle: p.pageTitle,
    tagline: p.tagline,
  };
}

export function getDefaultRedirectSlug(): string | null {
  const d = profiles["default"];
  if (!d || typeof d !== "object") return null;
  const redirectTo = (d as { redirectTo?: string }).redirectTo;
  return redirectTo ?? null;
}

export function listSectionsByIds(ids: SectionId[]) {
  const map = new Map(sections.map((s) => [s.id, s]));
  return ids.map((id) => map.get(id) ?? { id, navLabel: id, anchor: id });
}

export function listVisibleProjects(profile: PortfolioProfile): Project[] {
  const set = new Set(profile.visibleProjectIds);
  return projects.filter((p) => set.has(p.id));
}

export function listVisibleTechStacks(profile: PortfolioProfile): TechStack[] {
  const set = new Set(profile.visibleTechStackIds);
  return techStacks.filter((t) => set.has(t.id));
}

export function groupTechStacksByCategory(stacks: TechStack[]) {
  const groups: Record<string, TechStack[]> = {};
  for (const s of stacks) {
    groups[s.category] ??= [];
    groups[s.category].push(s);
  }
  return groups;
}

