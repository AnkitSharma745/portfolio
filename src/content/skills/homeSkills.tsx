import React from "react";
import {
  SiChakraui,
  SiDotnet,
  SiElectron,
  SiExpress,
  SiFirebase,
  SiHtml5,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import {
  DiGit,
  DiJavascript1,
  DiMongodb,
  DiNodejs,
  DiReact,
} from "react-icons/di";
import { IoLogoCss3 } from "react-icons/io";
import { FaGithub, FaNpm } from "react-icons/fa";
import { BiLogoVisualStudio } from "react-icons/bi";

export interface HomeSkillItem {
  label: string;
  icon: React.ReactNode;
}

export interface HomeSkillGroup {
  id: string;
  title: string;
  description: string;
  capabilitySlug?: string;
  items: HomeSkillItem[];
}

export const homeSkillsContent = {
  title: {
    beforeHighlight: "Skills I",
    highlighted: "Worked With",
  },
  description:
    "A cross-platform developer, spanning seamless web interfaces, robust desktop applications, and scalable backend services.",
  detailLinkLabel: "Explore Stack",
  primaryExploreLabel: "Explore detailed skills",
  capabilityNotes: {
    title: "Capability notes",
    description:
      "Short write-ups for how these tools come together in real work.",
  },
} as const;

export const homeSkillGroups: HomeSkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "The core stack I use for responsive, polished interfaces.",
    capabilitySlug: "frontend-systems",
    items: [
      { icon: <SiHtml5 />, label: "HTML" },
      { icon: <IoLogoCss3 />, label: "CSS" },
      { icon: <DiJavascript1 />, label: "JavaScript" },
      { icon: <SiTypescript />, label: "TypeScript" },
      { icon: <DiReact />, label: "React" },
      { icon: <SiNextdotjs />, label: "Next.js" },
      { icon: <SiTailwindcss />, label: "Tailwind" },
      { icon: <SiChakraui />, label: "Chakra UI" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Data",
    description: "APIs, data flows, and services behind product features.",
    capabilitySlug: "backend-systems",
    items: [
      { icon: <DiNodejs />, label: "Node.js" },
      { icon: <SiExpress />, label: "Express" },
      { icon: <DiMongodb />, label: "MongoDB" },
      { icon: <SiFirebase />, label: "Firebase" },
      { icon: <SiDotnet />, label: ".NET" },
      { icon: <span className="text-3xl font-black">C#</span>, label: "C#" },
    ],
  },
  {
    id: "shipping",
    title: "Desktop & Shipping",
    description: "Tools I use to build, package, version, and deploy work.",
    capabilitySlug: "desktop-applications",
    items: [
      { icon: <SiElectron />, label: "Electron" },
      { icon: <BiLogoVisualStudio />, label: "VS Code" },
      { icon: <DiGit />, label: "Git" },
      { icon: <FaGithub />, label: "GitHub" },
      { icon: <SiVercel />, label: "Vercel" },
      { icon: <FaNpm />, label: "npm" },
    ],
  },
];
