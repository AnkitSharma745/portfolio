import React from "react";
import { FaCode, FaLaptopCode, FaUserSecret, FaBriefcase, FaProjectDiagram, FaTools } from "react-icons/fa";

export const ABOUT_CONTENT = {
  summary: "I'm a passionate Full Stack Developer and Desktop App Specialist with a knack for building high-performance, scalable applications. My journey is defined by a relentless pursuit of code perfection and user-centric design.",
  stats: [
    {
      icon: FaBriefcase,
      value: 3,
      label: "Years Experience",
      suffix: "+",
      delay: 0,
    },
    {
      icon: FaProjectDiagram,
      value: 25,
      label: "Projects Completed",
      suffix: "+",
      delay: 0.1,
    },
    {
      icon: FaTools,
      value: 15,
      label: "Technologies",
      suffix: "+",
      delay: 0.2,
    },
    {
      icon: FaCode,
      value: 50,
      label: "K+ Lines of Code",
      suffix: "",
      delay: 0.3,
    },
  ],
  roles: [
    {
      icon: React.createElement(FaCode),
      title: "The Coder",
      desc: "Writing clean, type-safe, and maintainable code is my obsession. I believe in code that speaks for itself.",
    },
    {
      icon: React.createElement(FaUserSecret),
      title: "The Optimizer",
      desc: "Performance isn't an afterthought; it's a feature. I optimize every byte to ensure lightning-fast experiences.",
    },
    {
      icon: React.createElement(FaLaptopCode),
      title: "The Builder",
      desc: "From concept to deployment, I love the entire process of bringing ideas to life through software.",
    },
  ],
  coreSkills: [
    { name: "React.js", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "Next.js", level: 88 },
    { name: "MongoDB", level: 80 },
    { name: "Electron", level: 85 },
  ],
};
