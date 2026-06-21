import { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import Breadcrumbs from "@/components/Breadcrumbs";
import ParticlesBackground from "@/components/ParticlesBackground";
import GradientText from "@/components/GradientText";
import GuestbookForm from "./_components/GuestbookForm";
import GuestbookList from "./_components/GuestbookList";
import { generateMetadata as genMeta } from "@/lib/metadata";

export const metadata: Metadata = genMeta({
  title: "Guestbook",
  description: "Leave a message, sign the guestbook, and say hello!",
  keywords: ["guestbook", "messages", "community", "feedback"],
  path: "/guestbook",
});

export default function GuestbookPage() {
  return (
    <PageTransition>
      <main className="relative min-h-screen overflow-hidden bg-background pb-12 pt-24 text-foreground sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <Breadcrumbs />
        </div>
        <div className="fixed inset-0 z-0 pointer-events-none">
          <ParticlesBackground />
        </div>

        <div className="container relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
          {/* Header */}
          <div className="mb-10 text-center sm:mb-14 md:mb-16">
            <h1 className="mb-4 text-3xl font-bold sm:mb-6 sm:text-5xl md:text-7xl">
              Sign the <GradientText>Guestbook</GradientText>
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-7 text-foreground/70 sm:text-lg sm:leading-8 md:text-xl">
              Leave a note, share your thoughts, or just say hi! This is a space
              for visitors to leave their mark.
            </p>
          </div>

          {/* Content */}
          <div className="grid gap-8 sm:gap-12">
            <GuestbookForm />
            <GuestbookList />
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
