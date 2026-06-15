import type { Metadata } from "next";
import SkillsPage from "@/views/SkillsPage/SkillsPage";
import { skillsOverviewPageContent } from "@/content/skills/capabilities";

import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: skillsOverviewPageContent.seo.title,
  description: skillsOverviewPageContent.seo.description,
  keywords: [...skillsOverviewPageContent.seo.keywords],
  url: "https://ankitsharma745.github.io/skills",
});

export default function Page() {
  return <SkillsPage />;
}
