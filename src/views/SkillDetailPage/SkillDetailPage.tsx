import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Route,
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageTransition from "@/components/PageTransition";
import {
  getSkillDetailHref,
  type SkillDetail,
} from "@/content/skills/skillDetails";
import RelatedArticleCard from "./_components/RelatedArticleCard";
import SkillIcon from "./_components/SkillIcon";

interface SkillDetailPageProps {
  skill: SkillDetail;
}

export default function SkillDetailPage({ skill }: SkillDetailPageProps) {
  const skillHref = getSkillDetailHref(skill.categorySlug, skill.skillSlug);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: skill.seo.title,
    description: skill.seo.description,
    keywords: skill.seo.keywords,
    url: `https://ankitsharma745.github.io${skillHref}`,
    about: [skill.label, skill.categoryTitle],
    articleSection: skill.categoryTitle,
  };

  return (
    <PageTransition>
      <main className="relative min-h-screen bg-background pb-16 pt-24 text-foreground sm:pb-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Breadcrumbs />

          <article className="mx-auto max-w-5xl">
            <header className="py-8 sm:py-10">
              <Link
                href={`/skills#${skill.categoryId}`}
                className="mb-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground/70 transition hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background dark:border-white/10 sm:mb-8 sm:w-fit"
              >
                <Route size={16} aria-hidden="true" />
                {skill.categoryTitle}
              </Link>

              <div className="flex flex-col gap-5 sm:gap-6 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary sm:text-sm">
                    Skill detail
                  </p>
                  <h1 className="max-w-4xl text-3xl font-extrabold tracking-tight text-gray-950 dark:text-white sm:text-4xl md:text-6xl">
                    {skill.pageTitle}
                  </h1>
                  <p className="mt-5 max-w-3xl text-base leading-7 text-foreground/70 sm:mt-6 sm:text-lg sm:leading-8">
                    {skill.shortDescription}
                  </p>
                </div>

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-3xl text-primary shadow-sm dark:border-white/10 dark:bg-white/[0.04] sm:h-16 sm:w-16 sm:text-4xl">
                  <SkillIcon skill={skill} />
                </div>
              </div>
            </header>

            <section
              aria-labelledby="implementation-heading"
              className="border-t border-border py-8 dark:border-white/10 sm:py-10"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary sm:text-sm">
                Implementation
              </p>
              <h2
                id="implementation-heading"
                className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-3xl"
              >
                How this is applied
              </h2>
              <p className="mt-5 text-base leading-7 text-foreground/72 sm:text-lg sm:leading-8">
                {skill.implementationFocus}
              </p>
            </section>

            <div className="grid gap-8 border-t border-border py-8 dark:border-white/10 sm:gap-10 sm:py-10 lg:grid-cols-2">
              <section aria-labelledby="used-in-heading">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary sm:text-sm">
                  Usage
                </p>
                <h2
                  id="used-in-heading"
                  className="text-xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-2xl"
                >
                  Where it shows up
                </h2>
                <ul className="mt-5 space-y-4">
                  {skill.usedIn.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-foreground/70 sm:text-base">
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="practice-heading">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary sm:text-sm">
                  Practice
                </p>
                <h2
                  id="practice-heading"
                  className="text-xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-2xl"
                >
                  Professional usage rules
                </h2>
                <ul className="mt-5 space-y-4">
                  {skill.practices.map((practice) => (
                    <li
                      key={practice}
                      className="flex gap-3 text-sm leading-6 text-foreground/70 sm:text-base"
                    >
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      <span>{practice}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <section
              aria-labelledby="related-writing-heading"
              className="border-t border-border py-8 dark:border-white/10 sm:py-10"
            >
              <div className="mb-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary sm:text-sm">
                  Writing
                </p>
                <h2
                  id="related-writing-heading"
                  className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-3xl"
                >
                  Related articles and planned notes
                </h2>
              </div>

              <div className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 md:justify-items-stretch">
                {skill.relatedArticles.map((article) => (
                  <RelatedArticleCard
                    key={
                      article.status === "published"
                        ? article.slug
                        : article.title
                    }
                    article={article}
                  />
                ))}
              </div>
            </section>

            <section
              aria-labelledby="proof-heading"
              className="border-t border-border py-8 dark:border-white/10 sm:py-10"
            >
              <div className="mb-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary sm:text-sm">
                  Proof
                </p>
                <h2
                  id="proof-heading"
                  className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-3xl"
                >
                  Connected routes
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-foreground/68">
                  {skill.statusNote}
                </p>
              </div>

              <div className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-2 md:justify-items-stretch">
                {skill.proofLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group w-full max-w-sm rounded-xl border border-border bg-card/80 p-4 shadow-sm transition hover:border-primary/40 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.04] sm:p-5 md:max-w-none"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                          {link.type}
                        </p>
                        <h3 className="mt-2 text-base font-bold tracking-tight text-foreground sm:text-lg">
                          {link.label}
                        </h3>
                      </div>
                      <ArrowRight
                        size={17}
                        className="text-foreground/40 transition group-hover:translate-x-1 group-hover:text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-foreground/68">
                      {link.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          </article>
        </div>
      </main>
    </PageTransition>
  );
}
