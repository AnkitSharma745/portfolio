"use client";

import { useState } from "react";
import { PROJECTS } from "@/utils/constants";
import { FaStar } from "react-icons/fa";

const Experience = () => {
    const [activeProject, setActiveProject] = useState(0);

    return (
        <section>
            <section className="relative z-10 py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            Project Showcase
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Revolutionary solutions that transformed business operations
                        </p>
                    </div>

                    {/* Project Navigation */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {PROJECTS.map((project, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveProject(idx)}
                                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeProject === idx
                                    ? "bg-gradient-to-r from-primary to-accent text-black font-bold shadow-lg shadow-primary/25"
                                    : "bg-white/50 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
                                    }`}
                            >
                                {project.title}
                            </button>
                        ))}
                    </div>

                    {/* Active Project Details */}
                    <div className="bg-white/50 dark:bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-gray-200 dark:border-white/10">
                        <div
                            className={`bg-gradient-to-r ${PROJECTS[activeProject].color} p-1 rounded-2xl mb-8`}
                        >
                            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-8">
                                <div className="flex flex-col lg:flex-row gap-8">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-4">
                                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                                                {PROJECTS[activeProject].title}
                                            </h3>
                                            <span className="px-3 py-1 bg-green-500/20 text-green-600 dark:text-green-400 rounded-full text-sm">
                                                {PROJECTS[activeProject].impact}
                                            </span>
                                        </div>
                                        <p className="text-xl text-primary mb-4">
                                            {PROJECTS[activeProject].subtitle}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                                            {PROJECTS[activeProject].description}
                                        </p>

                                        {/* Tech Stack */}
                                        <div className="mb-6">
                                            <h4 className="text-lg font-semibold mb-3 text-primary">
                                                Tech Stack
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {PROJECTS[activeProject].techStack.map((tech, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Features */}
                                        <div>
                                            <h4 className="text-lg font-semibold mb-3 text-accent">
                                                Key Features
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {PROJECTS[activeProject].features.map(
                                                    (feature, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="flex items-center gap-2 text-gray-600 dark:text-gray-300"
                                                        >
                                                            <FaStar className="text-yellow-400 text-sm" />
                                                            <span className="text-sm">{feature}</span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Metrics */}
                                    <div className="lg:w-80">
                                        <h4 className="text-lg font-semibold mb-4 text-accent">
                                            Project Metrics
                                        </h4>
                                        <div className="space-y-4">
                                            {Object.entries(PROJECTS[activeProject].metrics).map(
                                                ([key, value], idx) => (
                                                    <div key={idx} className="bg-white/50 dark:bg-white/5 rounded-lg p-4 border border-gray-100 dark:border-gray-800">
                                                        <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                                                            {key.replace(/([A-Z])/g, " $1")}
                                                        </div>
                                                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                                            {value}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
};
export default Experience;