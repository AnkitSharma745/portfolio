import React from "react";
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

export interface TechItem {
    icon: React.ReactNode;
    label: string;
}

export const TECH_ITEMS: TechItem[] = [
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

export const TOOLS_DEV: TechItem[] = [
    { icon: <BiLogoVisualStudio />, label: "VS Code" },
    { icon: <DiGit />, label: "Git" },
    { icon: <SiVercel />, label: "Vercel" },
    { icon: <FaNpm />, label: "npm" },
    { icon: <TbJson />, label: "JSON" },
    { icon: <TbBrandVite />, label: "Vite" },
];

export const TOOLS_PRODUCTIVITY: TechItem[] = [
    { icon: <SiSlack />, label: "Slack" },
    { icon: <TbBrandZoom />, label: "Zoom" },
    // Add more if needed
];

export const TOOLS_COMMUNICATION: TechItem[] = [
    { icon: <SiSlack />, label: "Slack" },
    { icon: <TbBrandZoom />, label: "Zoom" },
];

export const TOOLS_ITEMS: TechItem[] = [
    ...TOOLS_DEV,
    ...TOOLS_PRODUCTIVITY,
];

export const FAMILIARITY_ITEMS: TechItem[] = [
    { icon: <span className="text-3xl font-bold">C</span>, label: "C" },
    { icon: <CgCPlusPlus />, label: "C++" },
    { icon: <DiPython />, label: "Python" },
];
