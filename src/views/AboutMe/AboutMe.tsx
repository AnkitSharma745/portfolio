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

  return (
    <section
      id="about"
      className="w-full min-h-screen py-20 px-6 md:px-20 transition-colors duration-300 bg-background text-foreground"
    >
      <motion.h2
        className="text-4xl sm:text-5xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500">
          The Code Behind the Coder
        </span>
      </motion.h2>

      <motion.p
        className="max-w-3xl mx-auto text-center text-lg text-foreground/70"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        I&apos;m not just a developer. I&apos;m an architect of logic, a designer of
        experience, and a relentless problem-solver driven by passion.
      </motion.p>

      {/* Timeline Section */}
      <VerticalTimeline
        lineColor={isDark ? "#6366f1" : "#e2e8f0"}
        className="mt-16"
      >
        {timelineData.map((item, index) => (
          <VerticalTimelineElement
            key={index}
            date={item.date}
            dateClassName="text-foreground font-bold"
            iconStyle={{ background: "var(--primary)", color: "#fff" }}
            icon={item.icon}
            contentStyle={{
              background: isDark ? "rgba(30, 41, 59, 0.6)" : "#fff",
              color: isDark ? "#fff" : "#0f172a",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(12px)",
            }}
            contentArrowStyle={{
              borderRight: `7px solid ${isDark ? "rgba(30, 41, 59, 0.6)" : "#fff"}`,
            }}
          >
            <h3 className="font-semibold text-xl">{item.title}</h3>
            <p className="text-sm mt-2 opacity-80">{item.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>


      {/* Coding Principles */}
      <motion.div
        className="mt-20 max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h3 className="text-3xl font-bold mb-8 text-center text-foreground">
          My Coding Principles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "Clean code is kind code.",
            "Design for humans, optimize for machines.",
            "Every bug is a lesson.",
            "Build once, scale forever.",
          ].map((quote, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-card border border-border text-foreground px-6 py-6 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <p className="text-lg font-medium italic">&quot;{quote}&quot;</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Personal Chart */}
      <motion.div
        className="mt-20 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h3 className="text-3xl font-bold mb-8 text-foreground">Beyond the Code</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            ["Coding", "60%"],
            ["Lofi Music", "20%"],
            ["Tech Blogs", "10%"],
            ["Side Projects", "10%"],
          ].map(([label, value], i) => (
            <div
              key={i}
              className="rounded-xl bg-card border border-border text-foreground p-6 shadow-sm font-medium hover:border-primary transition-colors"
            >
              <p className="text-sm uppercase tracking-wider opacity-70 mb-2">{label}</p>
              <p className="text-3xl font-bold text-primary">{value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
