import { socialProfiles } from "@/content/shared/social";

export const siteConfig = {
  name: "Ankit Sharma",
  title: "Ankit Sharma - Full Stack Developer & Desktop App Specialist",
  description:
    "Full Stack Developer specializing in React, TypeScript, Node.js, and Electron. Building high-performance web and desktop applications with modern technologies.",
  url: "https://ankitsharma745.github.io/",
  ogImage: "https://ankitsharma745.github.io/og-image.jpg",
  links: {
    github: socialProfiles.github.url,
    linkedin: socialProfiles.linkedin.url,
    twitter: socialProfiles.twitter.url,
    email: "mailto:ankitaksharma9763@gmail.com",
  },
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "TypeScript",
    "Node.js",
    "Electron",
    "Next.js",
    "Web Development",
    "Desktop Applications",
    "Software Engineer",
    "Portfolio",
  ],
} as const;
