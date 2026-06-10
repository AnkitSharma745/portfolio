import type { Metadata } from "next";
import ProjectsPage from "@/views/ProjectsPage/ProjectsPage";

import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Projects | Ankit Sharma",
  description:
    "Explore my portfolio of web and desktop applications, from enterprise solutions to creative experiments.",
});

export default function Page() {
  return <ProjectsPage />;
}
