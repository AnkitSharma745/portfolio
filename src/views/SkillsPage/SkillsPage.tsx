"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  Layers,
  Route,
  Sparkles,
} from "lucide-react";
import {
  FaCogs,
  FaDesktop,
  FaLayerGroup,
  FaLaptopCode,
  FaRobot,
  FaServer,
  FaTerminal,
} from "react-icons/fa";
import {
  engineeringCapabilities,
  skillsOverviewPageContent,
} from "@/content/skills/capabilities";
import {
  homeSkillGroups,
  type HomeSkillGroup,
  type HomeSkillItem,
} from "@/content/skills/homeSkills";
import {
  getSkillCategorySlug,
  getSkillDetailByRoute,
  getSkillDetailHref,
  getSkillsForGroup,
  type SkillDetail,
} from "@/content/skills/skillDetails";

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
    case "cloud-devops-delivery":
      return <Route size={22} />;
    default:
      return <FaTerminal />;
  }
};

function SkillCard({
  group,
  item,
  detail,
}: {
  group: HomeSkillGroup;
  item: HomeSkillItem;
  detail: SkillDetail;
}) {
  const categorySlug = getSkillCategorySlug(group);
  const firstPublishedArticle = detail.relatedArticles.find(
    (article) => article.status === "published",
  );
  const firstPlannedArticle = detail.relatedArticles.find(
    (article) => article.status === "planned",
  );

  return (
    <article className="group flex h-full flex-col rounded-lg border border-border bg-card/80 p-5 shadow-sm backdrop-blur-sm transition hover:border-primary/40 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-2xl text-primary dark:border-white/10">
            {item.icon}
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold tracking-tight text-foreground">
              {item.label}
            </h3>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-foreground/45">
              {group.title}
            </p>
          </div>
        </div>

        <span className="rounded-md border border-primary/20 bg-primary/5 px-2 py-1 text-xs font-semibold text-primary">
          Mapped
        </span>
      </div>

      <p className="mt-4 grow text-sm leading-6 text-foreground/68">
        {detail.shortDescription}
      </p>

      <div className="mt-5 space-y-2 border-t border-border/70 pt-4 text-sm dark:border-white/10">
        {firstPublishedArticle?.status === "published" ? (
          <Link
            href={`/blog/${firstPublishedArticle.slug}`}
            className="flex items-start gap-2 text-foreground/70 transition hover:text-primary"
          >
            <BookOpen
              size={16}
              className="mt-0.5 shrink-0"
              aria-hidden="true"
            />
            <span>{firstPublishedArticle.title}</span>
          </Link>
        ) : null}

        {firstPlannedArticle?.status === "planned" ? (
          <Link
            href={`/blog/${firstPlannedArticle.slug}`}
            className="flex items-start gap-2 text-foreground/62 transition hover:text-primary"
          >
            <CalendarClock
              size={16}
              className="mt-0.5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <span>
              {firstPlannedArticle.title} - {firstPlannedArticle.targetDate}
            </span>
          </Link>
        ) : null}
      </div>

      <Link
        href={getSkillDetailHref(categorySlug, item.slug)}
        className=" m-auto mt-5 inline-flex w-2/3  items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        View implementation
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}

function CategorySection({
  group,
  index,
  shouldReduceMotion,
}: {
  group: HomeSkillGroup;
  index: number;
  shouldReduceMotion: boolean | null;
}) {
  const categorySlug = getSkillCategorySlug(group);

  return (
    <motion.section
      id={group.id}
      aria-labelledby={`${group.id}-heading`}
      className="scroll-mt-28"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{
        duration: 0.45,
        delay: shouldReduceMotion ? 0 : index * 0.06,
        ease: "easeOut",
      }}
    >
      <div className="mb-6 flex flex-col gap-4 border-b border-border pb-5 dark:border-white/10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            {group.id}
          </p>
          <h2
            id={`${group.id}-heading`}
            className="text-3xl font-bold tracking-tight text-gray-950 dark:text-white md:text-4xl"
          >
            {group.title}
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-foreground/68">
            {group.description}
          </p>
        </div>

        <Link
          href={`/skills/${categorySlug}`}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background dark:border-white/10"
        >
          Capability note
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
                    {getIconForCapability(capability.slug)}
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
