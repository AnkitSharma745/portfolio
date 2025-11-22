"use client";

import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  FaCode,
  FaUserCheck,
  FaTools,
  FaGlobe,
  FaLaptopCode,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const timelineData = [
  {
    date: "2018",
    title: "Wrote my first Hello World!",
    icon: <FaCode />,
    description:
      "The spark was lit. This was the moment I knew I loved coding.",
  },
  {
    date: "2020",
    title: "First open-source project",
    icon: <FaUserCheck />,
    description: "Collaborated online and contributed to real-world solutions.",
  },
  {
    date: "2022",
    title: "Built my personal portfolio",
    icon: <FaTools />,
    description: "Took everything I knew and designed something uniquely mine.",
  },
  {
    date: "2023",
    title: "Worked on scalable APIs",
    icon: <FaGlobe />,
    description:
      "Started building backend systems and connecting UI to real power.",
  },
  {
    date: "2024",
    title: "Full-stack magic",
    icon: <FaLaptopCode />,
    description:
      "React, Node.js, MongoDB, Tailwind — I embraced the entire stack.",
  },
];

export default function AboutMe() {
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const bg = isDark ? "bg-[#202C39]" : "bg-[#f8f8f8]";
  const text = isDark ? "text-white" : "text-gray-800";
  const subText = isDark ? "text-gray-400" : "text-gray-600";

  return (
    <section
      id="about"
      className={`w-full min-h-screen py-20 px-6 md:px-20 transition-all duration-300 ${bg} ${text}`}
    >
      <motion.h2
        className="text-4xl sm:text-5xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        The Code Behind the Coder
      </motion.h2>

      <motion.p
        className={`max-w-3xl mx-auto text-center text-lg ${subText}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        I&apos;m not just a developer. I&apos;m an architect of logic, a designer of
        experience, and a relentless problem-solver driven by passion.
      </motion.p>

      {/* Timeline Section */}
      <VerticalTimeline
        lineColor={isDark ? "#06b6d4" : "#3b82f6"}
        className="mt-16"
      >
        {timelineData.map((item, index) => (
          <VerticalTimelineElement
            key={index}
            date={item.date}
            iconStyle={{ background: "#9333ea", color: "#fff" }}
            icon={item.icon}
            contentStyle={{
              background: isDark ? "#1e293b" : "#fff",
              color: isDark ? "#fff" : "#333",
            }}
            contentArrowStyle={{
              borderRight: `7px solid ${isDark ? "#1e293b" : "#fff"}`,
            }}
          >
            <h3 className="font-semibold text-xl">{item.title}</h3>
            <p className="text-sm mt-2 text-gray-400">{item.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>

      {/* Tech Stack DNA */}
      <motion.div
        className="mt-20 max-w-5xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-3xl font-bold mb-6">My Tech Stack DNA 🧬</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {["React", "TypeScript", "Tailwind", "Node.js", "MongoDB"].map(
            (tech, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-[#06b6d4] to-[#9333ea] p-4 rounded-xl shadow-md text-white font-medium"
              >
                {tech}
              </div>
            )
          )}
        </div>
      </motion.div>

      {/* Coding Principles */}
      <motion.div
        className="mt-20 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h3 className="text-3xl font-bold mb-6 text-center">
          My Coding Principles
        </h3>
        <div className="space-y-6">
          {[
            "Clean code is kind code.",
            "Design for humans, optimize for machines.",
            "Every bug is a lesson.",
            "Build once, scale forever.",
          ].map((quote, i) => (
            <div
              key={i}
              className="bg-gradient-to-r from-[#3b82f6] to-[#9333ea] text-white px-6 py-4 rounded-lg shadow"
            >
              {quote}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Personal Chart */}
      <motion.div
        className="mt-20 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h3 className="text-3xl font-bold mb-6">Beyond the Code</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            ["Coding", "60%"],
            ["Lofi Music", "20%"],
            ["Tech Blogs", "10%"],
            ["Side Projects", "10%"],
          ].map(([label, value], i) => (
            <div
              key={i}
              className="rounded-lg bg-white text-black p-4 shadow-sm font-medium"
            >
              <p className="text-sm uppercase">{label}</p>
              <p className="text-2xl font-bold">{value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
