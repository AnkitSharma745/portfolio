"use client";

import { motion } from "framer-motion";
import {
  TOOLS_DEV,
  TOOLS_PRODUCTIVITY,
  TOOLS_COMMUNICATION,
} from "@/content/skills/tools";
import GradientText from "@/components/GradientText";
import ToolCategory from "./_components/ToolCategory";

export default function Tools() {
  return (
    <section
      id="tools"
      className="relative overflow-hidden bg-background px-4 py-16 transition-all duration-500 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl space-y-8 sm:space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-950 dark:text-white sm:text-4xl md:text-5xl">
            Tools <GradientText> I Use</GradientText>
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-foreground/65 sm:text-base md:text-lg">
            The software and hardware that power my development workflow and
            productivity.
          </p>
        </motion.div>

        <div className="space-y-4 sm:space-y-5">
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
