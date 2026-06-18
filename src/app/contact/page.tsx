import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/lib/metadata";
import ContactMe from "@/sections/ContactMe/ContactMe";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = genMeta({
  title: "Contact",
  description: "Get in touch with Ankit Sharma for professional projects, consultations, and collaborations.",
  keywords: ["contact", "hire", "email", "phone", "full stack developer", "consulting"],
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="relative">
        <div className="absolute top-24 left-0 right-0 z-20 container mx-auto px-6 max-w-6xl">
          <Breadcrumbs />
        </div>
        <ContactMe />
      </div>
    </PageTransition>
  );
}
