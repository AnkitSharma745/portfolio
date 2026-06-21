import Link from "next/link";
import { ArrowRight, BookOpen, CalendarClock } from "lucide-react";
import type { SkillArticle } from "@/content/skills/skillDetails";

interface RelatedArticleCardProps {
  article: SkillArticle;
}

export default function RelatedArticleCard({
  article,
}: RelatedArticleCardProps) {
  if (article.status === "published") {
    return (
      <Link
        href={`/blog/${article.slug}`}
        className="group rounded-lg border border-border bg-card/80 p-5 shadow-sm transition hover:border-primary/40 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04]"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            <BookOpen size={14} aria-hidden="true" />
            Published
          </span>
          <ArrowRight
            size={16}
            className="text-foreground/40 transition group-hover:translate-x-1 group-hover:text-primary"
            aria-hidden="true"
          />
        </div>
        <h3 className="text-lg font-bold tracking-tight text-foreground">
          {article.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-foreground/68">
          {article.description}
        </p>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="block rounded-lg border border-dashed border-primary/35 bg-primary/5 p-5 transition hover:border-primary/60 hover:bg-primary/10"
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-md bg-background px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-primary/20">
        <CalendarClock size={14} aria-hidden="true" />
        Publishing target: {article.targetDate}
      </div>
      <h3 className="text-lg font-bold tracking-tight text-foreground">
        {article.title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-foreground/68">
        {article.description}
      </p>
    </Link>
  );
}
