"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { socialProfiles } from "@/content/social/profiles";
import { contactChannels } from "@/content/contact/contactChannels";

const NAV_LINKS = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Projects", href: "/#projects" },
  { name: "Solutions", href: "/#solutions" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="relative w-full overflow-hidden bg-background/80 backdrop-blur-xl border-t border-border transition-colors duration-300">
      {/* Decorative Gradient Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      {/* Background glow for dark mode */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/5 blur-[100px] pointer-events-none dark:bg-primary/10" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <h2 className="text-2xl font-bold tracking-wide">
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary via-cyan-400 to-accent">
                Ankit Sharma
              </span>
            </h2>
            <p className="text-base text-foreground/70 leading-relaxed max-w-md">
              A full-stack engineer building production-grade, scalable systems. 
              Bridging the gap between beautiful design and robust architecture.
            </p>
            <div className="pt-2">
              {mounted && (
                <div className="inline-block p-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-sm">
                  <Image
                    src={`https://komarev.com/ghpvc/?username=ankitsharma745-portfolio&label=PORTFOLIO+VIEWS&color=${theme === 'dark' ? '7E6BFF' : '06b6d4'}&style=flat-square`}
                    alt="Portfolio Views"
                    width={150}
                    height={20}
                    className="w-auto h-auto rounded-sm"
                    unoptimized
                  />
                </div>
              )}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/90 mb-6">
              Quick Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-foreground/60 hover:text-primary hover:translate-x-1 transition-all inline-block text-sm font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/90 mb-6">
              Connect With Me
            </h3>
            <div className="flex flex-wrap gap-4">
              <a 
                href={socialProfiles.github.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group p-3 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-sm hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300" 
                aria-label="GitHub"
              >
                <FaGithub size={20} className="text-foreground/70 group-hover:text-primary transition-colors" />
              </a>
              <a 
                href={socialProfiles.linkedin.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group p-3 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-sm hover:shadow-lg hover:shadow-[#0077B5]/20 hover:-translate-y-1 transition-all duration-300" 
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} className="text-foreground/70 group-hover:text-[#0077B5] transition-colors" />
              </a>
              <a 
                href={socialProfiles.twitter.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group p-3 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-sm hover:shadow-lg hover:shadow-foreground/20 hover:-translate-y-1 transition-all duration-300" 
                aria-label="X (Twitter)"
              >
                <FaXTwitter size={20} className="text-foreground/70 group-hover:text-foreground transition-colors" />
              </a>
              <a 
                href={contactChannels.find(c => c.id === "email")?.link || "mailto:ankitaksharma9763@gmail.com"} 
                className="group p-3 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-sm hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-1 transition-all duration-300" 
                aria-label="Email"
              >
                <FaEnvelope size={20} className="text-foreground/70 group-hover:text-red-500 transition-colors" />
              </a>
            </div>
          </div>
        </div>

      </div>
        <div className="w-full mt-8 pt-4 pb-4 border-t border-border flex justify-center">
          <p className="text-sm font-medium text-foreground/50">
            © {new Date().getFullYear()} Ankit Sharma. All rights reserved.
          </p>
        </div>
    </footer>
  );
}
 
