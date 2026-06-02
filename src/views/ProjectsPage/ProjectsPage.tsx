"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import PageTransition from "@/components/PageTransition";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaGithub, FaExternalLinkAlt, FaSearch, FaYoutube, FaProjectDiagram, FaCode, FaLaptopCode } from "react-icons/fa";
import GradientText from "@/components/GradientText";
import ParticlesBackground from "@/components/ParticlesBackground";
import { PROJECTS_DATA, Project } from "@/lib/constants/projects";
import ProjectModal from "@/components/ProjectModal";
import StatsCard from "@/components/StatsCard";
import ScrollToTop from "@/components/ScrollToTop";
import FilterControls from "@/components/FilterControls";
import SortControls from "@/components/SortControls";

// Flatten projects for easier filtering
const ALL_PROJECTS = PROJECTS_DATA.flatMap(company =>
    company.projects.map(project => ({
        ...project,
        company: company.companyName,
        role: company.role
    }))
);

const FILTER_OPTIONS = [
    { label: "All", value: "All" },
    { label: "Web", value: "Web" },
    { label: "Desktop", value: "Desktop" },
    { label: "Mobile", value: "Mobile" },
    { label: "Full Stack", value: "Full Stack" }
];

const SORT_OPTIONS = [
    { label: "Featured", value: "featured" },
    { label: "Name", value: "name" },
    { label: "Tech Stack", value: "tech" }
];

export default function ProjectsPage() {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [activeSort, setActiveSort] = useState("featured");
    const [ascending, setAscending] = useState(false);
    const [selectedProject, setSelectedProject] = useState<(Project & { company?: string; role?: string }) | null>(null);

    const filteredProjects = useMemo(() => {
        const filtered = ALL_PROJECTS.filter(project => {
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

        // Sort
        filtered.sort((a, b) => {
            if (activeSort === "featured") {
                return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
            } else if (activeSort === "name") {
                return ascending
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            } else if (activeSort === "tech") {
                return ascending
                    ? a.techStack.length - b.techStack.length
                    : b.techStack.length - a.techStack.length;
            }
            return 0;
        });

        return filtered;
    }, [activeFilter, searchQuery, activeSort, ascending]);

    const featuredProjects = ALL_PROJECTS.filter(p => p.featured);
    const totalProjects = ALL_PROJECTS.length;
    const uniqueTechs = new Set(ALL_PROJECTS.flatMap(p => p.techStack));

    return (
        <PageTransition>
            <main className="min-h-screen bg-background text-foreground relative overflow-hidden pt-24 pb-10">
                <div className="container mx-auto px-6">
                    <Breadcrumbs />
                </div>
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <ParticlesBackground />
                </div>

                <div className="relative z-10 container mx-auto px-6">
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
                    <div className="text-center max-w-4xl mx-auto mb-12">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-bold mb-6"
                        >
                            All <GradientText>Projects</GradientText>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-foreground/70 leading-relaxed"
                        >
                            Explore my complete portfolio of projects, from enterprise solutions to creative experiments.
                        </motion.p>
                    </div>

                    {/* Stats Dashboard */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
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
                        <StatsCard
                            icon={FaLaptopCode}
                            value={featuredProjects.length}
                            label="Featured Projects"
                            delay={0.2}
                        />
                    </div>

                    {/* Featured Projects */}
                    {featuredProjects.length > 0 && (
                        <div className="mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
                                Featured <GradientText>Projects</GradientText>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {featuredProjects.slice(0, 3).map((project, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -10 }}
                                        onClick={() => setSelectedProject(project)}
                                        className={`
                                        group rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer
                                        ${isDark
                                                ? "bg-white/5 border-white/10 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
                                                : "bg-white border-black/5 hover:border-primary/50 shadow-lg"
                                            }
                                    `}
                                    >
                                        <div className="relative h-48 w-full overflow-hidden">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                                                FEATURED
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-foreground/70 text-sm mb-4 line-clamp-2">
                                                {project.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.techStack.slice(0, 3).map((tech: string, idx: number) => (
                                                    <span
                                                        key={idx}
                                                        className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground font-medium"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.techStack.length > 3 && (
                                                    <span className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground font-medium">
                                                        +{project.techStack.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Search and Filter */}
                    <div className="max-w-4xl mx-auto mb-16 space-y-8">
                        {/* Search Bar */}
                        <div className="relative">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40" />
                            <input
                                type="text"
                                placeholder="Search projects by name, tech, or description..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`
                                w-full pl-12 pr-4 py-4 rounded-xl border outline-none transition-all duration-300
                                ${isDark
                                        ? "bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10"
                                        : "bg-white border-black/5 focus:border-primary/50 shadow-sm"
                                    }
                            `}
                            />
                        </div>

                        {/* Filter and Sort Controls */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FilterControls
                                options={FILTER_OPTIONS}
                                activeFilter={activeFilter}
                                onFilterChange={setActiveFilter}
                                label="Filter by Category"
                            />
                            <SortControls
                                options={SORT_OPTIONS}
                                activeSort={activeSort}
                                onSortChange={setActiveSort}
                                ascending={ascending}
                                onToggleOrder={() => setAscending(!ascending)}
                                label="Sort by"
                            />
                        </div>
                    </div>

                    {/* All Projects Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
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
                                    onClick={() => setSelectedProject(project)}
                                    className={`
                                    group rounded-xl overflow-hidden border transition-all duration-300 flex flex-col cursor-pointer
                                    ${isDark
                                            ? "bg-white/5 border-white/10 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
                                            : "bg-white border-black/5 hover:border-primary/50 shadow-lg"
                                        }
                                `}
                                >
                                    <div className="relative h-48 w-full overflow-hidden">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
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
                                                {project.demoVideo && (
                                                    <a
                                                        href={project.demoVideo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-colors"
                                                        title="Watch Demo"
                                                    >
                                                        <FaYoutube size={18} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                                                {project.title}
                                            </h3>
                                        </div>

                                        <p className="text-xs font-medium text-primary mb-3">
                                            {project.company}
                                        </p>

                                        <p className="text-foreground/70 text-sm mb-4 flex-grow line-clamp-2">
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

                {/* Project Modal */}
                <ProjectModal
                    project={selectedProject}
                    isOpen={!!selectedProject}
                    onClose={() => setSelectedProject(null)}
                />

                <ScrollToTop />
            </main>
        </PageTransition>
    );
}
