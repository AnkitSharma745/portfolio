import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageTransition from "@/components/PageTransition";
import {
  capabilityDetailPageContent,
  type EngineeringCapability,
} from "@/content/skills/capabilities";

interface SkillCapabilityPageProps {
  capability: EngineeringCapability;
}

export default function SkillCapabilityPage({
  capability,
}: SkillCapabilityPageProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: capability.seo.title,
    description: capability.seo.description,
    keywords: capability.seo.keywords,
    about: capability.technologies,
  };

  return (
    <PageTransition>
      <main className="min-h-screen bg-background text-foreground relative overflow-hidden pt-24 pb-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <div className="container mx-auto px-6">
          <Breadcrumbs />
        </div>

        <article className="relative z-10 mx-auto max-w-5xl px-6">
          <header className="mb-12">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              {capabilityDetailPageContent.eyebrow}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-950 dark:text-white">
              {capability.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-foreground/70">
              {capability.overview}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {capability.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full bg-secondary/70 px-4 py-2 text-sm font-medium text-secondary-foreground ring-1 ring-border/80 dark:bg-white/5 dark:ring-white/10"
                >
                  {technology}
                </span>
              ))}
            </div>
          </header>

          <div className="grid gap-6 md:grid-cols-[1fr_0.85fr]">
            <section className="rounded-lg border border-border bg-card/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
              <h2 className="text-2xl font-bold">
                {capabilityDetailPageContent.sections.appliedIn}
              </h2>
              <ul className="mt-5 space-y-3">
                {capability.appliedIn.map((item) => (
                  <li key={item} className="flex gap-3 text-foreground/70">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <aside className="rounded-lg border border-primary/20 bg-primary/5 p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                {capabilityDetailPageContent.sections.confidence}
              </p>
              <p className="mt-3 text-2xl font-bold">
                {capability.confidenceLevel}
              </p>
              <p className="mt-4 text-sm leading-6 text-foreground/65">
                {capability.availability}
              </p>
            </aside>

            <section className="rounded-lg border border-border bg-card/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
              <h2 className="text-2xl font-bold">
                {capabilityDetailPageContent.sections.practices}
              </h2>
              <ul className="mt-5 space-y-3">
                {capability.practices.map((practice) => (
                  <li key={practice} className="flex gap-3 text-foreground/70">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{practice}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-lg border border-border bg-card/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
              <h2 className="text-2xl font-bold">
                {capabilityDetailPageContent.sections.lessons}
              </h2>
              <ul className="mt-5 space-y-3">
                {capability.lessons.map((lesson) => (
                  <li key={lesson} className="flex gap-3 text-foreground/70">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="mt-6 rounded-lg border border-border bg-card/70 p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
            <h2 className="text-2xl font-bold">
              {capabilityDetailPageContent.sections.artifacts}
            </h2>
            <p className="mt-4 leading-7 text-foreground/70">
              {capability.artifactNote}
            </p>
          </section>

          <footer className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/skills"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              {capabilityDetailPageContent.actions.viewAllCapabilities}
            </Link>
            <Link
              href="/projects"
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
            >
              {capabilityDetailPageContent.actions.seeProjectProof}
            </Link>
          </footer>
        </article>
      </main>
    </PageTransition>
  );
}
