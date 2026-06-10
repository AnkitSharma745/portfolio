import type { Metadata } from "next";
import HomePage from "@/views/HomePage/HomePage";

import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Portfolio | Full Stack Developer & Desktop App Specialist",
  description:
    "Dynamic Full-Stack Developer specializing in React, Next.js, Electron, and .NET. Building high-scale web and desktop applications with a focus on performance and SEO.",
});

export default function Home() {
  return <HomePage />;
}
