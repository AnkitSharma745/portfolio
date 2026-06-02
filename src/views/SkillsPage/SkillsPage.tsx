"use client";

import { motion } from "framer-motion";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function SkillsPage() {
    const skills = [
        { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux"] },
        { category: "Backend", items: ["Node.js", "Express", "GraphQL", "PostgreSQL", "MongoDB", "Firebase"] },
        { category: "DevOps & Tools", items: ["Docker", "AWS", "Git", "CI/CD", "Jest", "Webpack"] },
        { category: "Desktop", items: ["Electron", ".NET", "C#", "WPF"] },
    ];

    return (
        <main className="relative min-h-screen bg-background text-foreground pt-24 px-6">
            <div className="fixed inset-0 z-0">
                <ParticlesBackground />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                        Technical Skills
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        A comprehensive overview of my technical expertise and the technologies I work with.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {skills.map((skillGroup, index) => (
                        <motion.div
                            key={skillGroup.category}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-colors"
                        >
                            <h2 className="text-2xl font-semibold mb-6 text-primary">{skillGroup.category}</h2>
                            <div className="flex flex-wrap gap-3">
                                {skillGroup.items.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-4 py-2 rounded-full bg-secondary/50 text-secondary-foreground text-sm font-medium hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
