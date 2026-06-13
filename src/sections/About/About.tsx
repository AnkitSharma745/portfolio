"use client";

import "react-vertical-timeline-component/style.min.css";
import { motion } from "framer-motion";
import GradientText from "@/components/GradientText";
import Link from "next/link";
import StatsCard from "@/components/StatsCard";
import { FaCode, FaCoffee, FaProjectDiagram, FaClock } from "react-icons/fa";
import CodingYearJourney from "@/components/CodingJourney/CodingYearJourney";

export default function AboutMe() {
  return (
    <section
      id="about"
      className="w-full min-h-screen transition-colors duration-300 bg-background text-foreground"
    >
      <motion.h2
        className="text-4xl sm:text-5xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        The Code<GradientText> Behind the Coder</GradientText>
      </motion.h2>

      <motion.p
        className="max-w-3xl mx-auto text-center text-lg text-foreground/70"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        I&apos;m not just a developer. I&apos;m an architect of logic, a
        designer of experience, and a relentless problem-solver driven by
        passion.
      </motion.p>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 mb-16">
        <StatsCard
          icon={FaClock}
          value={3}
          label="Years Experience"
          suffix="+"
          delay={0.1}
        />
        <StatsCard
          icon={FaProjectDiagram}
          value={25}
          label="Projects Completed"
          suffix="+"
          delay={0.2}
        />
        <StatsCard
          icon={FaCode}
          value={150}
          label="Commits / Year"
          suffix="k+"
          delay={0.3}
        />
        <StatsCard
          icon={FaCoffee}
          value={1000}
          label="Coffee Consumed"
          suffix="+"
          delay={0.4}
        />
      </div>
       <CodingYearJourney/>
      <div className="flex justify-center mt-12 mb-12">
        <Link href="/about">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-primary/25 transition-all"
          >
            View Full Journey
          </motion.button>
        </Link>
      </div>
    </section>
  );
}
