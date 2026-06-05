"use client";

import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:px-10 md:px-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-wide">
            <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary via-cyan-400 to-accent">
              Ankit Sharma
            </span>
          </h2>
          <p className="text-sm text-foreground/70 max-w-sm leading-relaxed">
            Passionate full-stack engineer crafting modern, accessible, and
            intelligent interfaces. Focused on building delightful digital
            experiences.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {["Home", "About", "Projects", "GitHub", "Contact"].map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="text-foreground/70 hover:text-primary transition-colors duration-200 block hover:translate-x-1 transform"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            Tech Stack
          </h3>
          <div className="flex flex-wrap gap-4 text-2xl text-foreground/70">
            <FaReact
              title="React"
              className="hover:text-[#61DAFB] transition-colors duration-300 hover:scale-110 transform"
            />
            <FaNodeJs
              title="Node.js"
              className="hover:text-[#339933] transition-colors duration-300 hover:scale-110 transform"
            />
            <FaJsSquare
              title="JavaScript"
              className="hover:text-[#F7DF1E] transition-colors duration-300 hover:scale-110 transform"
            />
            <FaHtml5
              title="HTML5"
              className="hover:text-[#E34F26] transition-colors duration-300 hover:scale-110 transform"
            />
            <FaCss3Alt
              title="CSS3"
              className="hover:text-[#1572B6] transition-colors duration-300 hover:scale-110 transform"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">
            Connect
          </h3>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ankitsharma745"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-secondary text-foreground hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/ankit-sharma745"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-secondary text-foreground hover:bg-[#0077B5] hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-secondary text-foreground hover:bg-[#1DA1F2] hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
              aria-label="Twitter"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="mailto:ankitaksharma9763@gmail.com"
              className="p-2 rounded-full bg-secondary text-foreground hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-110 shadow-sm"
              aria-label="Email"
            >
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="w-full py-6 border-t border-border text-center text-sm text-foreground/60 bg-secondary/30">
        © {new Date().getFullYear()} Ankit Sharma. All rights reserved.
      </div>
    </footer>
  );
}
