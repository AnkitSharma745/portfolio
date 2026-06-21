import { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/content/shared/site";
import { navigationItems } from "@/content/shared/navigation";
import { engineeringCapabilities } from "@/content/skills/capabilities";
import { skillDetails } from "@/content/skills/skillDetails";
import { PROJECTS_DATA } from "@/content/projects/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const lastModified = new Date();
  const posts = getBlogPosts();

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectUrls = PROJECTS_DATA.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const skillCapabilityUrls = engineeringCapabilities.map((capability) => ({
    url: `${baseUrl}/skills/${capability.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const skillDetailUrls = skillDetails.map((skill) => ({
    url: `${baseUrl}/skills/${skill.categorySlug}/${skill.skillSlug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }));

  const staticRoutes = Array.from(
    new Set(["/", ...navigationItems.map((item) => item.href), "/contact"]),
  );

  const routes = staticRoutes.map((route) => ({
    url: route === "/" ? baseUrl : `${baseUrl}${route}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));

  return [...routes, ...skillCapabilityUrls, ...skillDetailUrls, ...blogUrls, ...projectUrls];
}
