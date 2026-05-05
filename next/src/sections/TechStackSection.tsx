"use client";

import { useMessages } from "@/lib/i18n";
import type { PortfolioProfile } from "@/lib/portfolio";
import {
  groupTechStacksByCategory,
  listVisibleTechStacks,
} from "@/lib/portfolio";

type Props = { profile: PortfolioProfile };

export function TechStackSection({ profile }: Props) {
  const m = useMessages();
  const stacks = listVisibleTechStacks(profile);
  const groups = groupTechStacksByCategory(stacks);
  const frontend = groups["Frontend"] ?? [];
  const backend = groups["Backend"] ?? [];
  const tools = groups["Tools"] ?? [];

  return (
    <section className="py-32 px-8" id="tech-stack">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 py-4">
            <span className="text-primary font-bold tracking-widest text-xs uppercase">
              {m.techStack.eyebrow}
            </span>
            <h2 className="text-4xl font-bold mt-2 tracking-tight font-headline">
              {m.techStack.title}
            </h2>
            <p className="mt-4 text-on-surface-variant leading-relaxed">
              {m.techStack.intro}
            </p>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-surface-container-lowest p-8 rounded-2xl hover:bg-primary-container/20 transition-colors border border-outline-variant/10">
              <h4 className="font-bold text-lg mb-6 flex items-center gap-2 font-headline">
                <span className="text-primary">◼</span> {m.techStack.frontend}
              </h4>
              <div className="flex flex-wrap gap-2">
                {frontend.map((t) => (
                  <span
                    key={t.id}
                    className="bg-secondary-fixed text-on-secondary-fixed px-3 py-1.5 rounded-lg text-xs font-semibold"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-surface-container-lowest p-8 rounded-2xl hover:bg-primary-container/20 transition-colors border border-outline-variant/10">
              <h4 className="font-bold text-lg mb-6 flex items-center gap-2 font-headline">
                <span className="text-primary">◼</span> {m.techStack.backend}
              </h4>
              <div className="flex flex-wrap gap-2">
                {backend.map((t) => (
                  <span
                    key={t.id}
                    className="bg-secondary-fixed text-on-secondary-fixed px-3 py-1.5 rounded-lg text-xs font-semibold"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-surface-container-lowest p-8 rounded-2xl sm:col-span-2 hover:bg-primary-container/20 transition-colors border border-outline-variant/10">
              <h4 className="font-bold text-lg mb-6 flex items-center gap-2 font-headline">
                <span className="text-primary">◼</span> {m.techStack.tools}
              </h4>
              <div className="flex flex-wrap gap-2">
                {tools.map((t) => (
                  <span
                    key={t.id}
                    className="bg-secondary-fixed text-on-secondary-fixed px-3 py-1.5 rounded-lg text-xs font-semibold"
                  >
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
