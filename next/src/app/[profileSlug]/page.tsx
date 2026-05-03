import { notFound } from "next/navigation";
import { getProfile, listSectionsByIds } from "@/lib/portfolio";
import { NavBar } from "@/sections/NavBar";
import { ContactSection } from "@/sections/ContactSection";
import { ExperienceSection } from "@/sections/ExperienceSection";
import { FooterSection } from "@/sections/FooterSection";
import { HeroSection } from "@/sections/HeroSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { TechStackSection } from "@/sections/TechStackSection";

export default function ProfilePage({
  params,
}: {
  params: { profileSlug: string };
}) {
  const profile = getProfile(params.profileSlug);
  if (!profile) notFound();

  const sectionMeta = listSectionsByIds(profile.sections);

  return (
    <div className="bg-background text-on-surface">
      <NavBar name="Revin Dennis Ramadhan" sections={sectionMeta} />
      <main className="pt-20">
        {profile.sections.map((id) => {
          switch (id) {
            case "hero":
              return <HeroSection key={id} profile={profile} />;
            case "experience":
              return <ExperienceSection key={id} />;
            case "projects":
              return <ProjectsSection key={id} profile={profile} />;
            case "techStack":
              return <TechStackSection key={id} profile={profile} />;
            case "contact":
              return <ContactSection key={id} />;
            case "footer":
              return <FooterSection key={id} profile={profile} />;
            default:
              return null;
          }
        })}
      </main>
    </div>
  );
}

