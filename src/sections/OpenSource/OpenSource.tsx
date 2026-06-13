"use client";

import { motion } from "framer-motion";
import {
  FaGithub,
  FaStar,
  FaCodeBranch,
  FaExternalLinkAlt,
} from "react-icons/fa";
import SectionDivider from "@/components/SectionDivider";
import GradientText from "@/components/GradientText";
import { OPEN_SOURCE_CONTRIBUTIONS } from "@/content/portfolio/openSource";
import Link from "next/link";

export default function OpenSource() {
  return (
    <section
      id="open-source"
      className="relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Open Source <GradientText>Contributions</GradientText>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Giving back to the community by contributing to the tools and
            libraries we all love.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {OPEN_SOURCE_CONTRIBUTIONS.map((contribution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 hover:border-primary/50 shadow-lg dark:shadow-none transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <FaGithub size={100} />
              </div>

              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary text-2xl">
                      {contribution.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {contribution.repoName}
                      </h3>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                        {contribution.contributionType}
                      </span>
                    </div>
                  </div>
                  <a
                    href={contribution.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/50 hover:text-primary transition-colors"
                  >
                    <FaExternalLinkAlt />
                  </a>
                </div>

                <p className="text-foreground/70">{contribution.description}</p>

                <div className="flex items-center gap-6 text-sm text-foreground/60">
                  <div className="flex items-center gap-2">
                    <FaStar className="text-yellow-500" />
                    <span>{contribution.stars.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCodeBranch className="text-blue-500" />
                    <span>{contribution.forks.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary"></span>
                    <span>{contribution.language}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/open-source">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-colors flex items-center gap-2"
            >
              <FaGithub />
              View All Contributions
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
