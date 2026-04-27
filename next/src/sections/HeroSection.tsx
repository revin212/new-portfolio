import type { PortfolioProfile } from "@/lib/portfolio";

type Props = {
  profile: PortfolioProfile;
};

export function HeroSection({ profile }: Props) {
  const tagline =
    profile.tagline ??
    "A dedicated Software Developer building modern web apps from UI to backend with precision and clean code architecture.";

  return (
    <section
      id="hero"
      className="min-h-[85vh] flex items-center px-6 sm:px-8 max-w-7xl mx-auto py-16 sm:py-20"
    >
      <div className="grid lg:grid-cols-12 gap-12 items-center w-full">
        <div className="lg:col-span-8 space-y-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold tracking-widest uppercase">
            Available for new opportunities
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4 tracking-tight font-headline">
              Hi, I&apos;m
            </h1>
            <h2 className="text-6xl sm:text-7xl md:text-[120px] font-[800] tracking-tighter text-on-surface leading-[0.85] sm:leading-[0.8] mb-8 font-headline">
              Revin <br />
              Dennis <br />
              <span className="text-primary italic">Ramadhan</span>
            </h2>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-8 pt-4">
            <p className="text-xl text-on-surface-variant max-w-md font-body leading-relaxed">
              {tagline}
            </p>
            <div className="flex items-center gap-6">
              <a
                className="bg-gradient-to-br from-primary to-primary-dim text-on-primary px-8 py-4 rounded-xl font-bold transition-transform active:scale-95 shadow-ambient shadow-primary/20"
                href="#contact"
              >
                Work With Me
              </a>
              <div className="flex gap-4">
                <a
                  className="text-on-surface-variant hover:text-primary transition-colors"
                  href="#"
                  aria-label="GitHub"
                >
                  <span className="text-2xl font-bold">GH</span>
                </a>
                <a
                  className="text-on-surface-variant hover:text-primary transition-colors"
                  href="#"
                  aria-label="LinkedIn"
                >
                  <span className="text-2xl font-bold">in</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex lg:col-span-4 justify-center items-center relative h-full min-h-[400px]">
          <div className="relative w-full aspect-square max-w-[400px]">
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl" />

            <div className="absolute top-10 right-0 w-64 p-4 bg-surface-container-lowest rounded-2xl shadow-ambient border border-outline-variant/20 transform rotate-3 hover:rotate-0 transition-transform duration-700 z-20">
              <div className="flex gap-1.5 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="space-y-2">
                <div className="h-2 w-3/4 bg-primary/20 rounded" />
                <div className="h-2 w-1/2 bg-surface-container rounded" />
                <div className="flex gap-2">
                  <div className="h-2 w-1/4 bg-surface-container rounded" />
                  <div className="h-2 w-1/3 bg-primary/40 rounded" />
                </div>
                <div className="h-2 w-2/3 bg-surface-container rounded" />
              </div>
            </div>

            <div className="absolute bottom-20 left-0 w-48 h-48 border-2 border-primary/20 rounded-full transform -rotate-12 flex items-center justify-center">
              <div className="w-32 h-32 border border-primary/10 rounded-full" />
            </div>

            <div className="absolute bottom-10 right-10 flex flex-col gap-2">
              <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center text-on-primary shadow-ambient shadow-primary/30 z-30">
                DB
              </div>
              <div className="h-12 w-12 bg-on-surface rounded-xl flex items-center justify-center text-on-primary shadow-ambient shadow-black/10 z-10 translate-x-4">
                API
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

