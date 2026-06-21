"use client";

import { motion } from "framer-motion";
import { FaGithub, FaCheckCircle } from "react-icons/fa";
import GradientText from "@/components/GradientText";
import { SOLUTIONS_DATA } from "@/content/solutions/solutions";

export default function Solutions() {
  return (
    <section
      id="solutions"
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
            Custom <GradientText>Solutions</GradientText>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Custom tools and libraries I&apos;ve built to solve real-world
            problems and streamline development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SOLUTIONS_DATA.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col p-8 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-white/10 hover:dark:bg-white/10 hover:border-primary/50 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-primary/10 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary text-3xl group-hover:scale-110 transition-transform duration-300">
                  {solution.icon}
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {solution.title}
                </h3>
              </div>

              <p className="text-foreground/70 mb-6 flex-grow">
                {solution.description}
              </p>

              <div className="space-y-3 mb-8">
                {solution.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-sm text-foreground/60"
                  >
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-border/50 flex justify-between items-center">
                <div className="flex gap-2">
                  {solution.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={solution.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/50 hover:text-primary transition-colors"
                >
                  <FaGithub size={20} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
