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
      className="relative overflow-hidden py-16 md:py-24 bg-background text-foreground transition-all duration-500"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Top <GradientText>Projects</GradientText>
          </h2>
          <p className="text-sm md:text-base text-foreground/60 max-w-2xl mx-auto">
            A selection of real-world applications and personal projects I&apos;ve engineered.
          </p>
        </motion.div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {homepageProjects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="group flex flex-col justify-between overflow-hidden rounded-[2rem] border border-neutral-200 dark:border-white/10 bg-white dark:bg-neutral-900/40 shadow-lg dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-xl dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-500 relative"
            >
              {/* Image Container */}
              <div className="relative h-52 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-950 border-b border-neutral-200 dark:border-white/10">
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
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  {/* Project Title */}
                  <Link href={`/projects/${project.slug}`}>
                    <h3 className="text-lg font-bold mb-2 text-neutral-900 dark:text-white group-hover:text-primary dark:group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                  </Link>
                  
                  {/* Project Description */}
                  <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm mb-5 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tech stack pill tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
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
                  <div className="flex items-center gap-3 pt-4 border-t border-neutral-100 dark:border-white/5">
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
        <div className="flex justify-center pt-4">
          <Link href="/projects">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:opacity-95 transition-opacity flex items-center gap-2 shadow-lg shadow-primary/20 cursor-pointer"
            >
              View All Projects <FaArrowRight />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
