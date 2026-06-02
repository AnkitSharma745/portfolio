
import type { Metadata } from "next";
import SkillsPage from "@/views/SkillsPage/SkillsPage";

export const metadata: Metadata = {
    title: "Skills | Ankit Sharma",
    description: "Technical skills and expertise of Ankit Sharma, including React, Next.js, Node.js, and more.",
};

export default function Page() {
    return <SkillsPage />;
}
