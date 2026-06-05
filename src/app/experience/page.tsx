import type { Metadata } from "next";
import ExperiencePage from "@/views/ExperiencePage/ExperiencePage";

export const metadata: Metadata = {
  title: "Experience | Ankit Sharma",
  description:
    "My professional journey, roles, and key achievements in software development.",
};

export default function Page() {
  return <ExperiencePage />;
}
