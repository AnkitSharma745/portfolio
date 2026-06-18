import type { Metadata } from "next";
import AboutPage from "@/views/AboutPage/AboutPage";

import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "About Me | Ankit Sharma",
  description:
    "Learn more about my journey, skills, and passion for software development.",
  path: "/about",
});

export default function Page() {
  return <AboutPage />;
}
