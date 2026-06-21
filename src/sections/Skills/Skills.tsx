"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  homeSkillGroups,
  homeSkillsContent,
} from "@/content/skills/homeSkills";
import GradientText from "@/components/GradientText";
import SkillGroup from "./_components/SkillGroup";

export default function Skills() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative overflow-hidden bg-background px-4 py-16 transition-all duration-500 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mb-8 max-w-3xl text-center sm:mb-10"
        >
          <h2
            id="skills-heading"
            className="text-3xl font-extrabold leading-tight tracking-tight text-gray-950 dark:text-white sm:text-4xl md:text-5xl"
          >
            {homeSkillsContent.title.beforeHighlight}{" "}
            <GradientText> {homeSkillsContent.title.highlighted}</GradientText>
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-foreground/65 sm:text-base md:text-lg">
            {homeSkillsContent.description}
          </p>
        </motion.div>

        <div className="space-y-4 sm:space-y-5">
          {homeSkillGroups.map((group, index) => (
            <SkillGroup
              key={group.id}
              group={group}
              index={index}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <Link
            href="/skills"
            className="inline-flex min-h-11 w-full max-w-xs items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:w-auto sm:text-base"
          >
            {homeSkillsContent.primaryExploreLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
