"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import {
  homeSkillGroups,
  homeSkillsContent,
  type HomeSkillGroup,
  type HomeSkillItem,
} from "@/content/skills/homeSkills";
import GradientText from "@/components/GradientText";

function SkillCard({ skill }: { skill: HomeSkillItem }) {
  return (
    <div className="group relative flex min-h-[120px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-border/50 bg-background/40 px-3 py-4 text-center shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/50 hover:bg-background/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-primary/20 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-primary/40 dark:hover:bg-white/[0.05]">
      <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-border/50 bg-gradient-to-b from-background to-background/50 text-3xl text-primary/80 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:border-primary/30 group-hover:text-primary dark:border-white/10 dark:from-white/10 dark:to-white/5 md:text-4xl">
        {skill.icon}
      </div>
      <span className="relative z-10 mt-3 text-sm font-bold tracking-wide text-foreground/70 transition-colors duration-300 group-hover:text-foreground">
        {skill.label}
      </span>
    </div>
  );
}

function SkillGroup({
  group,
  index,
  shouldReduceMotion,
}: {
  group: HomeSkillGroup;
  index: number;
  shouldReduceMotion: boolean | null;
}) {
  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: shouldReduceMotion ? 0 : index * 0.1,
        ease: "easeOut",
      }}
      className="group/article relative overflow-hidden rounded-[2rem] border border-border/40 bg-background/40 p-6 shadow-lg backdrop-blur-md transition-all duration-500 hover:border-border/80 hover:shadow-xl dark:border-white/10 dark:bg-white/5 sm:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/article:opacity-100" />

      <div className="relative z-10 mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white md:text-3xl">
            {group.title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/60 md:text-base">
            {group.description}
          </p>
        </div>

        {group.capabilitySlug ? (
          <div className="group/btn relative mt-2 sm:mt-0">
            <Link
              href={`/skills/${group.capabilitySlug}`}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-semibold text-primary outline-none backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(var(--primary),0.15)] focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              {homeSkillsContent.detailLinkLabel}
              <FaArrowRight
                aria-hidden="true"
                className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </Link>
            {/* Tooltip */}
            <div className="pointer-events-none absolute -top-12 left-1/2 z-20 w-max -translate-x-1/2 translate-y-2 rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background opacity-0 shadow-lg transition-all duration-300 group-hover/btn:translate-y-0 group-hover/btn:opacity-100">
              Explore all the tech stack
              <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-foreground"></div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {group.items.map((skill) => (
          <SkillCard key={skill.label} skill={skill} />
        ))}
      </div>
    </motion.article>
  );
}

export default function Skills() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative min-h-screen overflow-hidden bg-background transition-all duration-500"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <h2
            id="skills-heading"
            className="text-4xl font-extrabold tracking-tight text-gray-950 dark:text-white md:text-5xl"
          >
            {homeSkillsContent.title.beforeHighlight}{" "}
            <GradientText> {homeSkillsContent.title.highlighted}</GradientText>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground/65 md:text-lg">
            {homeSkillsContent.description}
          </p>
        </motion.div>

        <div className="space-y-5">
          {homeSkillGroups.map((group, index) => (
            <SkillGroup
              key={group.id}
              group={group}
              index={index}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/skills"
            className="rounded-full bg-primary px-8 py-3 font-medium text-primary-foreground shadow-lg transition-all hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            {homeSkillsContent.primaryExploreLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
