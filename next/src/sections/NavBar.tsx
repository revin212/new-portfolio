"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

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

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    // Lock background scroll while drawer is open.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Move focus into the dialog for better accessibility.
    setTimeout(() => closeBtnRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-surface-container-lowest/70 backdrop-blur-xl transition-all duration-300">
        <div className="flex justify-between items-center px-6 sm:px-8 py-4 max-w-7xl mx-auto">
          <div className="text-lg font-bold tracking-tighter text-on-surface font-headline">
            {name}
          </div>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-xl bg-surface-container-lowest border border-outline-variant/20 text-on-surface hover:bg-primary-container/20 transition-colors shadow-ambient"
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(true)}
          >
            <span className="text-lg leading-none">☰</span>
          </button>

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

      {isOpen ? (
        <div
          className="fixed inset-0 z-[100]"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          {/* Backdrop */}
          <button
            type="button"
            className="absolute inset-0 bg-inverse-surface/50"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <aside className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-surface-container-lowest shadow-ambient border-l border-outline-variant/20 p-6 animate-[slideIn_180ms_ease-out]">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="font-headline font-extrabold tracking-tight text-on-surface">
                  Menu
                </div>
                <div className="text-xs uppercase tracking-widest text-on-surface-variant">
                  Navigate sections
                </div>
              </div>
              <button
                type="button"
                className="h-10 w-10 rounded-xl bg-surface-container-lowest border border-outline-variant/20 text-on-surface hover:bg-primary-container/20 transition-colors"
                aria-label="Close menu"
                onClick={() => setIsOpen(false)}
                ref={closeBtnRef}
              >
                ✕
              </button>
            </div>

            <div className="mt-6 flex flex-col">
              {items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "group flex items-center justify-between py-4 font-headline text-base tracking-tight transition-colors border-b border-outline-variant/10 rounded-lg px-2 -mx-2 hover:bg-primary-container/15",
                    activeHref === item.href
                      ? "text-primary font-extrabold"
                      : "text-on-surface hover:text-primary font-semibold"
                  )}
                >
                  <span>{item.label}</span>
                  <span
                    className={cn(
                      "text-on-surface-variant transition-transform group-hover:translate-x-0.5",
                      activeHref === item.href ? "text-primary" : ""
                    )}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}


