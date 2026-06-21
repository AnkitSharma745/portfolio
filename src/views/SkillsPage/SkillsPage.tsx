"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Layers,
  Sparkles,
} from "lucide-react";
import {
  engineeringCapabilities,
  skillsOverviewPageContent,
} from "@/content/skills/capabilities";
import { homeSkillGroups } from "@/content/skills/homeSkills";
import CapabilityIcon from "./_components/CapabilityIcon";
import CategorySection from "./_components/CategorySection";

export default function SkillsPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <main className="relative min-h-screen bg-background px-6 pb-20 pt-24 text-foreground">
      <div className="mx-auto max-w-7xl">
        <motion.header
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mx-auto max-w-3xl py-8 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-primary">
            <Layers size={18} aria-hidden="true" />
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em]">
              {skillsOverviewPageContent.eyebrow}
            </p>
          </div>
          <h1 className="text-[26px] font-extrabold leading-tight tracking-tight text-gray-950 dark:text-white">
            {skillsOverviewPageContent.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-foreground/70 md:text-lg">
            {skillsOverviewPageContent.description}
          </p>
        </motion.header>

        <nav
          aria-label="Skill categories"
          className="sticky top-20 z-20 mt-4 overflow-x-auto rounded-lg border border-border bg-background/90 p-2 shadow-sm backdrop-blur-xl dark:border-white/10"
        >
          <div className="flex min-w-max gap-2">
            {homeSkillGroups.map((group) => (
              <Link
                key={group.id}
                href={`#${group.id}`}
                className="rounded-md px-4 py-2 text-sm font-semibold text-foreground/70 transition hover:bg-secondary hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                {group.title}
              </Link>
            ))}
          </div>
        </nav>

        <div className="mt-14 space-y-20">
          {homeSkillGroups.map((group, index) => (
            <CategorySection
              key={group.id}
              group={group}
              index={index}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>

        <section
          aria-labelledby="capability-notes-heading"
          className="mt-24 scroll-mt-28"
        >
          <div className="mb-6 flex items-end justify-between gap-4 border-b border-border pb-5 dark:border-white/10">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                Systems
              </p>
              <h2
                id="capability-notes-heading"
                className="text-3xl font-bold tracking-tight text-gray-950 dark:text-white md:text-4xl"
              >
                {skillsOverviewPageContent.sections.capabilities}
              </h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {engineeringCapabilities.map((capability) => (
              <Link
                key={capability.slug}
                href={`/skills/${capability.slug}`}
                className="group rounded-lg border border-border bg-card/75 p-5 shadow-sm transition hover:border-primary/40 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background text-xl text-primary dark:border-white/10">
                    <CapabilityIcon slug={capability.slug} />
                  </div>
                  <span className="rounded-md border border-border px-2 py-1 text-xs font-semibold text-foreground/60 dark:border-white/10">
                    {capability.confidenceLevel}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-foreground group-hover:text-primary">
                  {capability.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-foreground/68">
                  {capability.descriptor}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {capability.technologies.slice(0, 4).map((technology) => (
                    <span
                      key={technology}
                      className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="writing-pipeline-heading"
          className="mt-24 border-t border-border pt-8 dark:border-white/10"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-primary">
                <Sparkles size={18} aria-hidden="true" />
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em]">
                  {skillsOverviewPageContent.sections.writing}
                </p>
              </div>
              <h2
                id="writing-pipeline-heading"
                className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white md:text-3xl"
              >
                Published notes and scheduled deep dives
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-foreground/68">
                The writing map pairs finished articles with upcoming practical
                posts, so every skill can connect to either public proof or a
                clear editorial target.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
