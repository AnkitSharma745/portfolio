"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import PageTransition from "@/components/PageTransition";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaGithub, FaExternalLinkAlt, FaSearch, FaProjectDiagram, FaCode } from "react-icons/fa";
import GradientText from "@/components/GradientText";
import FeatureTextPlaceholder from "@/components/FeatureTextPlaceholder";
import ParticlesBackground from "@/components/ParticlesBackground";
import { PROJECTS_DATA } from "@/content/projects/projects";
import StatsCard from "@/components/StatsCard";
import FilterControls from "@/components/FilterControls";

const FILTER_OPTIONS = [
    { label: "All", value: "All" },
    { label: "Web", value: "Web" },
    { label: "Desktop", value: "Desktop" },
    { label: "Mobile", value: "Mobile" },
    { label: "Full Stack", value: "Full Stack" }
];

export default function ProjectsPage() {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProjects = useMemo(() => {
        const filtered = PROJECTS_DATA.filter(project => {
            const matchesSearch =
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.techStack.some((tech: string) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

            if (!matchesSearch) return false;

            if (activeFilter === "All") return true;

            const techString = project.techStack.join(" ").toLowerCase();

            if (activeFilter === "Web" && (techString.includes("react") || techString.includes("next") || techString.includes("web"))) return true;
            if (activeFilter === "Desktop" && (techString.includes("electron") || techString.includes("desktop"))) return true;
            if (activeFilter === "Mobile" && (techString.includes("react native") || techString.includes("mobile"))) return true;
            if (activeFilter === "Full Stack" && (techString.includes("node") || techString.includes("mongo") || techString.includes("sql"))) return true;

            return false;
        });

        return filtered;
    }, [activeFilter, searchQuery]);

    const totalProjects = PROJECTS_DATA.length;
    const uniqueTechs = new Set(PROJECTS_DATA.flatMap(p => p.techStack));

    return (
        <PageTransition>
            <main className="relative min-h-screen overflow-hidden bg-background pb-12 pt-24 text-foreground sm:pb-16">
                <div className="container mx-auto px-4 sm:px-6">
                    <Breadcrumbs />
                </div>
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <ParticlesBackground />
                </div>

                <div className="container relative z-10 mx-auto px-4 sm:px-6">
                    {/* Back Navigation */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors group"
                        >
                            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                            Back to Home
                        </Link>
                    </motion.div>

                    {/* Header */}
                    <div className="mx-auto mb-10 max-w-4xl text-center sm:mb-12">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 text-3xl font-bold leading-tight sm:text-5xl md:mb-6 md:text-7xl"
                        >
                            All <GradientText>Projects</GradientText>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-[15px] leading-7 text-foreground/70 sm:text-lg md:text-xl"
                        >
                            Explore my complete portfolio of projects, from enterprise solutions to creative experiments.
                        </motion.p>
                    </div>

                    {/* Stats Dashboard */}
                    <div className="mb-12 grid grid-cols-2 gap-3 sm:mb-16 sm:flex sm:flex-wrap sm:justify-center sm:gap-6">
                        <StatsCard
                            icon={FaProjectDiagram}
                            value={totalProjects}
                            label="Total Projects"
                            delay={0}
                        />
                        <StatsCard
                            icon={FaCode}
                            value={uniqueTechs.size}
                            label="Technologies Used"
                            delay={0.1}
                        />
                    </div>

                    {/* Search and Filter */}
                    <div className="mx-auto mb-12 max-w-4xl space-y-6 sm:mb-16 sm:space-y-8">
                        {/* Search Bar */}
                        <div className="relative">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40" />
                            <input
                                type="text"
                                placeholder="Search projects by name, tech, or description..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-xl border border-black/5 bg-white py-3.5 pl-12 pr-4 text-sm shadow-sm outline-none transition-all duration-300 focus:border-primary/50 focus:bg-black/5 dark:border-white/10 dark:bg-white/5 focus:dark:bg-white/10 sm:py-4 sm:text-base"
                            />
                        </div>

                        {/* Filter Controls */}
                        <div className="flex justify-center">
                            <FilterControls
                                options={FILTER_OPTIONS}
                                activeFilter={activeFilter}
                                onFilterChange={setActiveFilter}
                                label="Filter by Category"
                            />
                        </div>
                    </div>

                    {/* All Projects Grid */}
                    <motion.div
                        layout
                        className="mb-16 grid grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
                    >
                        <AnimatePresence>
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    layout
                                    key={`${project.title}-${index}`}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={() => router.push(`/projects/${project.slug}`)}
                                    className="group flex w-full max-w-sm cursor-pointer flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 dark:border-white/10 dark:bg-white/5 dark:shadow-none dark:hover:shadow-primary/10 sm:max-w-none"
                                >
                                    <div className="relative h-44 w-full overflow-hidden sm:h-48">
                                        {project.image ? (
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <FeatureTextPlaceholder title={project.title} feature={project.bestFeature} />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                                            <div className="flex gap-3">
                                                {project.codeLink && (
                                                    <a
                                                        href={project.codeLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-colors"
                                                        title="View Code"
                                                    >
                                                        <FaGithub size={18} />
                                                    </a>
                                                )}
                                                {project.liveLink && (
                                                    <a
                                                        href={project.liveLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-colors"
                                                        title="Live Demo"
                                                    >
                                                        <FaExternalLinkAlt size={18} />
                                                    </a>
                                                )}
                                                
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-grow flex-col p-4 sm:p-5 lg:p-6">
                                        <div className="mb-2 flex items-start justify-between">
                                            <h3 className="text-lg font-bold leading-snug transition-colors group-hover:text-primary sm:text-xl">
                                                {project.title}
                                            </h3>
                                        </div>

                                        <p className="mb-4 mt-2 line-clamp-3 flex-grow text-sm leading-6 text-foreground/70">
                                            {project.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {project.techStack.map((tech: string, idx: number) => (
                                                <span
                                                    key={idx}
                                                    className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground font-medium"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-20 text-foreground/50">
                            <p className="text-xl">No projects found matching your criteria.</p>
                            <button
                                onClick={() => { setActiveFilter("All"); setSearchQuery(""); }}
                                className="mt-4 text-primary hover:underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </PageTransition>
    );
}
