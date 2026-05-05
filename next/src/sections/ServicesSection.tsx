"use client";

import { useMessages } from "@/lib/i18n";

export function ServicesSection() {
  const m = useMessages();

  return (
    <section className="py-20 px-8 md:py-24" id="services">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 md:mb-10">
          <span className="text-primary font-bold tracking-widest text-xs uppercase">
            {m.services.eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-1.5 tracking-tight font-headline">
            {m.services.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-on-surface-variant font-body leading-snug">
            {m.services.subtitle}
          </p>
        </header>

        <ul className="grid list-none gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
          {m.services.items.map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-4"
            >
              <h3 className="font-headline text-base font-bold leading-snug text-on-surface">
                {item.title}
              </h3>
              <p className="mt-1.5 text-sm leading-snug text-on-surface-variant font-body">
                {item.examples}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
