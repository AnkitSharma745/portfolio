"use client";

import React from "react";
import TypeWriter from "@/components/Typewriter";
import Tilt from "react-parallax-tilt";
import { Parallax } from "react-parallax";
import { FaEnvelope, FaDownload } from "react-icons/fa";
import "./homePage.css";
import { useTheme } from "next-themes";
import Image from "next/image";

const Home = () => {
  const { theme } = useTheme();

  const isDark = theme === "dark";
  const ProfileImage = "/assets/profile.jpeg";

  const textColor = isDark ? "text-white" : "text-gray-900";
  const subTextColor = isDark ? "text-gray-300" : "text-gray-600";
  const backgroundGradient = isDark
    ? "from-[#0f172a] via-[#1e293b] to-[#0f172a]"
    : "from-[#fbf8f3] via-[#eff7f6] to-[#deeefc]";

  return (
    <Parallax strength={150} className="relative">
      <section
        id="home"
        className={`relative min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center px-6 md:px-16 pt-24 pb-32 gap-16 overflow-hidden transition-colors duration-700 bg-gradient-to-br ${backgroundGradient}`}
      >
        {/* Left Section */}
        <div className="flex-1 text-center lg:text-left space-y-6 md:space-y-10 animate-fadeInUp">
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-snug ${textColor}`}
          >
            Hey{" "}
            <span
              role="img"
              aria-label="wave"
              className="inline-block animate-wave "
            >
              👋🏻
            </span>
            , I&apos;m <br />
            <span className="bg-gradient-to-r from-[#06b6d4] via-[#3b82f6] to-[#9333ea] text-transparent bg-clip-text">
              Ankit Sharma
            </span>
          </h1>

          <div
            className={`text-xl md:text-2xl lg:text-3xl font-medium ${subTextColor}`}
          >
            <TypeWriter
              input={[
                "A Tech Enthusiast",
                "Software Engineer",
                "Passionate Developer",
                "Coding Like a Machine ⚙️",
                "Building Mind-Blowing Interfaces 🔥",
              ]}
            />
          </div>
          <p
            className={`text-lg md:text-xl lg:text-2xl max-w-xl ${subTextColor}`}
          >
            Molding logic into experience — because software isn&apos;t just built,
            it&apos;s designed to inspire.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mt-8">
            <a
              href="#contact-me"
              className={`nav-button ${isDark ? "nav-dark" : "nav-light"} bg-gradient-to-r from-[#06b6d4] via-[#3b82f6] to-[#9333ea] flex items-center justify-center gap-2`}
            >
              <FaEnvelope className="text-lg" /> Contact Me
            </a>

            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/Resume.pdf";
                link.download = "Ankit_Resume.pdf";
                link.click();
              }}
              className={`nav-button ${isDark ? "nav-dark" : "nav-light"} bg-gradient-to-r from-[#06b6d4] via-[#3b82f6] to-[#9333ea] flex items-center justify-center gap-2`}
            >
              <FaDownload className="text-lg" /> Resume
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex justify-center items-center animate-slideIn">
          <Tilt
            glareEnable
            glareMaxOpacity={0.3}
            scale={1.05}
            transitionSpeed={2500}
            className="rounded-3xl"
          >
            <div className="relative group w-64 h-64 md:w-80 md:h-80">
              <Image
                src={ProfileImage}
                alt="Profile"
                width={320}
                height={320}
                className={`w-full h-full object-cover rounded-3xl shadow-xl border-4 transition-transform duration-500 group-hover:rotate-1 group-hover:scale-105 ${
                  isDark ? "border-cyan-400" : "border-blue-400"
                }`}
              />
            </div>
          </Tilt>
        </div>
      </section>
    </Parallax>
  );
};

export default Home;
