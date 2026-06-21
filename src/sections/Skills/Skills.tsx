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
