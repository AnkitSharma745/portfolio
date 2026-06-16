"use client";

import { motion } from "framer-motion";
import { FaGithub, FaCode, FaLaptopCode, FaPhone } from "react-icons/fa";

const sidebarItems = [
  {
    id: "skills",
    title: "Skills",
    icon: <FaCode size={16} />,
    link: "/#skills",
    hoverColor: "hover:text-purple-500",
  },
  {
    id: "projects",
    title: "Projects",
    icon: <FaLaptopCode size={16} />,
    link: "/#projects",
    hoverColor: "hover:text-blue-500",
  },
  {
    id: "github",
    title: "GitHub",
    icon: <FaGithub size={16} />,
    link: "/#github-journey",
    hoverColor: "hover:text-white",
  },
  {
    id: "contact",
    title: "Contact",
    icon: <FaPhone size={14} />,
    link: "/#contact-me",
    hoverColor: "hover:text-green-500",
  },
];

export default function FloatingSideBar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed right-3 top-1/2 -translate-y-1/2 z-[100] hidden sm:flex flex-col gap-3 p-2 bg-white/50 dark:bg-black/40 backdrop-blur-md border border-neutral-200/50 dark:border-white/10 rounded-full shadow-lg"
    >
      {sidebarItems.map((item) => (
        <a
          key={item.id}
          href={item.link}
          target={item.link.startsWith("http") ? "_blank" : "_self"}
          rel={item.link.startsWith("http") ? "noopener noreferrer" : ""}
          className={`relative group p-2 rounded-full flex items-center justify-center text-foreground/60 hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 ${item.hoverColor}`}
          aria-label={item.title}
        >
          {item.icon}
          
          {/* Tooltip */}
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap shadow-md">
            {item.title}
          </span>
        </a>
      ))}
    </motion.div>
  );
}
