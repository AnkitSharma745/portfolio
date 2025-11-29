"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { useTheme } from "next-themes";
import SectionDivider from "@/components/SectionDivider";

interface Project {
  title: string;
  description: string;
  image: string;
  liveLink?: string;
  codeLink?: string;
  demoVideo?: string;
}

const PROJECTS: Project[] = [
  {
    title: "Task Manager App",
    description: "Manage tasks efficiently using the MERN stack.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?fit=crop&w=800&q=80",
    liveLink: "https://taskapp.example.com",
    codeLink: "https://github.com/youruser/task-manager",
    demoVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    title: "Personal Blog",
    description: "Responsive blog built with React and Markdown.",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?fit=crop&w=800&q=80",
    codeLink: "https://github.com/youruser/personal-blog",
  },
  {
    title: "E-commerce Store",
    description: "Laravel + MySQL based store with cart and authentication.",
    image:
      "https://images.unsplash.com/photo-1542744095-291d1f67b221?fit=crop&w=800&q=80",
    liveLink: "https://mystore.example.com",
  },
];

export default function Projects() {
  const { theme } = useTheme();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const isDark = theme === "dark";

  const sectionBg = "bg-background";

  const cardBg = isDark
    ? "bg-gray-800 text-white border-gray-700"
    : "bg-white text-black border-gray-200";

  const headingGradient =
    "bg-gradient-to-r from-primary via-cyan-400 to-accent bg-clip-text text-transparent";

  const glowOverlay =
    "absolute -inset-1 rounded-xl blur-md opacity-0 group-hover:opacity-40 transition bg-gradient-to-r from-primary via-cyan-400 to-accent z-0";

  return (
    <section
      id="projects"
      className={`pt-24 pb-0 px-6 md:px-16 relative ${sectionBg}`}
    >
      <h2
        className="text-4xl md:text-5xl font-extrabold text-center mb-16"
        data-aos="fade-up"
      >
        <span className={headingGradient}>Featured Projects</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {PROJECTS.map((project, idx) => (
          <div key={idx} className="relative group" data-aos="zoom-in">
            {/* Glow border */}
            <div className={glowOverlay}></div>

            <div
              className={`flex flex-col rounded-xl shadow-lg overflow-hidden border-2 ${cardBg} transform transition-all duration-300 hover:scale-105 relative z-10`}
            >
              <div className="relative w-full h-52">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 space-y-4 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-cyan-500 dark:text-cyan-400">
                  {project.title}
                </h3>
                <p className="text-sm flex-1">{project.description}</p>

                {/* Links */}
                <div className="mt-4 space-x-3 text-sm">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-medium"
                    >
                      🌐 Live
                    </a>
                  )}
                  {project.codeLink && (
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline font-medium"
                    >
                      💻 Code
                    </a>
                  )}
                  {project.demoVideo && (
                    <a
                      href={project.demoVideo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#06b6d4] hover:underline font-medium"
                    >
                      🎥 Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section Divider */}
      <SectionDivider />
    </section>
  );
}
