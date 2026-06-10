"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import PageTransition from "@/components/PageTransition";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft, FaGithub, FaStar, FaCodeBranch, FaExternalLinkAlt, FaSearch } from "react-icons/fa";
import GradientText from "@/components/GradientText";
import ParticlesBackground from "@/components/ParticlesBackground";
import { OPEN_SOURCE_CONTRIBUTIONS, Contribution } from "@/content/portfolio/openSource";
import StatsCard from "@/components/StatsCard";
import ScrollToTop from "@/components/ScrollToTop";
import FilterControls from "@/components/FilterControls";
import SortControls from "@/components/SortControls";

// Extract unique languages and contribution types
const allLanguages = Array.from(new Set(OPEN_SOURCE_CONTRIBUTIONS.map(c => c.language)));
const allTypes = Array.from(new Set(OPEN_SOURCE_CONTRIBUTIONS.map(c => c.contributionType)));

const LANGUAGE_FILTER_OPTIONS = [
    { label: "All Languages", value: "All" },
    ...allLanguages.map(lang => ({ label: lang, value: lang }))
];

const TYPE_FILTER_OPTIONS = [
    { label: "All Types", value: "All" },
    ...allTypes.map(type => ({ label: type, value: type }))
];

const SORT_OPTIONS = [
    { label: "Stars", value: "stars" },
    { label: "Forks", value: "forks" },
    { label: "Name", value: "name" }
];

export default function OpenSourcePage() {
    const [languageFilter, setLanguageFilter] = useState("All");
    const [typeFilter, setTypeFilter] = useState("All");
    const [activeSort, setActiveSort] = useState("stars");
    const [ascending, setAscending] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredContributions = useMemo(() => {
        const filtered = OPEN_SOURCE_CONTRIBUTIONS.filter(item => {
            const matchesSearch =
                item.repoName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase());

            if (!matchesSearch) return false;

            const matchesLanguage = languageFilter === "All" || item.language === languageFilter;
            const matchesType = typeFilter === "All" || item.contributionType === typeFilter;

            return matchesLanguage && matchesType;
        });

        // Sort
        filtered.sort((a, b) => {
            if (activeSort === "stars") {
                return ascending ? a.stars - b.stars : b.stars - a.stars;
            } else if (activeSort === "forks") {
                return ascending ? a.forks - b.forks : b.forks - a.forks;
            } else if (activeSort === "name") {
                return ascending
                    ? a.repoName.localeCompare(b.repoName)
                    : b.repoName.localeCompare(a.repoName);
            }
            return 0;
        });

        return filtered;
    }, [languageFilter, typeFilter, searchQuery, activeSort, ascending]);

    const totalStars = OPEN_SOURCE_CONTRIBUTIONS.reduce((sum, item) => sum + item.stars, 0);
    const totalForks = OPEN_SOURCE_CONTRIBUTIONS.reduce((sum, item) => sum + item.forks, 0);
    const totalContributions = OPEN_SOURCE_CONTRIBUTIONS.length;

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
                            Open Source <GradientText>Contributions</GradientText>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-foreground/70 leading-relaxed"
                        >
                            I believe in the power of community. Here are some of the projects I&apos;ve contributed to and the impact I&apos;ve made.
                        </motion.p>
                    </div>

                    {/* Stats Dashboard */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
                        <StatsCard
                            icon={FaGithub}
                            value={totalContributions}
                            label="Contributions"
                            delay={0}
                        />
                        <StatsCard
                            icon={FaStar}
                            value={totalStars}
                            label="Total Stars"
                            delay={0.1}
                        />
                        <StatsCard
                            icon={FaCodeBranch}
                            value={totalForks}
                            label="Total Forks"
                            delay={0.2}
                        />
                    </div>

                    {/* Search and Filter */}
                    <div className="max-w-4xl mx-auto mb-16 space-y-8">
                        {/* Search Bar */}
                        <div className="relative">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40" />
                            <input
                                type="text"
                                placeholder="Search by repository name or description..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 focus:border-primary/50 focus:bg-black/5 focus:dark:bg-white/10 shadow-sm outline-none transition-all duration-300"
                            />
                        </div>

                        {/* Filter and Sort Controls */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FilterControls
                                options={LANGUAGE_FILTER_OPTIONS}
                                activeFilter={languageFilter}
                                onFilterChange={setLanguageFilter}
                                label="Language"
                            />
                            <FilterControls
                                options={TYPE_FILTER_OPTIONS}
                                activeFilter={typeFilter}
                                onFilterChange={setTypeFilter}
                                label="Type"
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

                    {/* Contributions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        {filteredContributions.map((contribution: Contribution, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="p-8 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 hover:border-primary/50 hover:bg-black/5 hover:dark:bg-white/10 shadow-lg dark:shadow-none transition-all duration-300 group relative overflow-hidden flex flex-col"
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <FaGithub size={120} />
                                </div>

                                <div className="relative z-10 flex-grow">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-xl bg-primary/10 text-primary text-3xl">
                                                {contribution.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                                                    {contribution.repoName}
                                                </h3>
                                                <span className="text-sm font-medium px-3 py-1 rounded-full bg-secondary text-secondary-foreground inline-block mt-1">
                                                    {contribution.contributionType}
                                                </span>
                                            </div>
                                        </div>
                                        <a
                                            href={contribution.repoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-2 rounded-full hover:bg-foreground/10 transition-colors"
                                        >
                                            <FaExternalLinkAlt className="text-foreground/50 hover:text-primary" />
                                        </a>
                                    </div>

                                    <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                                        {contribution.description}
                                    </p>

                                    <div className="flex items-center gap-6 text-foreground/60 mt-auto">
                                        <div className="flex items-center gap-2">
                                            <FaStar className="text-yellow-500" />
                                            <span className="font-medium">{contribution.stars.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaCodeBranch className="text-blue-500" />
                                            <span className="font-medium">{contribution.forks.toLocaleString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full bg-primary"></span>
                                            <span className="font-medium">{contribution.language}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {filteredContributions.length === 0 && (
                        <div className="text-center py-20 text-foreground/50">
                            <p className="text-xl">No contributions found matching your criteria.</p>
                            <button
                                onClick={() => {
                                    setLanguageFilter("All");
                                    setTypeFilter("All");
                                    setSearchQuery("");
                                }}
                                className="mt-4 text-primary hover:underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}

                    {/* Bottom CTA */}
                    <div className="text-center py-10">
                        <h3 className="text-2xl font-bold mb-6">Have an interesting project?</h3>
                        <a
                            href="https://github.com/ankitsharma745"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 rounded-full bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-colors flex items-center gap-2 mx-auto"
                            >
                                <FaGithub />
                                Check out my GitHub
                            </motion.button>
                        </a>
                    </div>
                </div>

                <ScrollToTop />
            </main>
        </PageTransition>
    );
}
