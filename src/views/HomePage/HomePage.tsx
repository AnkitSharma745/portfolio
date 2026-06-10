"use client";

import ParticlesBackground from "@/components/ParticlesBackground";
import SectionDivider from "@/components/SectionDivider";
import GitHubJourney from "@/sections/github/Github";
import Hero from "@/sections/Hero/Hero";
import About from "@/sections/About/About";
import Skills from "@/sections/Skills/Skills";
import Tools from "@/sections/Tools/Tools";
import Projects from "@/sections/Projects/Projects";
import OpenSource from "@/sections/OpenSource/OpenSource";
import Solutions from "@/sections/Solutions/Solutions";
import Connect from "@/sections/Connect/Connect";
import Contact from "@/sections/Contact/Contact";
import CodingYearJourney from "@/sections/CodingYearJourney/CodingYearJourney";

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
