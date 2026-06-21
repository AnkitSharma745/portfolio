import React from "react";
import {
  SiHtml5,
  SiFirebase,
  SiChakraui,
  SiExpress,
  SiPostman,
  SiSwagger,
  SiAnthropic,
  SiOpenai,
  SiGoogle,
  SiJira,
  SiConfluence,
} from "react-icons/si";
import {
  FaGithub,
  FaSpaceShuttle,
  FaCode,
  FaTerminal,
  FaServer,
} from "react-icons/fa";
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
import { VscCode } from "react-icons/vsc";
import { BsMicrosoftTeams } from "react-icons/bs";
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
  { icon: <DiGit />, label: "Git" },
  { icon: <FaGithub />, label: "GitHub" },
  { icon: <SiPostman />, label: "Postman" },
  { icon: <SiSwagger />, label: "Swagger" },
  { icon: <VscCode />, label: "VS Code" },
  { icon: <BiLogoVisualStudio />, label: "Visual Studio" },
  { icon: <FaSpaceShuttle />, label: "Antigravity" },
  { icon: <FaCode />, label: "Codex" },
  { icon: <FaTerminal />, label: "Claude Code" },
];

export const TOOLS_PRODUCTIVITY: TechItem[] = [
  { icon: <SiOpenai />, label: "ChatGPT" },
  { icon: <SiAnthropic />, label: "Claude" },
  { icon: <SiGoogle />, label: "Gemini" },
  { icon: <FaServer />, label: "MCP Server" },
];

export const TOOLS_COMMUNICATION: TechItem[] = [
  { icon: <SiJira />, label: "Jira" },
  { icon: <SiConfluence />, label: "Confluence" },
  { icon: <BsMicrosoftTeams />, label: "Microsoft Teams" },
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
