"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import { FaTimes, FaGithub, FaExternalLinkAlt, FaYoutube } from "react-icons/fa";
import { Project } from "@/lib/constants/projects";
import ShareButtons from "@/components/ShareButtons";

interface ProjectModalProps {
    project: (Project & { company?: string; role?: string }) | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className={`
                                relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border
                                ${isDark
                                    ? "bg-gray-900/95 border-white/10"
                                    : "bg-white border-black/5"
                                }
                            `}
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className={`
                                    absolute top-4 right-4 z-10 p-2 rounded-full transition-colors
                                    ${isDark
                                        ? "bg-white/10 hover:bg-white/20 text-white"
                                        : "bg-black/5 hover:bg-black/10 text-black"
                                    }
                                `}
                            >
                                <FaTimes size={20} />
                            </button>

                            {/* Image */}
                            <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-t-2xl">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                {/* Header */}
                                <div className="mb-6">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                                        {project.title}
                                    </h2>
                                    {project.company && (
                                        <p className="text-primary font-medium">
                                            {project.company} {project.role && `• ${project.role}`}
                                        </p>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-3">About This Project</h3>
                                    <p className="text-foreground/70 leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Tech Stack */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-3">Tech Stack</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Links */}
                                <div className="flex flex-wrap gap-4">
                                    {project.codeLink && (
                                        <a
                                            href={project.codeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:shadow-lg hover:shadow-primary/25 transition-all"
                                        >
                                            <FaGithub size={18} />
                                            View Code
                                        </a>
                                    )}
                                    {project.liveLink && (
                                        <a
                                            href={project.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`
                                                flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all
                                                ${isDark
                                                    ? "bg-white/10 hover:bg-white/20 text-white"
                                                    : "bg-black/5 hover:bg-black/10 text-black"
                                                }
                                            `}
                                        >
                                            <FaExternalLinkAlt size={18} />
                                            Live Demo
                                        </a>
                                    )}
                                    {project.demoVideo && (
                                        <a
                                            href={project.demoVideo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`
                                                flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all
                                                ${isDark
                                                    ? "bg-white/10 hover:bg-white/20 text-white"
                                                    : "bg-black/5 hover:bg-black/10 text-black"
                                                }
                                            `}
                                        >
                                            <FaYoutube size={18} />
                                            Watch Demo
                                        </a>
                                    )}
                                    {/* Share Buttons */}
                                    <div className="pt-6 border-t border-border/50">
                                        <ShareButtons
                                            url={`https://ankitsharma.dev/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                                            title={project.title}
                                            description={project.description}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
