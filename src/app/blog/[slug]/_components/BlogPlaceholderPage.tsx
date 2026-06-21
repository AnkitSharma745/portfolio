import Link from "next/link";
import { FaArrowLeft, FaPenNib } from "react-icons/fa";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageTransition from "@/components/PageTransition";
import { getPlannedSkillArticleBySlug } from "@/content/skills/skillDetails";
import { formatFallbackTitle } from "../utils";

interface BlogPlaceholderPageProps {
  slug: string;
}

export default function BlogPlaceholderPage({
  slug,
}: BlogPlaceholderPageProps) {
  const plannedPost = getPlannedSkillArticleBySlug(slug);
  const title = plannedPost?.title ?? formatFallbackTitle(slug);
  const description =
    plannedPost?.description ??
    "This technical write-up is being prepared. The page is available now so shared links stay useful while the implementation notes are being finished.";
  const targetDate =
    plannedPost?.targetDate ?? "Publishing schedule coming soon";

  return (
    <PageTransition>
      <main className="relative min-h-screen bg-background pb-16 pt-24 text-foreground sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <Breadcrumbs />
        </div>

        <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
          <Link
            href="/blog"
            className="mb-6 inline-flex min-h-10 items-center gap-2 text-sm text-foreground/60 transition hover:text-primary sm:mb-8 sm:text-base"
          >
            <FaArrowLeft aria-hidden="true" />
            Back to Blog
          </Link>

          <div className="rounded-xl border border-border bg-card/80 p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.04] sm:p-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-primary">
              <FaPenNib aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                Write-up in progress
              </span>
            </div>

            <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-gray-950 dark:text-white sm:text-3xl md:text-4xl">
              {title}
            </h1>
            <p className="mt-5 text-sm leading-7 text-foreground/70 sm:text-base">
              {description}
            </p>

            <div className="mt-6 rounded-lg border border-border bg-background/70 p-4 dark:border-white/10 dark:bg-black/20 sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary sm:text-sm">
                Status
              </p>
              <p className="mt-2 text-base font-bold text-foreground sm:text-lg">
                {targetDate}
              </p>
              <p className="mt-2 text-sm leading-6 text-foreground/62">
                Public implementation notes will appear here once the article is
                ready. Until then, this page keeps the route shareable and
                avoids a broken reading path.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/skills"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                Explore skills
              </Link>
              <Link
                href="/blog"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background dark:border-white/10"
              >
                View published posts
              </Link>
            </div>
          </div>
        </article>
      </main>
    </PageTransition>
  );
}
