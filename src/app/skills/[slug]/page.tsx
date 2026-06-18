import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  engineeringCapabilities,
  getEngineeringCapabilityBySlug,
} from "@/content/skills/capabilities";
import { generateMetadata as genMeta } from "@/lib/metadata";
import SkillCapabilityPage from "@/views/SkillCapabilityPage/SkillCapabilityPage";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return engineeringCapabilities.map((capability) => ({
    slug: capability.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const capability = getEngineeringCapabilityBySlug(slug);

  if (!capability) {
    return genMeta({ title: "Capability Not Found" });
  }

  return genMeta({
    title: capability.seo.title,
    description: capability.seo.description,
    keywords: capability.seo.keywords,
    path: `/skills/${capability.slug}`,
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const capability = getEngineeringCapabilityBySlug(slug);

  if (!capability) {
    notFound();
  }

  return <SkillCapabilityPage capability={capability} />;
}
