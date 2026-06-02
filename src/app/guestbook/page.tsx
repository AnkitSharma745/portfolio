import { Metadata } from "next";
import PageTransition from "@/components/PageTransition";
import Breadcrumbs from "@/components/Breadcrumbs";
import ParticlesBackground from "@/components/ParticlesBackground";
import GradientText from "@/components/GradientText";
import GuestbookForm from "@/components/guestbook/GuestbookForm";
import GuestbookList from "@/components/guestbook/GuestbookList";
import { generateMetadata as genMeta } from "@/lib/metadata";

export const metadata: Metadata = genMeta({
    title: "Guestbook",
    description: "Leave a message, sign the guestbook, and say hello!",
    keywords: ["guestbook", "messages", "community", "feedback"]
});

export default function GuestbookPage() {
    return (
        <PageTransition>
            <main className="min-h-screen bg-background text-foreground relative overflow-hidden pt-24 pb-10">
                <div className="container mx-auto px-6">
                    <Breadcrumbs />
                </div>
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <ParticlesBackground />
                </div>

                <div className="relative z-10 container mx-auto px-6 max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6">
                            Sign the <GradientText>Guestbook</GradientText>
                        </h1>
                        <p className="text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
                            Leave a note, share your thoughts, or just say hi! This is a space for visitors to leave their mark.
                        </p>
                    </div>

                    {/* Content */}
                    <div className="grid gap-12">
                        <GuestbookForm />
                        <GuestbookList />
                    </div>
                </div>
            </main>
        </PageTransition>
    );
}
