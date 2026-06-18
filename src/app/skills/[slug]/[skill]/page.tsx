import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getSkillDetailByRoute,
  skillDetails,
} from "@/content/skills/skillDetails";
import { generateMetadata as genMeta } from "@/lib/metadata";
import SkillDetailPage from "@/views/SkillDetailPage/SkillDetailPage";

interface PageProps {
  params: Promise<{
    slug: string;
    skill: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return skillDetails.map((skill) => ({
    slug: skill.categorySlug,
    skill: skill.skillSlug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, skill } = await params;
  const skillDetail = getSkillDetailByRoute(slug, skill);

  if (!skillDetail) {
    return genMeta({ title: "Skill Not Found" });
  }

  return genMeta({
    title: skillDetail.seo.title,
    description: skillDetail.seo.description,
    keywords: skillDetail.seo.keywords,
    path: `/skills/${skillDetail.categorySlug}/${skillDetail.skillSlug}`,
  });
}

export default async function Page({ params }: PageProps) {
  const { slug, skill } = await params;
  const skillDetail = getSkillDetailByRoute(slug, skill);

  if (!skillDetail) {
    notFound();
  }

  return <SkillDetailPage skill={skillDetail} />;
}
