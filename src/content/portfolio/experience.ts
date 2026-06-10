export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  techStack: string[];
  logo?: string; // Optional logo URL
  color: string;
}

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    company: "Retail Solutions Inc.",
    role: "Full Stack Developer",
    period: "2023 - Present",
    description: "Leading the development of enterprise-grade retail automation solutions. Architecting scalable systems and optimizing performance for high-traffic applications.",
    achievements: [
      "Architected a multi-tenant inventory management system serving 50+ warehouse locations.",
      "Reduced API response times by 40% through advanced caching and query optimization.",
      "Mentored junior developers and established code quality standards using ESLint and Prettier.",
      "Implemented a real-time notification system using WebSockets."
    ],
    techStack: ["React", ".NET Core", "Azure", "SQL Server", "Redis"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    company: "Tech Innovators",
    role: "Frontend Engineer",
    period: "2022 - 2023",
    description: "Focused on building responsive and interactive user interfaces for e-commerce platforms. Collaborated with designers to implement pixel-perfect designs.",
    achievements: [
      "Developed a high-performance e-commerce storefront with Next.js, achieving a 98 Lighthouse score.",
      "Integrated Stripe and PayPal payment gateways for secure transactions.",
      "Created a reusable component library used across 3 different internal projects.",
      "Optimized image loading and asset delivery, reducing initial load time by 1.5s."
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Redux Toolkit"],
    color: "from-purple-500 to-pink-500"
  },
  {
    company: "Freelance",
    role: "Web Developer",
    period: "2020 - 2022",
    description: "Worked with various clients to deliver custom web solutions. Managed the entire development lifecycle from requirement gathering to deployment.",
    achievements: [
      "Delivered 10+ custom websites for small businesses and startups.",
      "Built a custom CMS for a local news agency using Node.js and MongoDB.",
      "Implemented SEO best practices, resulting in a 30% increase in organic traffic for clients.",
      "Maintained 100% client satisfaction rate through clear communication and timely delivery."
    ],
    techStack: ["React", "Node.js", "MongoDB", "WordPress"],
    color: "from-orange-500 to-red-500"
  }
];
