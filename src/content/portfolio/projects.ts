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
        featured: true
      },
      {
        title: "POS Desktop Application",
        description: "Electron-based Point of Sale system with offline capabilities and hardware integration.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?fit=crop&w=800&q=80",
        techStack: ["Electron", "React", "Node.js", "SQLite"],
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
        liveLink: "https://example.com",
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
        codeLink: "https://github.com/youruser/task-manager",
        featured: true
      },
      {
        title: "Personal Portfolio",
        description: "Interactive portfolio website built with Next.js and Framer Motion.",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?fit=crop&w=800&q=80",
        techStack: ["Next.js", "Framer Motion", "Tailwind CSS"],
        codeLink: "https://github.com/youruser/portfolio",
        featured: true
      }
    ]
  }
];
