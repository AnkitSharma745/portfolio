"use client";

import dynamic from "next/dynamic";
import ParticlesBackground from "@/components/ParticlesBackground";
import SectionDivider from "@/components/SectionDivider";

// Lazy load below-the-fold components for better performance
const ExperiencePortfolio = dynamic(
    () => import("@/components/sections/Experience/Experience"),
    {
        loading: () => (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        ),
    }
);

const GitHubJourney = dynamic(() => import("@/components/github/Github"));

const Hero = dynamic(() => import("@/components/sections/Hero/Hero"));
const AboutMe = dynamic(() => import("@/components/sections/AboutMe/AboutMe"));
const About = dynamic(() => import("@/components/sections/AboutTemp/About"));
const Skills = dynamic(() => import("@/components/sections/Skills/Skills"));
const Tools = dynamic(() => import("@/components/sections/Tools/Tools"));
const Projects = dynamic(() => import("@/components/sections/Projects/Projects"));
const OpenSource = dynamic(() => import("@/components/sections/OpenSource/OpenSource"));
const Solutions = dynamic(() => import("@/components/sections/Solutions/Solutions"));
const Connect = dynamic(() => import("@/components/sections/Connect/Connect"));
const Contact = dynamic(() => import("@/components/sections/Contact/Contact"));
const CodingYearJourney = dynamic(() => import("@/views/CodingYearJourney/CodingYearJourney"));

export default function HomePage() {
    return (
        <main className="relative min-h-screen bg-background text-foreground transition-colors duration-300">
            <div className="fixed inset-0 z-0">
                <ParticlesBackground />
            </div>

            <div className="relative z-10">
                <Hero />
                <SectionDivider />
                <AboutMe />
                <ExperiencePortfolio />
                <About />
                <Skills />
                <Tools />
                <Connect />
                <Contact />
                <Projects />
                <OpenSource />
                <Solutions />
                <CodingYearJourney />
                <GitHubJourney />
            </div>
        </main>
    );
}
