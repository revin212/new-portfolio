import { redirect } from "next/navigation";
import { getDefaultRedirectSlug } from "@/lib/portfolio";

export default function Home() {
  const slug = getDefaultRedirectSlug() ?? "portfolio-freelance";
  redirect(`/${slug}`);
}
