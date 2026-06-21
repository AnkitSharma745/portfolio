import { motion } from "framer-motion";
import type { TechItem } from "@/content/skills/tools";
import ToolCard from "./ToolCard";

interface ToolCategoryProps {
  title: string;
  description?: string;
  tools: TechItem[];
  delay: number;
}

export default function ToolCategory({
  title,
  description,
  tools,
  delay,
}: ToolCategoryProps) {
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
      className="group/article relative overflow-hidden rounded-2xl border border-border/40 bg-background/40 p-4 shadow-lg backdrop-blur-md transition-all duration-500 hover:border-border/80 hover:shadow-xl dark:border-white/10 dark:bg-white/5 sm:rounded-[2rem] sm:p-6 lg:p-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/article:opacity-100" />

      <div className="relative z-10 mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-2xl md:text-3xl">
            {title}
          </h3>
          {description && (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground/60 md:text-base md:leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-[repeat(auto-fit,minmax(128px,1fr))] gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {tools.map((tool) => (
          <ToolCard key={tool.label} tool={tool} />
        ))}
      </div>
    </motion.article>
  );
}
