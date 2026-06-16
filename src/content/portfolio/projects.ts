export interface Project {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  liveLink?: string;
  codeLink?: string;
  bestFeature?: string;
}

export const PROJECTS_DATA: Project[] = [
 
   {
    title: "AI-Powered Log Monitoring Platform",
    description:
      "A next-generation desktop application designed to monitor, analyze, and diagnose large log files using AI-assisted workflows and local-first architecture.",
    image: "",
    techStack: [
      "Electron",
      "React",
      "TypeScript",
      "Zustand",
      "Node.js",
      "AI",
    ],
    bestFeature:
      "AI-assisted diagnostics with real-time monitoring and support for massive log files.",
    liveLink: "",
    codeLink: "https://github.com/AnkitSharma745/Monitoring.Log",
  },
   {
    title: "Personal Portfolio Platform",
    description:
      "A content-driven portfolio platform showcasing engineering capabilities, projects, blogs, and AI-era workflows with discoverability in mind.",
    image: "",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "MDX",
    ],
    bestFeature:
      "Built as a reusable portfolio engine with strong SEO and progressive disclosure.",
    liveLink: "",
    codeLink: "https://github.com/AnkitSharma745/portfolio",
    
  },
  {
    title: "E-Commerce Kiosk Application",
    description:
      "A production-grade desktop application powering retail vending machines with a seamless shopping experience, offline capabilities, and hardware integrations.",
    image: "",
    techStack: [
      "Electron",
      "React",
      "TypeScript",
      "Node.js",
      "SignalR",
    ],
    bestFeature:
      "Migrated from Chrome Runtime to Electron, significantly improving startup performance and reliability.",
    liveLink: "",
    codeLink: "",
    
  },
  {
    title: "Multi-Tenant Kiosk Admin Portal",
    description:
      "An enterprise web platform for managing products, machines, catalogs, orders, users, and configurations across multiple kiosk tenants.",
    image: "",
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "Material UI",
      "MongoDB",
    ],
    bestFeature:
      "Built a multi-tenant management system with role-based access and centralized machine operations.",
    liveLink: "",
    codeLink: "",
    
  },
 
  {
    title: "SmartBot Watchdog & Recovery System",
    description:
      "A monitoring and recovery application built to ensure kiosk reliability through automated restart and self-healing mechanisms.",
    image: "",
    techStack: [
      "Electron",
      "Node.js",
      "TypeScript",
    ],
    bestFeature:
      "Automatically detects failures and restores critical applications without manual intervention.",
    liveLink: "",
    codeLink: "",
    
  },
  {
    title: "Smart Boat Recovery System",
    description:
      "An enterprise solution focused on operational recovery workflows and automation to improve reliability and reduce manual effort.",
    image: "",
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
    ],
    bestFeature:
      "Streamlined recovery workflows through automation and operational visibility.",
    liveLink: "",
    codeLink: "",
    
  },
  {
    title: "Retail Automation Solutions",
    description:
      "A collection of enterprise retail solutions integrating software with physical devices to automate real-world business operations.",
    image: "",
    techStack: [
      "Electron",
      "React",
      "TypeScript",
      "Node.js",
      "SignalR",
    ],
    bestFeature:
      "Bridged the gap between enterprise software and retail hardware ecosystems.",
    liveLink: "",
    codeLink: "",
    
  },

];
