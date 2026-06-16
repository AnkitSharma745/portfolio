"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { FaTimes, FaGithub, FaExternalLinkAlt, FaYoutube } from "react-icons/fa";
import { Project } from "@/content/portfolio/projects";
import ShareButtons from "@/components/ShareButtons";

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "Tab" && modalRef.current) {
                const focusableElements = modalRef.current.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0] as HTMLElement;
                const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

                if (e.shiftKey && document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            // Small timeout to allow animation to start before focusing
            setTimeout(() => {
                if (modalRef.current) {
                    const firstFocusable = modalRef.current.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') as HTMLElement;
                    if (firstFocusable) firstFocusable.focus();
                }
            }, 50);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

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
                            ref={modalRef}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-title"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border bg-white border-black/5 dark:bg-gray-900/95 dark:border-white/10"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                aria-label="Close dialog"
                                className="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors bg-black/5 hover:bg-black/10 text-black dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
                            >
                                <FaTimes size={20} />
                            </button>

                            {/* Image */}
                            <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-t-2xl">
                                {project.image ? (
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-primary/80 to-accent/80 flex items-center justify-center p-6 text-center relative">
                                        <div className="absolute inset-0 bg-black/20" />
                                        <div className="z-10 flex flex-col items-center justify-center space-y-2">
                                            <h4 className="text-white font-bold text-3xl drop-shadow-md">{project.title}</h4>
                                            {project.bestFeature && <p className="text-white/90 text-xl font-medium drop-shadow-sm mt-2">{project.bestFeature}</p>}
                                        </div>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                {/* Header */}
                                <div className="mb-6">
                                    <h2 id="modal-title" className="text-3xl md:text-4xl font-bold mb-2">
                                        {project.title}
                                    </h2>
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
                                            className="flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all bg-black/5 hover:bg-black/10 text-black dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
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
                                            className="flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all bg-black/5 hover:bg-black/10 text-black dark:bg-white/10 dark:hover:bg-white/20 dark:text-white"
                                        >
                                            <FaYoutube size={18} />
                                            Watch Demo
                                        </a>
                                    )}
                                    {/* Share Buttons */}
                                    <div className="pt-6 border-t border-border/50">
                                        <ShareButtons
                                            url={`https://ankitsharma745.github.io/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
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
