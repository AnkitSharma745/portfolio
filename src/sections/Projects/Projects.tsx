"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaYoutube,
  FaArrowRight,
} from "react-icons/fa";
import SectionDivider from "@/components/SectionDivider";
import GradientText from "@/components/GradientText";
import { PROJECTS_DATA } from "@/content/portfolio/projects";
import Link from "next/link";

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-20 px-6 md:px-16 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Featured <GradientText>Projects</GradientText>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            A selection of real-world applications and personal projects
            I&apos;ve engineered.
          </p>
        </motion.div>

        <div className="space-y-24">
          {PROJECTS_DATA.map((company, companyIndex) => (
            <div key={companyIndex} className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 border-b border-border/50 pb-4"
              >
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  {company.companyName}
                </h3>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {company.role}
                </span>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {company.projects.map((project, projectIndex) => (
                  <motion.div
                    key={projectIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: projectIndex * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="group rounded-xl overflow-hidden border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 hover:border-primary/50 hover:shadow-2xl dark:hover:shadow-primary/10 hover:shadow-primary/10 transition-all duration-300 flex flex-col"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                        <div className="flex gap-3">
                          {project.codeLink && (
                            <a
                              href={project.codeLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-colors"
                              title="View Code"
                            >
                              <FaGithub size={18} />
                            </a>
                          )}
                          {project.liveLink && (
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-colors"
                              title="Live Demo"
                            >
                              <FaExternalLinkAlt size={18} />
                            </a>
                          )}
                          {project.demoVideo && (
                            <a
                              href={project.demoVideo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-colors"
                              title="Watch Demo"
                            >
                              <FaYoutube size={18} />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-foreground/70 text-sm mb-4 flex-grow">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-8">
          <Link href="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-primary/25"
            >
              View All Projects <FaArrowRight />
            </motion.button>
          </Link>
        </div>
      </div>

      <SectionDivider />
    </section>
  );
}
