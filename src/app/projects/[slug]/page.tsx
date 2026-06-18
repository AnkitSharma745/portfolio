import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PROJECTS_DATA } from "@/content/portfolio/projects";
import { generateMetadata as genMeta } from "@/lib/metadata";
import ProjectDetailPage from "@/views/ProjectDetailPage/ProjectDetailPage";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS_DATA.find((p) => p.slug === slug);

  if (!project) {
    return genMeta({ title: "Project Not Found" });
  }

  return genMeta({
    title: `${project.title} | Projects`,
    description: project.description,
    keywords: [...project.techStack, "software project", "engineering case study"],
    path: `/projects/${project.slug}`,
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS_DATA.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailPage project={project} />;
}
