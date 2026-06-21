import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import {
  homeSkillsContent,
  type HomeSkillGroup,
} from "@/content/skills/homeSkills";
import SkillCard from "./SkillCard";

interface SkillGroupProps {
  group: HomeSkillGroup;
  index: number;
  shouldReduceMotion: boolean | null;
}

export default function SkillGroup({
  group,
  index,
  shouldReduceMotion,
}: SkillGroupProps) {
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
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary/80">
            {homeSkillsContent.additionalSkillsLabel}
          </p>
        </div>

        <Link
          href={`/skills#${group.id}`}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-semibold text-primary outline-none backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          {homeSkillsContent.detailLinkLabel}
          <FaArrowRight
            aria-hidden="true"
            className="text-xs transition-transform duration-300 group-hover/article:translate-x-1"
          />
        </Link>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {group.items.map((skill) => (
          <SkillCard key={skill.label} skill={skill} />
        ))}
      </div>
    </motion.article>
  );
}
