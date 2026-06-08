"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import "./skillPage.css";
import SectionDivider from "@/components/SectionDivider";
import {
  TECH_ITEMS,
  FAMILIARITY_ITEMS,
  TOOLS_ITEMS,
  TechItem,
} from "@/lib/constants/skills";
import Link from "next/link";
import ProgressBar from "@/components/ProgressBar";

export default function SkillsPage() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const boxStyle = `group relative w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 flex flex-col items-center justify-center
    rounded-2xl bg-gradient-to-br shadow-lg backdrop-blur-lg transition-all duration-500 hover:scale-110
    cursor-pointer border border-gray-200 dark:border-gray-700
    bg-white/60 text-black dark:bg-gray-800/50 dark:text-white`;

  const wrapperClass = `bg-gradient-to-r from-primary via-cyan-400 to-accent p-[2px] rounded-2xl`;

  const headingStyle = `text-3xl md:text-4xl font-extrabold text-center mb-12 tracking-tight 
    text-gray-900 dark:text-white`;

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
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-8 justify-items-center">
          {renderCards(FAMILIARITY_ITEMS, "fade-right")}
        </div>

        <h2 className={headingStyle} data-aos="fade-up">
          <span className="bg-gradient-to-r from-primary via-cyan-400 to-accent bg-clip-text text-transparent">
            Proficiency
          </span>
        </h2>
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 px-4">
          <ProgressBar
            label="React / Next.js"
            percentage={95}
          />
          <ProgressBar label="TypeScript" percentage={90} />
          <ProgressBar label="Node.js" percentage={85} />
          <ProgressBar label="UI/UX Design" percentage={80} />
          <ProgressBar
            label="System Architecture"
            percentage={85}
          />
          <ProgressBar label="DevOps" percentage={75} />
        </div>
      </div>

      <div className="flex justify-center mt-12 mb-12">
        <Link href="/skills">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-primary/25 transition-all"
          >
            View Full Skills
          </motion.button>
        </Link>
      </div>

      {/* Section Divider */}
      <SectionDivider />
    </section>
  );
}
