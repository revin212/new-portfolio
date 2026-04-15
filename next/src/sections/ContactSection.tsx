"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      message: String(form.get("message") ?? "").trim(),
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
        throw new Error(json?.error ?? "Failed to send message");
      }

      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to send message");
    }
  }

  return (
    <section className="bg-surface-container-low py-32 px-8" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20">
          <div>
            <span className="text-primary font-bold tracking-widest text-xs uppercase">
              Get in touch
            </span>
            <h2 className="text-5xl font-extrabold mt-4 tracking-tighter font-headline">
              Let&apos;s build something <br />
              <span className="text-primary-dim italic underline decoration-4 underline-offset-8">
                extraordinary
              </span>{" "}
              together.
            </h2>
            <p className="mt-8 text-on-surface-variant text-lg leading-relaxed max-w-md">
              Currently open to freelance projects, permanent roles, or
              technical collaborations. Drop a message and let&apos;s start the
              conversation.
            </p>
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
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                  Name
                </label>
                <input
                  className="w-full bg-surface-container-high border-none border-b-2 border-outline-variant focus:ring-0 focus:border-primary transition-colors py-4"
                  placeholder="John Doe"
                  type="text"
                  name="name"
                  required
                  disabled={status === "loading"}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                  Email
                </label>
                <input
                  className="w-full bg-surface-container-high border-none border-b-2 border-outline-variant focus:ring-0 focus:border-primary transition-colors py-4"
                  placeholder="john@example.com"
                  type="email"
                  name="email"
                  required
                  disabled={status === "loading"}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                  Message
                </label>
                <textarea
                  className="w-full bg-surface-container-high border-none border-b-2 border-outline-variant focus:ring-0 focus:border-primary transition-colors py-4 resize-none"
                  placeholder="Tell me about your project..."
                  rows={4}
                  name="message"
                  required
                  disabled={status === "loading"}
                />
              </div>

              <button
                className="w-full bg-gradient-to-br from-primary to-primary-dim text-on-primary py-5 rounded-xl font-bold flex items-center justify-center gap-3 hover:opacity-95 transition-opacity active:scale-[0.99]"
                type="submit"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" ? (
                <p className="text-sm text-primary font-semibold">
                  Thanks — your message was sent.
                </p>
              ) : null}
              {status === "error" ? (
                <p className="text-sm text-error font-semibold">
                  {error ?? "Failed to send message."}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

