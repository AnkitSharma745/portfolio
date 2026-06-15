import { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog";
import { engineeringCapabilities } from "@/content/skills/capabilities";
import { skillDetails } from "@/content/skills/skillDetails";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ankitsharma745.github.io";
  const posts = getBlogPosts();

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const skillCapabilityUrls = engineeringCapabilities.map((capability) => ({
    url: `${baseUrl}/skills/${capability.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const skillDetailUrls = skillDetails.map((skill) => ({
    url: `${baseUrl}/skills/${skill.categorySlug}/${skill.skillSlug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }));

  const routes = [
    "",
    "/about",
    "/skills",
    "/experience",
    "/projects",
    "/open-source",
    "/blog",
    "/guestbook",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  return [...routes, ...skillCapabilityUrls, ...skillDetailUrls, ...blogUrls];
}
