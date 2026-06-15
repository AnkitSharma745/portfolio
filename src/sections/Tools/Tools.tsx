"use client";

import { motion } from "framer-motion";
import {
  TOOLS_DEV,
  TOOLS_PRODUCTIVITY,
  TOOLS_COMMUNICATION,
  TechItem,
} from "@/content/portfolio/skills";
import GradientText from "@/components/GradientText";

function ToolCard({ tool }: { tool: TechItem }) {
  return (
    <div className="group relative flex min-h-[120px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-border/50 bg-background/40 px-3 py-4 text-center shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:bg-background/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-primary/20 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-primary/40 dark:hover:bg-white/[0.05]">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-border/50 bg-gradient-to-b from-background to-background/50 text-3xl text-primary/80 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:border-primary/30 group-hover:text-primary dark:border-white/10 dark:from-white/10 dark:to-white/5 md:text-4xl">
        {tool.icon}
      </div>
      <span className="relative z-10 mt-3 text-sm font-bold tracking-wide text-foreground/70 transition-colors duration-300 group-hover:text-foreground">
        {tool.label}
      </span>
    </div>
  );
}

const ToolCategory = ({
  title,
  description,
  tools,
  delay,
}: {
  title: string;
  description?: string;
  tools: TechItem[];
  delay: number;
}) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay,
        ease: "easeOut",
      }}
      className="group/article relative overflow-hidden rounded-[2rem] border border-border/40 bg-background/40 p-6 shadow-lg backdrop-blur-md transition-all duration-500 hover:border-border/80 hover:shadow-xl dark:border-white/10 dark:bg-white/5 sm:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/article:opacity-100" />

      <div className="relative z-10 mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white md:text-3xl">
            {title}
          </h3>
          {description && (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/60 md:text-base">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {tools.map((tool, index) => (
          <ToolCard key={index} tool={tool} />
        ))}
      </div>
    </motion.article>
  );
};

export default function Tools() {
  return (
    <section
      id="tools"
      className="relative overflow-hidden bg-background transition-all duration-500"
    >
      <div className="mx-auto max-w-7xl space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-950 dark:text-white md:text-5xl">
            Tools <GradientText> I Use</GradientText>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-foreground/65 md:text-lg">
            The software and hardware that power my development workflow and
            productivity.
          </p>
        </motion.div>

        <div className="space-y-5">
          <ToolCategory 
            title="Development" 
            description="Code editors, IDEs, and version control systems to build robust software."
            tools={TOOLS_DEV} 
            delay={0.0} 
          />
          <ToolCategory
            title="Productivity"
            description="AI assistants and intelligent utilities that accelerate workflows."
            tools={TOOLS_PRODUCTIVITY}
            delay={0.1}
          />
          <ToolCategory
            title="Communication"
            description="Platforms for team collaboration, agile planning, and project tracking."
            tools={TOOLS_COMMUNICATION}
            delay={0.2}
          />
        </div>
      </div>
    </section>
  );
}
