"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import PageTransition from "@/components/PageTransition";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft, FaBriefcase, FaCalendarAlt, FaCheckCircle, FaSearch, FaBuilding, FaCode } from "react-icons/fa";
import GradientText from "@/components/GradientText";
import ParticlesBackground from "@/components/ParticlesBackground";
import { EXPERIENCE_DATA, ExperienceItem } from "@/content/experience/roles";
import StatsCard from "@/components/StatsCard";
import FilterControls from "@/components/FilterControls";
import SortControls from "@/components/SortControls";

const FILTER_OPTIONS = [
    { label: "All", value: "All" },
    { label: "Full Stack", value: "Full Stack" },
    { label: "Frontend", value: "Frontend" },
    { label: "Backend", value: "Backend" }
];

const SORT_OPTIONS = [
    { label: "Recent", value: "recent" },
    { label: "Company", value: "company" }
];

export default function ExperiencePage() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [activeSort, setActiveSort] = useState("recent");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredExperience = useMemo(() => {
        const filtered = EXPERIENCE_DATA.filter((item: ExperienceItem) => {
            const matchesSearch =
                item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.techStack.some((tech: string) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

            if (!matchesSearch) return false;

            if (activeFilter === "All") return true;

            const roleString = item.role.toLowerCase();
            if (activeFilter === "Full Stack" && roleString.includes("full stack")) return true;
            if (activeFilter === "Frontend" && roleString.includes("frontend")) return true;
            if (activeFilter === "Backend" && roleString.includes("backend")) return true;

            return false;
        });

        // Sort
        if (activeSort === "company") {
            filtered.sort((a: ExperienceItem, b: ExperienceItem) => a.company.localeCompare(b.company));
        }
        // Default is recent (already in order)

        return filtered;
    }, [activeFilter, searchQuery, activeSort]);

    const totalYears = 3; // Calculate based on your actual experience
    const totalCompanies = EXPERIENCE_DATA.length;
    const allTechs = new Set(EXPERIENCE_DATA.flatMap((item: ExperienceItem) => item.techStack));

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
                            Professional <GradientText>Experience</GradientText>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-[15px] leading-7 text-foreground/70 sm:text-lg md:text-xl"
                        >
                            A timeline of my professional career, highlighting key roles, projects, and the impact I&apos;ve delivered.
                        </motion.p>
                    </div>

                    {/* Stats Dashboard */}
                    <div className="mb-12 grid grid-cols-2 gap-3 sm:gap-5 md:mb-16 md:grid-cols-3 md:gap-6">
                        <StatsCard
                            icon={FaCalendarAlt}
                            value={totalYears}
                            label="Years Experience"
                            suffix="+"
                            delay={0}
                        />
                        <StatsCard
                            icon={FaBuilding}
                            value={totalCompanies}
                            label="Companies"
                            delay={0.1}
                        />
                        <StatsCard
                            icon={FaCode}
                            value={allTechs.size}
                            label="Technologies"
                            suffix="+"
                            delay={0.2}
                        />
                    </div>

                    {/* Search and Filter */}
                    <div className="mx-auto mb-12 max-w-4xl space-y-6 sm:mb-16 sm:space-y-8">
                        {/* Search Bar */}
                        <div className="relative">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40" />
                            <input
                                type="text"
                                placeholder="Search by company, role, or technology..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-xl border border-black/5 bg-white py-3.5 pl-12 pr-4 text-sm shadow-sm outline-none transition-all duration-300 focus:border-primary/50 focus:bg-white/10 dark:border-white/10 dark:bg-white/5 focus:dark:bg-white/10 sm:py-4 sm:text-base"
                            />
                        </div>

                        {/* Filter and Sort Controls */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FilterControls
                                options={FILTER_OPTIONS}
                                activeFilter={activeFilter}
                                onFilterChange={setActiveFilter}
                                label="Filter by Role"
                            />
                            <SortControls
                                options={SORT_OPTIONS}
                                activeSort={activeSort}
                                onSortChange={setActiveSort}
                                label="Sort by"
                            />
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="max-w-5xl mx-auto relative">
                        {/* Vertical Line */}
                        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-accent/20 to-primary/20 rounded-full hidden md:block" />

                        <div className="space-y-8 md:space-y-16">
                            {filteredExperience.map((item: ExperienceItem, index: number) => {
                                const isEven = index % 2 === 0;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className={`flex flex-col md:flex-row gap-8 md:gap-0 ${isEven ? "md:flex-row-reverse" : ""}`}
                                    >
                                        {/* Content Side */}
                                        <div className="w-full md:w-1/2 md:px-12">
                                            <div
                                                className="group relative rounded-2xl border border-black/5 bg-white p-5 shadow-lg transition-all duration-300 hover:border-primary/50 hover:bg-black/5 dark:border-white/10 dark:bg-white/5 dark:shadow-none hover:dark:bg-white/10 sm:p-8"
                                            >
                                                {/* Connector Line (Mobile) */}
                                                <div className="absolute left-[-33px] top-10 w-8 h-[2px] bg-primary/50 md:hidden" />

                                                {/* Connector Dot (Mobile) */}
                                                <div className="absolute left-[-37px] top-[34px] w-4 h-4 rounded-full bg-primary md:hidden shadow-[0_0_10px_rgba(var(--primary),0.5)]" />

                                                <div className={`absolute top-0 w-full h-1 bg-gradient-to-r ${item.color} opacity-50 rounded-t-2xl`} />

                                                <div className="flex flex-col gap-4 mb-6">
                                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                                        <h3 className="text-xl font-bold leading-tight sm:text-2xl">{item.role}</h3>
                                                        <span className="flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                                                            <FaCalendarAlt /> {item.period}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-base font-semibold text-foreground/80 sm:text-xl">
                                                        <FaBriefcase className="text-accent" />
                                                        {item.company}
                                                    </div>
                                                </div>

                                                <p className="text-foreground/70 mb-6 leading-relaxed">
                                                    {item.description}
                                                </p>

                                                <div className="space-y-3 mb-6">
                                                    <h4 className="font-semibold text-foreground/90">Key Achievements:</h4>
                                                    {item.achievements.map((achievement: string, idx: number) => (
                                                        <div key={idx} className="flex items-start gap-3 text-sm text-foreground/70">
                                                            <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                                            <span>{achievement}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
                                                    {item.techStack.map((tech: string, idx: number) => (
                                                        <span
                                                            key={idx}
                                                            className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground font-medium"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Center Point (Desktop) */}
                                        <div className="hidden md:flex items-center justify-center w-16 relative">
                                            <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.color} shadow-[0_0_15px_rgba(var(--primary),0.5)] z-10`} />
                                            <div className="absolute w-full h-[2px] bg-primary/20" />
                                        </div>

                                        {/* Empty Side */}
                                        <div className="hidden md:block w-1/2" />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {filteredExperience.length === 0 && (
                        <div className="text-center py-20 text-foreground/50">
                            <p className="text-xl">No experience found matching your criteria.</p>
                            <button
                                onClick={() => { setActiveFilter("All"); setSearchQuery(""); }}
                                className="mt-4 text-primary hover:underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}

                    {/* Bottom CTA */}
                    <div className="text-center py-20">
                        <h3 className="text-2xl font-bold mb-6">Want to know more?</h3>
                        <div className="flex justify-center gap-4">
                            <Link href="/projects">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-primary/25 transition-all"
                                >
                                    View Projects
                                </motion.button>
                            </Link>
                            <Link href="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-3 rounded-full border border-primary text-primary font-medium hover:bg-primary/10 transition-all"
                                >
                                    Contact Me
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </PageTransition>
    );
}
