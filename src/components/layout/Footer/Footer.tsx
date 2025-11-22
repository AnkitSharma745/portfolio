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
import { useTheme } from "next-themes";

export default function Footer() {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <>
      <footer
        className={`w-full px-6 py-12 sm:px-10 md:px-20 transition-all duration-700 
      ${isDark ? "bg-[#0f172a]/90 text-white" : "bg-[#f9f9ff] text-gray-900"}
      backdrop-blur-lg border-t ${isDark ? "border-[#6C63FF]/40" : "border-cyan-400/40"}`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h2 className="text-2xl font-bold tracking-wide">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] to-[#9333ea]">
                Ankit Sharma
              </span>
            </h2>
            <p className="mt-3 text-sm opacity-80 max-w-sm leading-relaxed">
              Passionate full-stack engineer crafting modern, accessible, and
              intelligent interfaces. Focused on building delightful digital
              experiences.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {["Home", "About", "Projects", "GitHub", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="hover:text-[#6C63FF] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-3 text-xl">
              <FaReact
                title="React"
                className="hover:text-sky-400 transition-colors"
              />
              <FaNodeJs
                title="Node.js"
                className="hover:text-green-500 transition-colors"
              />
              <FaJsSquare
                title="JavaScript"
                className="hover:text-yellow-400 transition-colors"
              />
              <FaHtml5
                title="HTML5"
                className="hover:text-orange-500 transition-colors"
              />
              <FaCss3Alt
                title="CSS3"
                className="hover:text-blue-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex items-center gap-4 mb-6">
              <a
                href="https://github.com/ankitsharma745"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-[#6C63FF] transition-transform hover:scale-125"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/ankit-sharma745"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-[#6C63FF] transition-transform hover:scale-125"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-[#6C63FF] transition-transform hover:scale-125"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="mailto:ankitaksharma9763@gmail.com"
                className="text-2xl hover:text-[#6C63FF] transition-transform hover:scale-125"
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>
      </footer>
      <div
        className={`w-full pb-6  border-t pt-6 text-center text-1xl opacity-70  ${isDark ? "bg-[#0f172a]/90 text-white" : "bg-[#f9f9ff] text-gray-900"}
      backdrop-blur-lg border-t ${isDark ? "border-[#6C63FF]/40" : "border-cyan-400/40"} `}
      >
        © {new Date().getFullYear()} Ankit Sharma. All rights reserved.
      </div>
    </>
  );
}
