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
      <main className="relative min-h-screen bg-background pb-20 pt-24 text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <div className="fixed inset-0 z-0 pointer-events-none">
          <ParticlesBackground id="project-detail-bg" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-5xl">
          <Breadcrumbs />

          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Link>
          </motion.div>

          <article className="space-y-12">
            {/* Main Header */}
            <header className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                <FaRocket className="text-[10px]" /> Project Showcase
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                <GradientText>{project.title}</GradientText>
              </h1>
              <p className="text-xl text-foreground/75 leading-relaxed max-w-3xl">
                {project.description}
              </p>
            </header>

            {/* Media Showcase */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-black/5 dark:border-white/10 bg-white/5 backdrop-blur-sm">
              {project.image ? (
                <div className="relative w-full h-[300px] md:h-[500px]">
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Detailed Description (Spans 8 columns) */}
              <div className="lg:col-span-8 space-y-8">
                <section className="rounded-3xl border border-border/40 bg-background/40 p-6 sm:p-8 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/5">
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <FaCode className="text-primary" /> Overview & Implementation
                  </h2>
                  <p className="text-foreground/85 text-base leading-8 whitespace-pre-line">
                    {project.detailedDescription || project.description}
                  </p>
                </section>

                {project.bestFeature && (
                  <section className="rounded-3xl border border-border/40 bg-background/40 p-6 sm:p-8 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/5">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                      <FaStar className="text-accent" /> Key Highlight / Best Feature
                    </h2>
                    <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 p-4 rounded-xl">
                      <p className="text-foreground/90 font-medium text-base">
                        {project.bestFeature}
                      </p>
                    </div>
                  </section>
                )}
              </div>

              {/* Sidebar: Details & Links (Spans 4 columns) */}
              <div className="lg:col-span-4 space-y-6">
                {/* Tech Stack Card */}
                <div className="rounded-3xl border border-border/40 bg-background/40 p-6 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/5 space-y-4">
                  <h3 className="text-lg font-bold">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground font-semibold shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Links Card */}
                {(project.codeLink || project.liveLink) && (
                  <div className="rounded-3xl border border-border/40 bg-background/40 p-6 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-white/5 space-y-4">
                    <h3 className="text-lg font-bold">Project Resources</h3>
                    <div className="flex flex-col gap-3">
                      {project.codeLink && (
                        <a
                          href={project.codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-white/5 hover:bg-neutral-50 dark:hover:bg-white/5 font-bold text-sm shadow-sm transition-all duration-300 hover:border-primary/50"
                        >
                          <FaGithub /> View Source Code
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25 font-bold text-sm shadow-sm transition-all duration-300"
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
