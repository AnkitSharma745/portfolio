"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaArrowRight,
} from "react-icons/fa";
import GradientText from "@/components/GradientText";
import FeatureTextPlaceholder from "@/components/FeatureTextPlaceholder";
import { PROJECTS_DATA } from "@/content/projects/projects";
import Link from "next/link";

export default function Projects() {
  // Select the first 3 projects for homepage display
  const homepageProjects = PROJECTS_DATA.slice(0, 3);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-background px-4 py-16 text-foreground transition-all duration-500 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl space-y-10 sm:space-y-14 lg:space-y-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4 text-center"
        >
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Top <GradientText>Projects</GradientText>
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-foreground/60 md:text-base">
            A selection of real-world applications and personal projects I&apos;ve engineered.
          </p>
        </motion.div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
          {homepageProjects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group relative flex w-full max-w-sm flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-lg transition-all duration-500 hover:border-primary/50 hover:shadow-xl dark:border-white/10 dark:bg-neutral-900/40 dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] dark:hover:border-primary/50 dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] md:max-w-none"
            >
              {/* Image Container */}
              <div className="relative h-44 w-full overflow-hidden border-b border-neutral-200 bg-neutral-100 dark:border-white/10 dark:bg-neutral-950 sm:h-52">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <FeatureTextPlaceholder title={project.title} feature={project.bestFeature} />
                )}
              </div>

              {/* Card Body */}
              <div className="flex flex-grow flex-col justify-between p-4 sm:p-5 lg:p-6">
                <div>
                  {/* Project Title */}
                  <Link href={`/projects/${project.slug}`}>
                    <h3 className="mb-2 text-base font-bold leading-snug text-neutral-900 transition-colors duration-300 group-hover:text-primary dark:text-white dark:group-hover:text-cyan-400 sm:text-lg">
                      {project.title}
                    </h3>
                  </Link>
                  
                  {/* Project Description */}
                  <p className="mb-5 line-clamp-3 text-xs leading-6 text-neutral-600 dark:text-neutral-400 sm:text-sm">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech stack pill tags */}
                  <div className="mb-5 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-neutral-100 dark:bg-white/5 border border-neutral-200/60 dark:border-white/5 text-neutral-700 dark:text-neutral-300 shadow-sm dark:shadow-none"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Call-to-actions */}
                  <div className="flex items-center gap-3 border-t border-neutral-100 pt-4 dark:border-white/5">
                    {project.codeLink && (
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-grow flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-neutral-200 dark:border-white/10 bg-white/5 hover:bg-neutral-50 dark:hover:bg-white/5 text-neutral-700 dark:text-neutral-300 transition-all duration-300 hover:border-primary/30"
                      >
                        <FaGithub size={13} />
                        <span>Code</span>
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-grow flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                      >
                        <FaExternalLinkAlt size={11} />
                        <span>Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Action Link */}
        <div className="flex justify-center pt-2 sm:pt-4">
          <Link href="/projects">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex min-h-11 w-full max-w-xs cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-opacity hover:opacity-95 sm:w-auto sm:px-8"
            >
              View All Projects <FaArrowRight />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
