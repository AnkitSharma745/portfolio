"use client"

import { motion } from "framer-motion"
import GradientText from "@/components/GradientText"

export default function TechPrinciples() {
    return (
        <section
            id="tech-principles"
            className="w-full min-h-screen pt-20 pb-0 px-6 md:px-20 transition-colors duration-300 bg-background text-foreground"
        >
            <motion.h2
                className="text-4xl sm:text-5xl font-bold text-center mb-10"
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <GradientText>
                    Me As a Techies
                </GradientText>
            </motion.h2>
            <motion.div
                className="mt-20 max-w-4xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <h3 className="text-3xl font-bold mb-8 text-center text-foreground">
                    My Coding Principles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        "Clean code is kind code.",
                        "Design for humans, optimize for machines.",
                        "Every bug is a lesson.",
                        "Build once, scale forever.",
                    ].map((quote, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="bg-card border border-border text-foreground px-6 py-6 rounded-xl shadow-sm hover:shadow-md transition-all"
                        >
                            <p className="text-lg font-medium italic">&quot;{quote}&quot;</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Personal Chart */}
            <motion.div
                className="mt-20 max-w-4xl mx-auto text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <h3 className="text-3xl font-bold mb-8 text-foreground">Beyond the Code</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        ["Coding", "60%"],
                        ["Lofi Music", "20%"],
                        ["Tech Blogs", "10%"],
                        ["Side Projects", "10%"],
                    ].map(([label, value], i) => (
                        <div
                            key={i}
                            className="rounded-xl bg-card border border-border text-foreground p-6 shadow-sm font-medium hover:border-primary transition-colors"
                        >
                            <p className="text-sm uppercase tracking-wider opacity-70 mb-2">{label}</p>
                            <p className="text-3xl font-bold text-primary">{value}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}