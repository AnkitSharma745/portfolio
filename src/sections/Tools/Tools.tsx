"use client";

import { motion } from "framer-motion";
import SectionDivider from "@/components/SectionDivider";
import GradientText from "@/components/GradientText";
import {
  TOOLS_DEV,
  TOOLS_PRODUCTIVITY,
  TOOLS_COMMUNICATION,
  TechItem,
} from "@/content/portfolio/skills";

const ToolCategory = ({
  title,
  tools,
  delay,
}: {
  title: string;
  tools: TechItem[];
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col gap-6"
    >
      <h3 className="text-2xl font-bold text-center md:text-left">
        <span className="bg-gradient-to-r from-primary/80 to-accent/80 bg-clip-text text-transparent">
          {title}
        </span>
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {tools.map((tool, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, y: -5 }}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 hover:dark:bg-white/10 hover:border-primary/50 hover:shadow-lg dark:hover:shadow-primary/30 transition-all duration-300"
          >
            <div className="text-4xl mb-2 text-foreground/80 group-hover:text-primary transition-colors">
              {tool.icon}
            </div>
            <span className="text-sm font-medium text-foreground/70">
              {tool.label}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default function Tools() {
  return (
    <section
      id="tools"
      className="py-20 px-6 md:px-16 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            <GradientText>Tools I Use</GradientText>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            The software and hardware that power my development workflow and
            productivity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-12">
            <ToolCategory title="Development" tools={TOOLS_DEV} delay={0.2} />
          </div>
          <div className="space-y-12">
            <ToolCategory
              title="Productivity"
              tools={TOOLS_PRODUCTIVITY}
              delay={0.4}
            />
            <ToolCategory
              title="Communication"
              tools={TOOLS_COMMUNICATION}
              delay={0.6}
            />
          </div>
        </div>
      </div>

      <SectionDivider />
    </section>
  );
}
