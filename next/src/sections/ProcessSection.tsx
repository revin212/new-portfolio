"use client";

import { useMessages } from "@/lib/i18n";

export function ProcessSection() {
  const m = useMessages();

  return (
    <section className="py-20 px-8 md:py-24" id="process">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 md:mb-10">
          <span className="text-primary font-bold tracking-widest text-xs uppercase">
            {m.process.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-1.5 tracking-tight font-headline">
            {m.process.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-on-surface-variant font-body leading-snug">
            {m.process.subtitle}
          </p>
        </header>

        <ol className="grid list-none gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
          {m.process.steps.map((item, index) => (
            <li
              key={item.title}
              className="rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-4"
            >
              <div className="flex gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background font-headline text-xs font-bold text-primary"
                  aria-hidden
                >
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1 space-y-1.5">
                  <h3 className="font-headline text-base font-bold leading-snug text-on-surface">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-snug text-on-surface-variant font-body">
                    {item.description}
                  </p>
                  {item.ctaLabel ? (
                    <p className="pt-0.5">
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-1 text-sm font-bold text-primary underline underline-offset-4 transition-colors hover:text-primary/90"
                      >
                        {item.ctaLabel}
                        <span aria-hidden>→</span>
                      </a>
                    </p>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
