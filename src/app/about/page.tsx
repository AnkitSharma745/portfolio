import type { Metadata } from "next";
import AboutPage from "@/views/AboutPage/AboutPage";

export const metadata: Metadata = {
  title: "About Me | Ankit Sharma",
  description:
    "Learn more about my journey, skills, and passion for software development.",
};

export default function Page() {
  return <AboutPage />;
}
