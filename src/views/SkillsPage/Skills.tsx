"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./skillPage.css";
import ParticlesBackground from "@/components/ParticlesBackground";
import { useTheme } from "next-themes";
import SectionDivider from "@/components/SectionDivider";
import { TECH_ITEMS, TOOLS_ITEMS, FAMILIARITY_ITEMS, TechItem } from "@/constants/Skills";

export default function SkillsPage() {
  const { theme } = useTheme();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const isDark = theme === "dark";

  const boxStyle = `group relative w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 flex flex-col items-center justify-center
    rounded-2xl bg-gradient-to-br shadow-lg backdrop-blur-lg transition-all duration-500 hover:scale-110
    cursor-pointer border border-gray-200 dark:border-gray-700
    ${isDark ? "bg-gray-800/50 text-white" : "bg-white/60 text-black"}`;

  const wrapperClass = `bg-gradient-to-r from-primary via-cyan-400 to-accent p-[2px] rounded-2xl`;

  const headingStyle = `text-3xl md:text-4xl font-extrabold text-center mb-12 tracking-tight 
    ${isDark ? "text-white" : "text-gray-900"}`;

  type AosAnimation = "zoom-in" | "fade-left" | "fade-right" | string;

  const renderCards = (items: TechItem[], aosAnim: AosAnimation) =>
    items.map((tech: TechItem, idx: number) => (
      <div key={idx} data-aos={aosAnim} className={wrapperClass}>
        <div className={boxStyle}>
          <div className="text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-300">
            {tech.icon}
          </div>
          <div className="mt-2 text-sm font-medium text-center">
            {tech.label}
          </div>
        </div>
      </div>
    ));

  return (
    <section
      id="skills"
      className={`relative min-h-screen pt-24 pb-0 px-6 transition-all duration-500 overflow-hidden bg-background`}
    >
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        <ParticlesBackground id="skills-page" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        <h2 className={headingStyle} data-aos="fade-up">
          <span className="bg-gradient-to-r from-primary via-cyan-400 to-accent bg-clip-text text-transparent">
            Tech Stack
          </span>
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-8 justify-items-center mb-20">
          {renderCards(TECH_ITEMS, "zoom-in")}
        </div>

        <h2 className={headingStyle} data-aos="fade-up">
          <span className="bg-gradient-to-r from-primary via-cyan-400 to-accent bg-clip-text text-transparent">
            Tools I Use
          </span>
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-8 justify-items-center mb-20">
          {renderCards(TOOLS_ITEMS, "fade-left")}
        </div>

        <h2 className={headingStyle} data-aos="fade-up">
          <span className="bg-gradient-to-r from-primary via-cyan-400 to-accent bg-clip-text text-transparent">
            Familiar With
          </span>
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-8 justify-items-center">
          {renderCards(FAMILIARITY_ITEMS, "fade-right")}
        </div>
      </div>

      {/* Section Divider */}
      <SectionDivider />
    </section>
  );
}
