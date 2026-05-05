"use client";

import { useMessages } from "@/lib/i18n";

export function ExperienceSection() {
  const m = useMessages();

  return (
    <section className="py-32 px-8" id="experience">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-primary font-bold tracking-widest text-xs uppercase">
            {m.experience.eyebrow}
          </span>
          <h2 className="text-4xl font-bold mt-2 tracking-tight font-headline">
            {m.experience.title}
          </h2>
        </div>

        <div className="bg-surface-container-lowest p-10 rounded-2xl flex flex-col md:flex-row justify-between items-start gap-8 transition-transform hover:scale-[1.01] border border-outline-variant/10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold">
                HS
              </div>
              <h3 className="text-2xl font-bold text-on-surface font-headline">
                {m.experience.roleTitle}
              </h3>
            </div>
            <p className="text-on-surface-variant max-w-2xl font-body leading-relaxed">
              {m.experience.roleBody}
            </p>
          </div>
          <div className="text-right whitespace-nowrap">
            <span className="px-4 py-2 rounded-full bg-primary-container text-on-primary-container font-bold text-sm">
              {m.experience.period}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
