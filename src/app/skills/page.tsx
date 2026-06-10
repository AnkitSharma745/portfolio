import type { Metadata } from "next";
import SkillsPage from "@/views/SkillsPage/SkillsPage";

import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Skills | Ankit Sharma",
  description:
    "Technical skills and expertise of Ankit Sharma, including React, Next.js, Node.js, and more.",
});

export default function Page() {
  return <SkillsPage />;
}
