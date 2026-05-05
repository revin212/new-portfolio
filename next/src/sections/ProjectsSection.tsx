"use client";

import techStacksRaw from "@/data/tech-stacks.json";
import { useMessages } from "@/lib/i18n";
import type { PortfolioProfile } from "@/lib/portfolio";
import { listVisibleProjects } from "@/lib/portfolio";

type Props = { profile: PortfolioProfile };

const techNameById = new Map(
  (techStacksRaw as unknown as { id: string; name: string }[]).map((t) => [
    t.id,
    t.name,
  ])
);

export function ProjectsSection({ profile }: Props) {
  const m = useMessages();
  const projects = listVisibleProjects(profile);

  return (
    <section className="bg-surface-container-low py-32 px-8" id="projects">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-primary font-bold tracking-widest text-xs uppercase">
              {m.projects.eyebrow}
            </span>
            <h2 className="text-4xl font-bold mt-2 tracking-tight font-headline">
              {m.projects.title}
            </h2>
          </div>
          <div className="text-on-surface-variant font-label text-xs uppercase tracking-widest hidden md:block">
            {m.projects.scrollHint}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((p) => (
            <div key={p.id} className="group cursor-pointer">
              <div
                className="aspect-[4/3] mb-6 relative overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-lowest shadow-ambient ring-1 ring-inset ring-outline-variant/[0.07]"
              >
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt={p.title}
                    className="h-full w-full object-cover brightness-[0.99] contrast-[0.98] saturate-[0.96] transition-[transform,filter] duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-[1] group-hover:saturate-100"
                    src={p.image}
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-surface-container-highest via-surface-container to-surface-container-low" />
                )}
                {/* Hover: brand-tinted veil + floating chip (avoids harsh dark wash on screenshots) */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.18] via-primary/[0.06] to-transparent" />
                  <span className="relative flex h-12 w-12 translate-y-1 items-center justify-center rounded-full bg-surface-container-lowest/95 text-xl font-semibold text-primary shadow-ambient ring-1 ring-outline-variant/20 transition-transform duration-300 ease-out group-hover:translate-y-0">
                    ↗
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {!profile.hideProjectTechStack ? (
                  <div className="flex gap-2 flex-wrap">
                    {p.techStackIds.map((id) => (
                      <span
                        key={id}
                        className="rounded-full px-3 py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-wider"
                      >
                        {techNameById.get(id) ?? id}
                      </span>
                    ))}
                  </div>
                ) : null}
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors font-headline">
                  {p.title}
                </h3>
                <p className="text-on-surface-variant font-body line-clamp-2">
                  {p.description}
                </p>
                <div className="flex gap-4 pt-2">
                  {p.links?.live ? (
                    <a
                      className="text-primary font-bold underline underline-offset-4"
                      href={p.links.live}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {m.projects.live}
                    </a>
                  ) : null}
                  {p.links?.repo ? (
                    <a
                      className="text-primary font-bold underline underline-offset-4"
                      href={p.links.repo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {m.projects.repo}
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

