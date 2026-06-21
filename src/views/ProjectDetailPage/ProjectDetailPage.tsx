"use client";

import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaGithub, FaExternalLinkAlt, FaRocket, FaCode, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/Breadcrumbs";
import FeatureTextPlaceholder from "@/components/FeatureTextPlaceholder";
import PageTransition from "@/components/PageTransition";
import GradientText from "@/components/GradientText";
import ParticlesBackground from "@/components/ParticlesBackground";
import { Project } from "@/content/projects/projects";

interface ProjectDetailPageProps {
  project: Project;
}

export default function ProjectDetailPage({ project }: ProjectDetailPageProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.title,
    "description": project.description,
    "applicationCategory": project.techStack.includes("Electron") ? "DesktopApplication" : "WebApplication",
    "operatingSystem": "Windows, macOS, Linux",
    "softwareRequirements": project.techStack.join(", "),
    "url": `https://ankitsharma745.github.io/projects/${project.slug}`,
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    }
  };

  return (
    <PageTransition>
      <main className="relative min-h-screen bg-background pb-16 pt-24 text-foreground sm:pb-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <div className="fixed inset-0 z-0 pointer-events-none">
          <ParticlesBackground id="project-detail-bg" />
        </div>

        <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <Breadcrumbs />

          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 sm:mb-8"
          >
            <Link
              href="/projects"
              className="group inline-flex min-h-10 items-center gap-2 text-sm text-foreground/60 transition-colors hover:text-primary sm:text-base"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Link>
          </motion.div>

          <article className="space-y-8 sm:space-y-12">
            {/* Main Header */}
            <header className="space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <FaRocket className="text-[10px]" /> Project Showcase
              </span>
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-6xl">
                <GradientText>{project.title}</GradientText>
              </h1>
              <p className="max-w-3xl text-base leading-7 text-foreground/75 sm:text-lg sm:leading-8 md:text-xl">
                {project.description}
              </p>
            </header>

            {/* Media Showcase */}
            <div className="relative w-full overflow-hidden rounded-2xl border border-black/5 bg-white/5 shadow-2xl backdrop-blur-sm dark:border-white/10">
              {project.image ? (
                <div className="relative h-[220px] w-full sm:h-[320px] md:h-[500px]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority
                    sizes="(max-width: 1000px) 100vw, 1000px"
                    className="object-cover"
                  />
                </div>
              ) : (
                <FeatureTextPlaceholder
                  title={project.title}
                  feature={project.bestFeature}
                  variant="detail"
                />
              )}
            </div>

            {/* Content Section */}
            <div className="grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-12">
              {/* Detailed Description (Spans 8 columns) */}
              <div className="space-y-6 sm:space-y-8 lg:col-span-8">
                <section className="rounded-2xl border border-border/40 bg-background/40 p-5 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:rounded-3xl sm:p-8">
                  <h2 className="mb-4 flex items-start gap-2 text-xl font-bold sm:items-center sm:text-2xl">
                    <FaCode className="text-primary" /> Overview & Implementation
                  </h2>
                  <p className="whitespace-pre-line text-sm leading-7 text-foreground/85 sm:text-base sm:leading-8">
                    {project.detailedDescription || project.description}
                  </p>
                </section>

                {project.bestFeature && (
                  <section className="rounded-2xl border border-border/40 bg-background/40 p-5 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:rounded-3xl sm:p-8">
                    <h2 className="mb-4 flex items-start gap-2 text-xl font-bold sm:items-center sm:text-2xl">
                      <FaStar className="text-accent" /> Key Highlight / Best Feature
                    </h2>
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 dark:bg-primary/10">
                      <p className="text-sm font-medium leading-7 text-foreground/90 sm:text-base">
                        {project.bestFeature}
                      </p>
                    </div>
                  </section>
                )}
              </div>

              {/* Sidebar: Details & Links (Spans 4 columns) */}
              <div className="space-y-5 sm:space-y-6 lg:col-span-4">
                {/* Tech Stack Card */}
                <div className="space-y-4 rounded-2xl border border-border/40 bg-background/40 p-5 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:rounded-3xl sm:p-6">
                  <h3 className="text-lg font-bold">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Links Card */}
                {(project.codeLink || project.liveLink) && (
                  <div className="space-y-4 rounded-2xl border border-border/40 bg-background/40 p-5 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:rounded-3xl sm:p-6">
                    <h3 className="text-lg font-bold">Project Resources</h3>
                    <div className="flex flex-col gap-3">
                      {project.codeLink && (
                        <a
                          href={project.codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-white/5 px-4 py-3 text-sm font-bold shadow-sm transition-all duration-300 hover:border-primary/50 hover:bg-neutral-50 dark:hover:bg-white/5"
                        >
                          <FaGithub /> View Source Code
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                        >
                          <FaExternalLinkAlt size={12} /> Live Platform Demo
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>
        </div>
      </main>
    </PageTransition>
  );
}
