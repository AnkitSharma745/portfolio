import type { Metadata } from "next";
import ExperiencePage from "@/views/ExperiencePage/ExperiencePage";

import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Experience | Ankit Sharma",
  description:
    "My professional journey, roles, and key achievements in software development.",
});

export default function Page() {
  return <ExperiencePage />;
}
