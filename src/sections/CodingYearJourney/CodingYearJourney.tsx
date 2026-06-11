"use client";

import { motion } from "framer-motion";
import { JOURNEY_PHASES } from "@/content/portfolio/journey";

const CodingYearJourney = () => {
    return (
        <section className="py-20 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        My Coding Journey
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        The evolution of my technical expertise and career milestones
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/20 via-accent/20 to-primary/20 rounded-full hidden md:block" />

                    <div className="space-y-12 md:space-y-24">
                        {JOURNEY_PHASES.map((phase, index) => {
                            const Icon = phase.icon;
                            const isEven = index % 2 === 0;

                            return (
                                <div
                                    key={phase.year}
                                    className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${isEven ? "md:flex-row-reverse" : ""
                                        }`}
                                >
                                    {/* Content Side */}
                                    <div className="w-full md:w-1/2 px-4 md:px-12">
                                        <motion.div
                                            initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, amount: 0.5 }}
                                            transition={{ duration: 0.6 }}
                                            className={`bg-white/50 dark:bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 group ${isEven ? "text-left md:text-left" : "text-left md:text-right"
                                                }`}
                                        >
                                            <div
                                                className={`inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-gradient-to-r ${phase.color} bg-opacity-10 text-white text-sm font-bold shadow-lg`}
                                            >
                                                <span>{phase.year}</span>
                                            </div>
                                            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                                                {phase.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                                {phase.description}
                                            </p>
                                        </motion.div>
                                    </div>

                                    {/* Center Icon */}
                                    <div className="relative z-10 flex items-center justify-center w-16 h-16">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: 0.2 }}
                                            className={`w-12 h-12 rounded-full bg-gradient-to-br ${phase.color} flex items-center justify-center text-white text-xl shadow-lg shadow-primary/20 transform transition-transform duration-500 hover:scale-110`}
                                        >
                                            <Icon />
                                        </motion.div>
                                    </div>

                                    {/* Empty Side for Layout Balance */}
                                    <div className="w-full md:w-1/2 hidden md:block" />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CodingYearJourney;
