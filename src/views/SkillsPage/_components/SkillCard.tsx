import Link from "next/link";
import { ArrowRight, BookOpen, CalendarClock } from "lucide-react";
import type {
  HomeSkillGroup,
  HomeSkillItem,
} from "@/content/skills/homeSkills";
import {
  getSkillCategorySlug,
  getSkillDetailHref,
  type SkillDetail,
} from "@/content/skills/skillDetails";

interface SkillCardProps {
  group: HomeSkillGroup;
  item: HomeSkillItem;
  detail: SkillDetail;
}

export default function SkillCard({
  group,
  item,
  detail,
}: SkillCardProps) {
  const categorySlug = getSkillCategorySlug(group);
  const firstPublishedArticle = detail.relatedArticles.find(
    (article) => article.status === "published",
  );
  const firstPlannedArticle = detail.relatedArticles.find(
    (article) => article.status === "planned",
  );

  return (
    <article className="group flex h-full w-full max-w-sm flex-col rounded-xl border border-border bg-card/80 p-4 shadow-sm backdrop-blur-sm transition hover:border-primary/40 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04] sm:p-5 md:max-w-none">
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-xl text-primary dark:border-white/10 sm:h-11 sm:w-11 sm:text-2xl">
            {item.icon}
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
              {item.label}
            </h3>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-foreground/45">
              {group.title}
            </p>
          </div>
        </div>

        <span className="rounded-md border border-primary/20 bg-primary/5 px-2 py-1 text-[11px] font-semibold text-primary sm:text-xs">
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
        className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:mx-auto sm:w-auto sm:min-w-48"
      >
        View implementation
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}
