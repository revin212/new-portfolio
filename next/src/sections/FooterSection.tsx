import Image from "next/image";
import type { PortfolioProfile } from "@/lib/portfolio";
import { listFooterSocialLinks } from "@/lib/portfolio";

type Props = { profile: PortfolioProfile };

export function FooterSection({ profile }: Props) {
  const links = listFooterSocialLinks(profile);

  return (
    <footer className="w-full py-12 bg-surface-container-lowest" id="footer">
      <div className="flex flex-col items-center gap-6 w-full px-8">
        {links.length > 0 ? (
          <div className="flex gap-8 flex-wrap justify-center">
            {links.map((s) => (
              <a
                key={s.id}
                className="text-on-surface-variant hover:text-primary transition-all hover:scale-110 font-bold"
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
              >
                <Image
                  src={s.icon}
                  alt=""
                  width={24}
                  height={24}
                  className="block"
                />
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </footer>
  );
}
