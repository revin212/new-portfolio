export function FooterSection() {
  return (
    <footer className="w-full py-12 bg-surface-container-lowest" id="footer">
      <div className="flex flex-col items-center gap-6 w-full px-8">
        <div className="flex gap-8">
          <a
            className="text-on-surface-variant hover:text-primary transition-all hover:scale-110 font-bold"
            href="#"
            aria-label="GitHub"
          >
            GH
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-all hover:scale-110 font-bold"
            href="#"
            aria-label="LinkedIn"
          >
            in
          </a>
          <a
            className="text-on-surface-variant hover:text-primary transition-all hover:scale-110 font-bold"
            href="#"
            aria-label="X"
          >
            X
          </a>
        </div>
      </div>
    </footer>
  );
}

