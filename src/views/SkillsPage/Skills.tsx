"use client";

import { useEffect } from "react";
import {
  SiHtml5,
  SiFirebase,
  SiChakraui,
  SiExpress,
  SiSlack,
  SiVercel,
} from "react-icons/si";
import { FaGithub, FaNpm } from "react-icons/fa";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiMongodb,
  DiGit,
  DiPython,
} from "react-icons/di";
import { IoLogoCss3 } from "react-icons/io";
import { BiLogoVisualStudio } from "react-icons/bi";
import { TbBrandZoom, TbBrandVite, TbJson } from "react-icons/tb";
import { CgCPlusPlus } from "react-icons/cg";
import AOS from "aos";
import "aos/dist/aos.css";
import "./skillPage.css";
import ParticlesBackground from "@/components/ParticlesBackground";
import { useTheme } from "next-themes";

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

  const wrapperClass = `bg-gradient-to-r from-[#06b6d4] via-[#3b82f6] to-[#9333ea] p-[2px] rounded-2xl`;

  const headingStyle = `text-3xl md:text-4xl font-extrabold text-center mb-12 tracking-tight 
    ${isDark ? "text-white" : "text-gray-900"}`;

  const techItems = [
    { icon: <SiHtml5 />, label: "HTML" },
    { icon: <IoLogoCss3 />, label: "CSS" },
    { icon: <DiJavascript1 />, label: "JavaScript" },
    { icon: <DiReact />, label: "React.js" },
    { icon: <SiChakraui />, label: "Chakra UI" },
    { icon: <DiNodejs />, label: "Node.js" },
    { icon: <SiExpress />, label: "Express.js" },
    { icon: <DiMongodb />, label: "MongoDB" },
    { icon: <FaGithub />, label: "GitHub" },
    { icon: <SiFirebase />, label: "Firebase" },
  ];

  const tools = [
    { icon: <BiLogoVisualStudio />, label: "VS Code" },
    { icon: <DiGit />, label: "Git" },
    { icon: <SiVercel />, label: "Vercel" },
    { icon: <SiSlack />, label: "Slack" },
    { icon: <FaNpm />, label: "npm" },
    { icon: <TbJson />, label: "JSON" },
    { icon: <TbBrandVite />, label: "Vite" },
    { icon: <TbBrandZoom />, label: "Zoom" },
  ];

  const familiarity = [
    { icon: <span className="text-3xl font-bold">C</span>, label: "C" },
    { icon: <CgCPlusPlus />, label: "C++" },
    { icon: <DiPython />, label: "Python" },
  ];

  interface TechItem {
    icon: React.ReactNode;
    label: string;
  }

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
      className={`relative min-h-screen py-24 px-6 transition-all duration-500 overflow-hidden ${
        isDark
          ? "bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a]"
          : "bg-gradient-to-b from-[#fbf8f3] via-[#eff7f6] to-[#deeefc]"
      }`}
    >
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        <ParticlesBackground id="skills-page" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        <h2 className={headingStyle} data-aos="fade-up">
          <span className="bg-gradient-to-r from-[#06b6d4] via-[#3b82f6] to-[#9333ea] bg-clip-text text-transparent">
            Tech Stack
          </span>
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-8 justify-items-center mb-20">
          {renderCards(techItems, "zoom-in")}
        </div>

        <h2 className={headingStyle} data-aos="fade-up">
          <span className="bg-gradient-to-r from-[#06b6d4] via-[#3b82f6] to-[#9333ea] bg-clip-text text-transparent">
            Tools I Use
          </span>
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-8 justify-items-center mb-20">
          {renderCards(tools, "fade-left")}
        </div>

        <h2 className={headingStyle} data-aos="fade-up">
          <span className="bg-gradient-to-r from-[#06b6d4] via-[#3b82f6] to-[#9333ea] bg-clip-text text-transparent">
            Familiar With
          </span>
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-8 justify-items-center">
          {renderCards(familiarity, "fade-right")}
        </div>
      </div>
    </section>
  );
}
