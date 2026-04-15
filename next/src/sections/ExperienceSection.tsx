export function ExperienceSection() {
  return (
    <section className="py-32 px-8" id="experience">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-primary font-bold tracking-widest text-xs uppercase">
            Career Path
          </span>
          <h2 className="text-4xl font-bold mt-2 tracking-tight font-headline">
            Professional Experience
          </h2>
        </div>

        <div className="bg-surface-container-lowest p-10 rounded-2xl flex flex-col md:flex-row justify-between items-start gap-8 transition-transform hover:scale-[1.01] border border-outline-variant/10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold">
                HS
              </div>
              <h3 className="text-2xl font-bold text-on-surface font-headline">
                Software Developer — PT Heksa Solution Insurance
              </h3>
            </div>
            <p className="text-on-surface-variant max-w-2xl font-body leading-relaxed">
              Developing enterprise-grade insurance solutions with a focus on
              robust backend architectures and highly responsive user
              interfaces.
            </p>
          </div>
          <div className="text-right whitespace-nowrap">
            <span className="px-4 py-2 rounded-full bg-primary-container text-on-primary-container font-bold text-sm">
              Jul 2024 — Present
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

