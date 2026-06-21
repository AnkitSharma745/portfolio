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
        className="m-auto mt-5 inline-flex w-2/3 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      >
        View implementation
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}
