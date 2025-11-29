"use client";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import SectionDivider from "@/components/SectionDivider";
import { TIMELINE_DATA } from "@/utils/constants";
import GradientText from "@/components/GradientText";

export default function AboutMe() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="about"
      className="w-full min-h-screen pt-20 pb-0 px-6 md:px-20 transition-colors duration-300 bg-background text-foreground"
    >
      <motion.h2
        className="text-4xl sm:text-5xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <GradientText>
          The Code Behind the Coder
        </GradientText>

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
        lineColor={isDark ? "#06b6d4" : "#e2e8f0"}
        className="mt-16"
      >
        {TIMELINE_DATA.map((item, index) => (
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

      <SectionDivider />
    </section>
  );
}
