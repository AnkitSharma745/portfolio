import type { ReactNode } from "react";
import {
  SiDotnet,
  SiElectron,
  SiExpress,
  SiHtml5,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiAngular,
  SiMui,
  SiMysql,
} from "react-icons/si";
import { VscAzure, VscTerminalPowershell } from "react-icons/vsc";
import {
  DiJavascript1,
  DiMongodb,
  DiNodejs,
  DiReact,
} from "react-icons/di";
import { IoLogoCss3 } from "react-icons/io";
import {
  FaNetworkWired,
  FaWifi,
  FaWindows,
  FaCertificate,
  FaDesktop,
  FaCashRegister,
  FaSync,
  FaRocket,
  FaCogs,
  FaCodeBranch,
} from "react-icons/fa";

export interface HomeSkillItem {
  label: string;
  slug: string;
  icon: ReactNode;
  featuredOnHome?: boolean;
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
  detailLinkLabel: "Explore more",
  primaryExploreLabel: "Explore detailed skills",
  additionalSkillsLabel: "more mapped on skills page",
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
      {
        icon: <SiTypescript />,
        label: "TypeScript",
        slug: "typescript",
        featuredOnHome: true,
      },
      { icon: <DiReact />, label: "React", slug: "react", featuredOnHome: true },
      { icon: <SiAngular />, label: "Angular", slug: "angular" },
      {
        icon: <SiNextdotjs />,
        label: "Next.js",
        slug: "next-js",
        featuredOnHome: true,
      },
      { icon: <SiMui />, label: "Material UI", slug: "material-ui" },
      {
        icon: <SiTailwindcss />,
        label: "Tailwind CSS",
        slug: "tailwind-css",
        featuredOnHome: true,
      },
      { icon: <DiJavascript1 />, label: "JavaScript", slug: "javascript" },
      { icon: <SiHtml5 />, label: "HTML5", slug: "html5" },
      { icon: <IoLogoCss3 />, label: "CSS3", slug: "css3" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Data",
    description: "APIs, data flows, and services behind product features.",
    capabilitySlug: "backend-systems",
    items: [
      {
        icon: <DiNodejs />,
        label: "Node.js",
        slug: "node-js",
        featuredOnHome: true,
      },
      {
        icon: <SiExpress />,
        label: "Express.js",
        slug: "express-js",
        featuredOnHome: true,
      },
      {
        icon: <span className="text-3xl font-black">C#</span>,
        label: "C#",
        slug: "c-sharp",
      },
      { icon: <SiDotnet />, label: ".NET", slug: "dotnet", featuredOnHome: true },
      {
        icon: <FaNetworkWired />,
        label: "REST APIs",
        slug: "rest-apis",
        featuredOnHome: true,
      },
      { icon: <FaWifi />, label: "SignalR", slug: "signalr" },
      {
        icon: <DiMongodb />,
        label: "MongoDB",
        slug: "mongodb",
        featuredOnHome: true,
      },
      { icon: <SiMysql />, label: "MySQL", slug: "mysql" },
    ],
  },
  {
    id: "desktop",
    title: "Desktop",
    description: "Robust desktop applications and system integrations.",
    capabilitySlug: "desktop-applications",
    items: [
      {
        icon: <SiElectron />,
        label: "Electron",
        slug: "electron",
        featuredOnHome: true,
      },
      { icon: <DiNodejs />, label: "Node.js", slug: "node-js" },
      {
        icon: <VscTerminalPowershell />,
        label: "PowerShell",
        slug: "powershell",
        featuredOnHome: true,
      },
      {
        icon: <FaWindows />,
        label: "Windows Integration",
        slug: "windows-integration",
        featuredOnHome: true,
      },
      {
        icon: <FaCertificate />,
        label: "Certificate Management",
        slug: "certificate-management",
      },
      {
        icon: <FaDesktop />,
        label: "Kiosk Systems",
        slug: "kiosk-systems",
        featuredOnHome: true,
      },
      { icon: <FaCashRegister />, label: "Retail Automation", slug: "retail-automation" },
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud, DevOps & Delivery",
    description: "Tools and practices to build, package, version, and deploy work.",
    capabilitySlug: "cloud-devops-delivery",
    items: [
      {
        icon: <VscAzure />,
        label: "Azure Blob Storage",
        slug: "azure-blob-storage",
        featuredOnHome: true,
      },
      {
        icon: <VscAzure />,
        label: "Azure Service Bus",
        slug: "azure-service-bus",
        featuredOnHome: true,
      },
      { icon: <FaSync />, label: "CI/CD", slug: "ci-cd", featuredOnHome: true },
      {
        icon: <FaRocket />,
        label: "Deployment Pipelines",
        slug: "deployment-pipelines",
        featuredOnHome: true,
      },
      {
        icon: <FaCogs />,
        label: "Environment Configuration",
        slug: "environment-configuration",
      },
      {
        icon: <FaCodeBranch />,
        label: "Versioning Strategies",
        slug: "versioning-strategies",
      },
    ],
  },
];
