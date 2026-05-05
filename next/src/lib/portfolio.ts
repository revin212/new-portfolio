import profilesRaw from "../data/profiles.json";
import projectsRaw from "../data/projects.json";
import sectionsRaw from "../data/sections.json";
import socialLinksRaw from "../data/social-links.json";
import techStacksRaw from "../data/tech-stacks.json";

export type SectionId =
  | "hero"
  | "education"
  | "experience"
  | "projects"
  | "techStack"
  | "services"
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
  /** CSS `object-position` when using cover (e.g. `left center`, `30% center`). */
  imageObjectPosition?: string | null;
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

export type SocialLinkCatalogItem = {
  id: string;
  label: string;
  icon: string;
};

export type ProfileSocialLink = {
  id: string;
  url: string;
};

export type ResolvedFooterSocialLink = SocialLinkCatalogItem & {
  url: string;
};

export type PortfolioProfile = {
  sections: SectionId[];
  visibleProjectIds: string[];
  visibleTechStackIds: string[];
  /** Ordered list of social entries to show in the footer; ids must exist in social-links.json */
  socialLinks?: ProfileSocialLink[];
  pageTitle?: string;
  tagline?: string;
  /** When true, project cards omit tech-stack chips (e.g. freelance profile) */
  hideProjectTechStack?: boolean;
};

type ProfilesJson = Record<string, unknown>;

const profiles = profilesRaw as unknown as ProfilesJson;
const projects = projectsRaw as unknown as Project[];
const techStacks = techStacksRaw as unknown as TechStack[];
const sections = sectionsRaw as unknown as SectionRegistryItem[];
const socialLinkCatalog = socialLinksRaw as unknown as SocialLinkCatalogItem[];

export function getProfile(slug: string): PortfolioProfile | null {
  const value = profiles[slug];
  if (!value || typeof value !== "object") return null;
  const p = value as Partial<PortfolioProfile>;
  if (!Array.isArray(p.sections)) return null;
  return {
    sections: p.sections as SectionId[],
    visibleProjectIds: (p.visibleProjectIds ?? []) as string[],
    visibleTechStackIds: (p.visibleTechStackIds ?? []) as string[],
    socialLinks: Array.isArray(p.socialLinks)
      ? (p.socialLinks as ProfileSocialLink[])
      : undefined,
    pageTitle: p.pageTitle,
    tagline: p.tagline,
    hideProjectTechStack: p.hideProjectTechStack === true,
  };
}

/** Slugs that resolve to a real profile page (for SSG). Excludes `default` and other invalid entries. */
export function listProfilePageSlugs(): string[] {
  return Object.keys(profiles).filter((slug) => getProfile(slug) !== null);
}

export function listFooterSocialLinks(
  profile: PortfolioProfile
): ResolvedFooterSocialLink[] {
  const entries = profile.socialLinks ?? [];
  if (entries.length === 0) return [];
  const catalog = new Map(socialLinkCatalog.map((s) => [s.id, s]));
  const out: ResolvedFooterSocialLink[] = [];
  for (const { id, url } of entries) {
    const meta = catalog.get(id);
    if (!meta) continue;
    out.push({ ...meta, url });
  }
  return out;
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

