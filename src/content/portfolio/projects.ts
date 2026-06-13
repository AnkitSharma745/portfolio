export interface Project {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  liveLink?: string;
  codeLink?: string;
  demoVideo?: string;
  featured?: boolean;
}

export interface CompanyProjects {
  companyName: string;
  companyLogo?: string; // Optional logo URL
  role: string;
  projects: Project[];
}

// TODO: Replace "example.com" and "youruser" with actual URLs and GitHub username
export const PROJECTS_DATA: CompanyProjects[] = [
  {
    companyName: "Retail Solutions Inc.",
    role: "Full Stack Developer",
    projects: [
      {
        title: "Inventory Management System",
        description: "A comprehensive dashboard for tracking inventory across multiple warehouses in real-time.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?fit=crop&w=800&q=80",
        techStack: ["React", ".NET Core", "SQL Server", "Azure"],
        codeLink: "https://github.com/ankitsharma745/inventory-management",
        liveLink: "https://inventory-system.dev",
        featured: true
      },
      {
        title: "POS Desktop Application",
        description: "Electron-based Point of Sale system with offline capabilities and hardware integration.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?fit=crop&w=800&q=80",
        techStack: ["Electron", "React", "Node.js", "SQLite"],
        codeLink: "https://github.com/ankitsharma745/pos-desktop",
        liveLink: "https://pos-retail.dev",
        featured: true
      }
    ]
  },
  {
    companyName: "Tech Innovators",
    role: "Frontend Engineer",
    projects: [
      {
        title: "E-commerce Platform",
        description: "High-performance e-commerce storefront with server-side rendering and advanced caching.",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?fit=crop&w=800&q=80",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Redis"],
        codeLink: "https://github.com/ankitsharma745/ecommerce-platform",
        liveLink: "https://shop-innovations.dev",
        featured: true
      }
    ]
  },
  {
    companyName: "Freelance / Personal",
    role: "Indie Developer",
    projects: [
      {
        title: "Task Manager App",
        description: "Manage tasks efficiently using the MERN stack with real-time updates.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?fit=crop&w=800&q=80",
        techStack: ["MongoDB", "Express", "React", "Node.js"],
        codeLink: "https://github.com/ankitsharma745/task-manager",
        liveLink: "https://tasks-mern.dev",
        featured: true
      },
      {
        title: "Personal Portfolio",
        description: "Interactive portfolio website built with Next.js and Framer Motion.",
        image: "", // Empty to trigger animated placeholder
        techStack: ["Next.js", "Framer Motion", "Tailwind CSS"],
        codeLink: "https://github.com/ankitsharma745/portfolio",
        liveLink: "https://ankitsharma.dev",
        featured: true
      }
    ]
  }
];
