import { SEOConfig } from "@/types/seo";
import { siteConfig } from "./site.config";

export const seoConfig: SEOConfig = {
  title: {
    default: "Ankit Sharma | Full Stack Developer & Desktop App Specialist",
    template: "%s | Ankit Sharma",
  },
  description: siteConfig.description,
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "Electron",
    "Desktop Apps",
    ".NET",
    "Automation",
    "Retail Solutions",
    "Portfolio",
    "Software Engineer",
    "Web Development",
    "Frontend Developer",
    "Backend Developer",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    handle: "@ankitsharma", // Replace with actual handle
    site: "@ankitsharma",
    cardType: "summary_large_image",
  },
};
