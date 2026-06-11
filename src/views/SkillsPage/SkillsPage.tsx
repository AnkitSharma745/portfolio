"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaLaptopCode,
  FaServer,
  FaDesktop,
  FaLayerGroup,
  FaRobot,
  FaCogs,
  FaTerminal
} from "react-icons/fa";
import ParticlesBackground from "@/components/ParticlesBackground";
import {
  engineeringCapabilities,
  skillsOverviewPageContent,
} from "@/content/skills/capabilities";

const getIconForCapability = (slug: string) => {
  switch (slug) {
    case "frontend-systems":
      return <FaLaptopCode />;
    case "backend-systems":
      return <FaServer />;
    case "desktop-applications":
      return <FaDesktop />;
    case "product-engineering":
      return <FaLayerGroup />;
    case "ai-augmented-development":
      return <FaRobot />;
    case "automation-platforms":
      return <FaCogs />;
    default:
      return <FaTerminal />;
  }
};

export default function SkillsPage() {
  return (
    <main className="relative min-h-screen bg-background px-6 pb-16 pt-24 text-foreground">
      <div className="fixed inset-0 z-0">
        <ParticlesBackground />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-2 text-primary">
            <FaTerminal className="text-xl" />
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em]">
              {skillsOverviewPageContent.eyebrow}
            </p>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-950 dark:text-white md:text-5xl lg:text-6xl">
            {skillsOverviewPageContent.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-foreground/70">
            {skillsOverviewPageContent.description}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {engineeringCapabilities.map((capability, index) => (
            <motion.div
              key={capability.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/40 bg-background/40 p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:bg-background/60 hover:shadow-[0_8px_30px_rgba(var(--primary),0.15)] dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-primary/40 dark:hover:bg-white/[0.05]"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/5 blur-[50px] transition-all duration-500 group-hover:bg-primary/20" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-accent/5 blur-[50px] transition-all duration-500 group-hover:bg-accent/10" />

              <div className="relative z-10 mb-6 flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-2xl text-primary shadow-inner transition-all group-hover:scale-110 group-hover:border-primary/40 group-hover:bg-primary/20">
                  {getIconForCapability(capability.slug)}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary">
                    {capability.confidenceLevel}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-foreground/50">
                    Status
                  </span>
                </div>
              </div>

              <div className="relative z-10 mb-4 grow">
                <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {capability.title}
                </h2>
                <p className="text-sm leading-relaxed text-foreground/70">
                  {capability.descriptor}
                </p>
              </div>

              <div className="relative z-10 mt-auto space-y-5">
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <div className="h-px grow bg-border/50 dark:bg-white/10" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/50">
                      Tech Stack
                    </span>
                    <div className="h-px grow bg-border/50 dark:bg-white/10" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {capability.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border/50 bg-background/50 px-2.5 py-1 font-mono text-xs font-medium text-foreground/80 backdrop-blur-sm transition-colors group-hover:border-border group-hover:text-foreground dark:border-white/10 dark:bg-white/5 dark:group-hover:border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/skills/${capability.slug}`}
                  className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm font-semibold text-primary transition-all hover:border-primary/50 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {capability.exploreLabel}
                    <FaArrowRight className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
