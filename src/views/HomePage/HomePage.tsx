"use client";

import ParticlesBackground from "@/components/ParticlesBackground";
import SectionDivider from "@/components/SectionDivider";
import GitHubJourney from "@/components/github/Github";
import Hero from "@/components/sections/Hero/Hero";
import About from "@/components/sections/About/About";
import Skills from "@/components/sections/Skills/Skills";
import Tools from "@/components/sections/Tools/Tools";
import Projects from "@/components/sections/Projects/Projects";
import OpenSource from "@/components/sections/OpenSource/OpenSource";
import Solutions from "@/components/sections/Solutions/Solutions";
import Connect from "@/components/sections/Connect/Connect";
import Contact from "@/components/sections/Contact/Contact";
import CodingYearJourney from "@/views/CodingYearJourney/CodingYearJourney";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="fixed inset-0 z-0">
        <ParticlesBackground />
      </div>

      <div className="relative z-10">
        <Hero />
        <SectionDivider />
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
