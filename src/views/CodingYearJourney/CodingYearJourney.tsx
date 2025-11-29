"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTheme } from "next-themes";
import { JOURNEY_PHASES } from "@/utils/constants";

const CodingYearJourney = () => {
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <section className="py-20 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        My Coding Journey
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        The evolution of my technical expertise and career milestones
                    </p>
                </div>

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
                                        <div
                                            className={`bg-white/50 dark:bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 group ${isEven ? "text-left md:text-left" : "text-left md:text-right"
                                                }`}
                                            data-aos={isEven ? "fade-left" : "fade-right"}
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
                                        </div>
                                    </div>

                                    {/* Center Icon */}
                                    <div className="relative z-10 flex items-center justify-center w-16 h-16">
                                        <div
                                            className={`w-12 h-12 rounded-full bg-gradient-to-br ${phase.color} flex items-center justify-center text-white text-xl shadow-lg shadow-primary/20 transform transition-transform duration-500 hover:scale-110`}
                                            data-aos="zoom-in"
                                        >
                                            <Icon />
                                        </div>
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
