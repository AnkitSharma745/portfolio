"use client";
import ParticlesBackground from "@/components/ParticlesBackground";
import SectionDivider from "@/components/SectionDivider";
import GithubJourneySection from "@/sections/github/Github";
import Hero from "@/sections/Hero/Hero";
import Skills from "@/sections/Skills/Skills";
import Tools from "@/sections/Tools/Tools";
import Projects from "@/sections/Projects/Projects";
import Solutions from "@/sections/Solutions/Solutions";
import ContactMe from "@/sections/ContactMe/ContactMe";
import CodingYearJourney from "@/components/CodingJourney/CodingYearJourney";
import AboutMe from "@/sections/About/About";

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
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Tools />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Solutions />
        <SectionDivider />
        <CodingYearJourney />
        <SectionDivider />
        <GithubJourneySection />
        <SectionDivider />
        <ContactMe />
      </div>
    </main>
  );
}
