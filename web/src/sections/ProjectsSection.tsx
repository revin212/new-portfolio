import type { PortfolioProfile } from "../lib/portfolio";
import { listVisibleProjects } from "../lib/portfolio";
import techStacksRaw from "../data/tech-stacks.json";

type Props = { profile: PortfolioProfile };

const techNameById = new Map(
  (techStacksRaw as unknown as { id: string; name: string }[]).map((t) => [
    t.id,
    t.name,
  ])
);

export function ProjectsSection({ profile }: Props) {
  const projects = listVisibleProjects(profile);

  return (
    <section className="bg-surface-container-low py-32 px-8" id="projects">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-primary font-bold tracking-widest text-xs uppercase">
              Portfolio
            </span>
            <h2 className="text-4xl font-bold mt-2 tracking-tight font-headline">
              Selected Works
            </h2>
          </div>
          <div className="text-on-surface-variant font-label text-xs uppercase tracking-widest hidden md:block">
            Scroll to explore
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {projects.map((p) => (
            <div key={p.id} className="group cursor-pointer">
              <div className="aspect-[4/3] bg-surface-container rounded-2xl overflow-hidden mb-6 relative">
                {p.image ? (
                  <img
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={p.image}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 via-surface-container to-surface-container-low" />
                )}
                <div className="absolute inset-0 bg-inverse-surface/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <span className="text-on-primary text-5xl">↗</span>
                </div>
              </div>

              <div className="space-y-4">
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
                      Live
                    </a>
                  ) : null}
                  {p.links?.repo ? (
                    <a
                      className="text-primary font-bold underline underline-offset-4"
                      href={p.links.repo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Repo
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

