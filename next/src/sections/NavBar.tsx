"use client";

import { useEffect, useMemo, useState } from "react";
import type { SectionRegistryItem } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  sections: SectionRegistryItem[];
};

export function NavBar({ name, sections }: Props) {
  const items = useMemo(
    () =>
      sections
        .filter((s) => s.anchor && s.navLabel && s.id !== "footer")
        .map((s) => ({ href: `#${s.anchor}`, label: s.navLabel!, id: s.id })),
    [sections]
  );

  const [activeHref, setActiveHref] = useState(items[0]?.href ?? "#hero");

  useEffect(() => {
    const onScroll = () => {
      const offsets = items
        .map((i) => {
          const el = document.getElementById(i.href.slice(1));
          if (!el) return null;
          const top = el.getBoundingClientRect().top;
          return { href: i.href, top };
        })
        .filter(Boolean) as { href: string; top: number }[];
      const current = offsets
        .filter((o) => o.top <= 120)
        .sort((a, b) => b.top - a.top)[0];
      if (current?.href) setActiveHref(current.href);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface-container-lowest/70 backdrop-blur-xl transition-all duration-300">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <div className="text-lg font-bold tracking-tighter text-on-surface font-headline">
          {name}
        </div>
        <div className="hidden md:flex items-center gap-8">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "font-headline text-sm tracking-tight transition-colors duration-300",
                activeHref === item.href
                  ? "text-primary font-bold border-b-2 border-primary"
                  : "text-on-surface-variant hover:text-primary font-medium"
              )}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

