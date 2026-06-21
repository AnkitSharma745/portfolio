import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { HomeSkillGroup } from "@/content/skills/homeSkills";
import {
  getSkillCategorySlug,
  getSkillDetailByRoute,
  getSkillsForGroup,
} from "@/content/skills/skillDetails";
import SkillCard from "./SkillCard";

interface CategorySectionProps {
  group: HomeSkillGroup;
  index: number;
  shouldReduceMotion: boolean | null;
}

export default function CategorySection({
  group,
  index,
  shouldReduceMotion,
}: CategorySectionProps) {
  const categorySlug = getSkillCategorySlug(group);

  return (
    <motion.section
      id={group.id}
      aria-labelledby={`${group.id}-heading`}
      className="scroll-mt-24 sm:scroll-mt-28"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{
        duration: 0.45,
        delay: shouldReduceMotion ? 0 : index * 0.06,
        ease: "easeOut",
      }}
    >
      <div className="mb-5 flex flex-col gap-4 border-b border-border pb-5 dark:border-white/10 sm:mb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary sm:text-sm">
            {group.id}
          </p>
          <h2
            id={`${group.id}-heading`}
            className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-3xl md:text-4xl"
          >
            {group.title}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-foreground/68 sm:text-base sm:leading-7">
            {group.description}
          </p>
        </div>

        <Link
          href={`/skills/${categorySlug}`}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background dark:border-white/10 sm:w-fit"
        >
          Capability note
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>

      <div className="grid grid-cols-1 justify-items-center gap-4 sm:gap-5 md:grid-cols-2 md:justify-items-stretch xl:grid-cols-3">
        {getSkillsForGroup(group).map((item) => {
          const detail = getSkillDetailByRoute(categorySlug, item.slug);

          if (!detail) return null;

          return (
            <SkillCard
              key={`${categorySlug}-${item.slug}`}
              group={group}
              item={item}
              detail={detail}
            />
          );
        })}
      </div>
    </motion.section>
  );
}
