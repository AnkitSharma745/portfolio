export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  liveLink?: string;
  codeLink?: string;
  bestFeature?: string;
  detailedDescription?: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    slug: "ai-log-monitoring-platform",
    title: "AI-Powered Log Monitoring Platform",
    description:
      "A next-generation desktop application designed to monitor, analyze, and diagnose large log files using AI-assisted workflows and local-first architecture.",
    image: "/assets/images/logMonitorAppImage.png",
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
    detailedDescription:
      "A production-grade desktop application designed to monitor, analyze, and diagnose massive log files in real-time. Built with Electron and React, it incorporates AI-assisted diagnostics to parse complex log patterns, detect anomalies, and suggest resolutions locally, ensuring maximum data privacy and performance.",
  },
  {
    slug: "personal-portfolio-platform",
    title: "Personal Portfolio Platform",
    description:
      "A content-driven portfolio platform showcasing engineering capabilities, projects, blogs, and AI-era workflows with discoverability in mind.",
    image: "/assets/images/portfolio.png",
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
    detailedDescription:
      "A content-driven personal portfolio designed as a reusable engine. Features include deep performance optimizations, a command palette for rapid discoverability, a rule-based AI chat assistant, and complete search engine indexability with static page generation and dynamic sitemap integration.",
  },
  {
    slug: "ecommerce-kiosk-app",
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
    detailedDescription:
      "An enterprise-grade desktop kiosk application powering automated retail systems. Engineered to handle unreliable network connections with offline-first synchronization, local database transactions, and hardware integrations (card readers, cash acceptors, receipt printers) via native bridges.",
  },
  {
    slug: "multi-tenant-kiosk-admin",
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
    detailedDescription:
      "An enterprise web administration portal designed to manage operations across a fleet of retail kiosks. Built for multi-tenancy, it allows administrators to monitor machine health, synchronize product catalogs, track orders, manage user permissions, and push remote OTA updates.",
  },
  {
    slug: "smartbot-watchdog-recovery",
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
    detailedDescription:
      "A system-level watchdog application designed to guarantee the uptime of automated retail kiosks. It monitors running services, manages process lifecycles, and automatically applies self-healing actions, such as restarts and memory flush operations, minimizing manual maintenance.",
  },
  {
    slug: "smart-boat-recovery",
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
    detailedDescription:
      "An operational workflow automation system designed to coordinate boat recovery and harbor logistics. The portal streamlines operational tasks, visualizes real-time status, and manages resource schedules, reducing communication overhead and operational friction.",
  },
  {
    slug: "retail-automation-solutions",
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
    detailedDescription:
      "A comprehensive suite of retail automation integrations. It bridges the gap between digital ordering platforms and physical POS hardware, facilitating real-time transactions and automated stock reporting in high-throughput environments.",
  },
];
