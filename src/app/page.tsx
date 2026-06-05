import type { Metadata } from "next";
import HomePage from "@/views/HomePage/HomePage";

export const metadata: Metadata = {
  title: "Portfolio | Full Stack Developer & Desktop App Specialist",
  description:
    "Dynamic Full-Stack Developer specializing in React, Next.js, Electron, and .NET. Building high-scale web and desktop applications with a focus on performance and SEO.",
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
  ],
  openGraph: {
    title: "Portfolio | Full Stack Developer & Desktop App Specialist",
    description:
      "Dynamic Full-Stack Developer specializing in React, Next.js, Electron, and .NET.",
    type: "website",
  },
};

export default function Home() {
  return <HomePage />;
}
