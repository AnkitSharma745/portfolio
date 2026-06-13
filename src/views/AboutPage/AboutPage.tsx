"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { FaArrowLeft, FaDownload } from "react-icons/fa";
import Link from "next/link";
import GradientText from "@/components/GradientText";
import CodingYearJourney from "@/components/CodingJourney/CodingYearJourney";
import ParticlesBackground from "@/components/ParticlesBackground";
import StatsCard from "@/components/StatsCard";
import { ABOUT_CONTENT } from "@/content/portfolio/about";
import { onDownloadResume } from "@/lib/utils/download";

export default function AboutPage() {
  const handleDownloadResume = () => {
    onDownloadResume();
  };

  return (
    <PageTransition>
      <main className="min-h-screen bg-background text-foreground relative overflow-hidden pt-24 pb-10">
        <div className="container mx-auto px-6">
          <Breadcrumbs />
        </div>
        <div className="fixed inset-0 z-0 pointer-events-none">
          <ParticlesBackground />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </motion.div>

          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              About Me <GradientText>Me</GradientText>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-foreground/70 leading-relaxed"
            >
              {ABOUT_CONTENT.summary}
            </motion.p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
            {ABOUT_CONTENT.stats.map((stat, index) => (
              <StatsCard
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                suffix={stat.suffix}
                delay={stat.delay}
              />
            ))}
          </div>

          {/* Roles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {ABOUT_CONTENT.roles.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 hover:border-primary/50 hover:bg-black/5 hover:dark:bg-white/10 shadow-lg dark:shadow-none transition-all duration-300 text-center group"
              >
                <div className="text-5xl mb-6 text-primary group-hover:scale-110 transition-transform duration-300 inline-block">
                  {role.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{role.title}</h3>
                <p className="text-foreground/70">{role.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Skills Visualization */}
          <div className="mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Core <GradientText>Skills</GradientText>
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {ABOUT_CONTENT.coreSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">{skill.name}</span>
                    <span className="text-primary font-bold">
                      {skill.level}%
                    </span>
                  </div>
                  <div
                    className="h-3 rounded-full overflow-hidden bg-black/5 dark:bg-white/10"
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-primary via-cyan-400 to-accent rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Key <GradientText>Achievements</GradientText>
            </h2>
          </div>

          {/* Full Journey */}
          <div className="mb-20">
            <CodingYearJourney />
          </div>

          {/* Download Resume & CTA */}
          <div className="text-center pb-20">
            <h3 className="text-2xl font-bold mb-6">Want to know more?</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                onClick={handleDownloadResume}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2"
              >
                <FaDownload />
                Download Resume
              </motion.button>
              <Link href="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full font-medium transition-all border border-black/20 dark:border-white/20 hover:bg-black/5 hover:dark:bg-white/10"
                >
                  Explore Projects
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
