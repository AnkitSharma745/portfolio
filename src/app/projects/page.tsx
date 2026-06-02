import type { Metadata } from "next";
import ProjectsPage from "@/views/ProjectsPage/ProjectsPage";

export const metadata: Metadata = {
    title: "Projects | Ankit Sharma",
    description: "Explore my portfolio of web and desktop applications, from enterprise solutions to creative experiments.",
};

export default function Page() {
    return <ProjectsPage />;
}
