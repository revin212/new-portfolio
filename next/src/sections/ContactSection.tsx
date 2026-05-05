"use client";

import { useMessages } from "@/lib/i18n";
import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactSection() {
  const m = useMessages();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const isLoading = status === "loading";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      message: String(form.get("message") ?? "").trim(),
      whatsapp: String(form.get("whatsapp") ?? "").trim(),
      // honeypot: should remain empty
      website: String(form.get("website") ?? "").trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!res.ok || !json?.ok) {
        throw new Error(json?.error ?? m.contact.errorGeneric);
      }

      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : m.contact.errorGeneric
      );
    }
  }

  return (
    <section className="bg-surface-container-low py-32 px-8" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <span className="text-primary font-bold tracking-widest text-xs uppercase">
              {m.contact.eyebrow}
            </span>
            <h2 className="text-5xl font-extrabold mt-4 tracking-tighter font-headline">
              {m.contact.headlineLine1} <br />
              <span className="text-primary-dim italic underline decoration-4 underline-offset-8">
                {m.contact.headlineAccent}
              </span>{" "}
              {m.contact.headlineLine2}
            </h2>
            <p className="mt-8 text-on-surface-variant text-lg leading-relaxed max-w-md">
              {m.contact.intro}
            </p>

            <div className="mt-10 max-w-md rounded-2xl bg-surface-container-lowest/70 backdrop-blur border border-outline-variant/10 p-6">
              <p className="text-xs uppercase tracking-widest text-outline font-bold">
                {m.contact.responseTitle}
              </p>
              <p className="mt-2 text-on-surface-variant leading-relaxed">
                {m.contact.responseLead}
                <span className="text-on-surface font-semibold">
                  {m.contact.responseHours}
                </span>
                {m.contact.responseTrail}
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-10 rounded-2xl shadow-ambient border border-outline-variant/15">
            <form className="space-y-6" onSubmit={onSubmit}>
              {/* Honeypot (spam bots) */}
              <input
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                name="website"
                aria-hidden="true"
              />

              <div className="space-y-2">
                <label
                  htmlFor="contact-name"
                  className="text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                >
                  {m.contact.labelName}
                </label>
                <input
                  id="contact-name"
                  className="w-full bg-surface-container-high rounded-xl border-none border-b-2 border-outline-variant/70 focus:ring-0 focus:border-primary transition-colors py-4 px-4 placeholder:text-on-surface-variant/70"
                  placeholder={m.contact.placeholderName}
                  type="text"
                  name="name"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-email"
                  className="text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                >
                  {m.contact.labelEmail}
                </label>
                <input
                  id="contact-email"
                  className="w-full bg-surface-container-high rounded-xl border-none border-b-2 border-outline-variant/70 focus:ring-0 focus:border-primary transition-colors py-4 px-4 placeholder:text-on-surface-variant/70"
                  placeholder={m.contact.placeholderEmail}
                  type="email"
                  name="email"
                  required
                  disabled={isLoading}
                />
                <p className="text-xs text-on-surface-variant">
                  {m.contact.labelEmailHint}
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-whatsapp"
                  className="text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                >
                  {m.contact.labelWhatsapp}
                </label>
                <input
                  id="contact-whatsapp"
                  className="w-full bg-surface-container-high rounded-xl border-none border-b-2 border-outline-variant/70 focus:ring-0 focus:border-primary transition-colors py-4 px-4 placeholder:text-on-surface-variant/70"
                  placeholder={m.contact.placeholderWhatsapp}
                  type="tel"
                  name="whatsapp"
                  inputMode="tel"
                  autoComplete="tel"
                  disabled={isLoading}
                />
                <p className="text-xs text-on-surface-variant">
                  {m.contact.labelWhatsappHint}
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                >
                  {m.contact.labelMessage}
                </label>
                <textarea
                  id="contact-message"
                  className="w-full bg-surface-container-high rounded-xl border-none border-b-2 border-outline-variant/70 focus:ring-0 focus:border-primary transition-colors py-4 px-4 resize-none placeholder:text-on-surface-variant/70"
                  placeholder={m.contact.placeholderMessage}
                  rows={4}
                  name="message"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="pt-2">
                <button
                  className="w-full bg-gradient-to-br from-primary to-primary-dim text-on-primary py-5 rounded-xl font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed shadow-ambient shadow-primary/20 hover:shadow-primary/25"
                  type="submit"
                  disabled={isLoading}
                >
                  <span className="inline-flex items-center gap-3">
                    <span className="tracking-tight">
                      {isLoading ? m.contact.submitting : m.contact.submit}
                    </span>
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-on-primary/10">
                      {isLoading ? (
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-on-primary/50 border-t-on-primary" />
                      ) : (
                        <span className="text-sm">→</span>
                      )}
                    </span>
                  </span>
                </button>
              </div>

              {status === "success" ? (
                <div className="rounded-xl bg-primary-container/30 border border-outline-variant/15 px-4 py-3">
                  <p className="text-sm text-on-surface font-semibold">
                    {m.contact.successTitle}
                  </p>
                  <p className="text-xs text-on-surface-variant mt-1">
                    {m.contact.successHint}
                  </p>
                </div>
              ) : null}
              {status === "error" ? (
                <div className="rounded-xl bg-error-container/20 border border-outline-variant/15 px-4 py-3">
                  <p className="text-sm text-error font-semibold">
                    {error ?? m.contact.errorGeneric}
                  </p>
                  <p className="text-xs text-on-surface-variant mt-1">
                    {m.contact.errorRetry}
                  </p>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
