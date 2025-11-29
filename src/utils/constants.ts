import {
  FaRocket,
  FaMedal,
  FaGem,
  FaTrophy,
  FaFire,
  FaStar,
} from "react-icons/fa";

export const JOURNEY_PHASES = [
  {
    year: "2022",
    title: "The Beginning",
    description: "Started my journey into the world of software development. Learned the basics of HTML, CSS, and JavaScript.",
    icon: FaRocket,
    color: "from-blue-400 to-blue-600",
  },
  {
    year: "2023",
    title: "Full Stack Mastery",
    description: "Dove deep into the MERN stack and built several full-stack applications. Mastered React and Node.js.",
    icon: FaFire,
    color: "from-purple-400 to-purple-600",
  },
  {
    year: "2024",
    title: "Professional Growth",
    description: "Started working on enterprise-level projects. Focused on performance optimization and scalable architecture.",
    icon: FaMedal,
    color: "from-green-400 to-green-600",
  },
  {
    year: "2025",
    title: "Future Horizons",
    description: "Exploring advanced topics like AI integration, Web3, and cloud-native architectures.",
    icon: FaStar,
    color: "from-orange-400 to-orange-600",
  },
];

export const PROJECTS = [
  {
    id: "admin-portal",
    title: "Enterprise Admin Portal",
    subtitle: "Full-Stack Dashboard Revolution",
    duration: "4 months",
    impact: "300% efficiency boost",
    description:
      "Built a comprehensive admin portal from scratch with advanced category management, product listings, order processing, and kiosk management systems.",
    techStack: ["React", "TypeScript", "MUI", "Redux", "MongoDB", "Node.js"],
    features: [
      "Multi-level Category Management System",
      "Bulk CSV Upload/Download with Progress Tracking",
      "Real-time Analytics Dashboard",
      "Advanced Search & Filter Systems",
      "Audit History Tracking",
      "Role-based Access Control",
    ],
    metrics: {
      linesOfCode: "25,000+",
      components: "150+",
      apis: "80+",
      performance: "40% faster",
    },
    color: "from-purple-600 to-blue-600",
  },
  {
    id: "vending-app",
    title: "Smart Vending Machine UI",
    subtitle: "Next-Gen Kiosk Experience",
    duration: "2 months",
    impact: "95% user satisfaction",
    description:
      "Revolutionary touch-based vending machine interface built with React + Electron, optimized for 41-inch kiosk screens with custom animations.",
    techStack: ["React", "Electron", "TypeScript", "Redux", "i18n", "PM2"],
    features: [
      'Touch-optimized 41" Kiosk Interface',
      "Multi-language Support (i18n)",
      "Local File System Integration",
      "Custom Logging System",
      "Payment Gateway Integration",
      "Real-time Product Dispensing",
    ],
    metrics: {
      screenSize: "41-inch",
      languages: "5+",
      uptime: "99.9%",
      transactions: "1000+/day",
    },
    color: "from-green-500 to-teal-600",
  },
  {
    id: "architecture",
    title: "System Architecture",
    subtitle: "Scalable Tech Foundation",
    duration: "Ongoing",
    impact: "Zero downtime",
    description:
      "Designed and implemented robust system architecture with custom configurations, type-safe development, and performance optimizations.",
    techStack: [
      "TypeScript",
      "Axios",
      "MUI Theme",
      "Redux Toolkit",
      "ESLint",
      "Git",
    ],
    features: [
      "Custom Axios Wrapper with Interceptors",
      "Global MUI Theme Configuration",
      "99.9% TypeScript Coverage",
      "Advanced ESLint Rules",
      "Clean Git Workflow",
      "Performance Monitoring",
    ],
    metrics: {
      typescript: "99.9%",
      performance: "90+ Lighthouse",
      bundleSize: "< 500KB",
      buildTime: "< 30s",
    },
    color: "from-orange-500 to-red-600",
  },
];

export const ACHIEVEMENTS = [
  {
    icon: FaRocket,
    title: "40% Performance Boost",
    desc: "Optimized app performance",
  },
  {
    icon: FaTrophy,
    title: "3 Enterprise Dashboards",
    desc: "Launched successfully",
  },
  {
    icon: FaGem,
    title: "99.9% TypeScript",
    desc: "Type-safe development",
  },
  {
    icon: FaFire,
    title: "50K+ Lines of Code",
    desc: "Clean, maintainable code",
  },
];
