import type { Metadata } from "next";
import ContactPage from "@/views/ContactPage/ContactPage";
import { generateMetadata as genMeta } from "@/lib/metadata";

export const metadata: Metadata = genMeta({
  title: "Contact",
  description:
    "Get in touch with me for collaborations, projects, or just to say hi. I'd love to hear from you!",
  keywords: ["contact", "email", "hire", "collaborate", "get in touch"],
});

export default function Page() {
  return <ContactPage />;
}
