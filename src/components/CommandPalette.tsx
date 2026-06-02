"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useUI } from "@/context/UIContext";
import {
    FaHome, FaUser, FaBriefcase, FaProjectDiagram, FaGithub,
    FaBlog, FaEnvelope, FaMoon, FaSun, FaDownload, FaLinkedin,
    FaTwitter, FaSearch, FaTimes, FaRobot, FaTerminal
} from "react-icons/fa";
import {
    openGithub,
    openLinkedin,
    openTwitter,
    downloadResume
} from "@/utils/actions";

interface Command {
    id: string;
    label: string;
    icon: React.ReactNode;
    action: () => void;
    category: "Navigation" | "Actions" | "Social";
    keywords?: string[];
}

export default function CommandPalette() {
    const { isCommandPaletteOpen, toggleCommandPalette, closeCommandPalette, openChat } = useUI();
    const [search, setSearch] = useState("");
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    const commands: Command[] = useMemo(() => [
        // Navigation
        { id: "home", label: "Go to Home", icon: <FaHome />, action: () => router.push("/"), category: "Navigation", keywords: ["home", "main"] },
        { id: "about", label: "Go to About", icon: <FaUser />, action: () => router.push("/about"), category: "Navigation", keywords: ["about", "me", "bio"] },
        { id: "experience", label: "Go to Experience", icon: <FaBriefcase />, action: () => router.push("/experience"), category: "Navigation", keywords: ["experience", "work", "career"] },
        { id: "projects", label: "Go to Projects", icon: <FaProjectDiagram />, action: () => router.push("/projects"), category: "Navigation", keywords: ["projects", "portfolio", "work"] },
        { id: "opensource", label: "Go to Open Source", icon: <FaGithub />, action: () => router.push("/open-source"), category: "Navigation", keywords: ["open source", "github", "contributions"] },
        { id: "blog", label: "Go to Blog", icon: <FaBlog />, action: () => router.push("/blog"), category: "Navigation", keywords: ["blog", "articles", "posts"] },
        { id: "contact", label: "Go to Contact", icon: <FaEnvelope />, action: () => router.push("/contact"), category: "Navigation", keywords: ["contact", "email", "message"] },

        // Actions
        {
            id: "ask-ai",
            label: "Ask AI Assistant",
            icon: <FaRobot />,
            action: () => openChat(),
            category: "Actions",
            keywords: ["ai", "chat", "bot", "assistant", "help"]
        },
        {
            id: "theme-toggle",
            label: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
            icon: theme === "dark" ? <FaSun /> : <FaMoon />,
            action: () => setTheme(theme === "dark" ? "light" : "dark"),
            category: "Actions",
            keywords: ["theme", "dark", "light", "mode"]
        },
        {
            id: "download-resume",
            label: "Download Resume",
            icon: <FaDownload />,
            action: downloadResume,
            category: "Actions",
            keywords: ["resume", "cv", "download"]
        },

        // Social
        { id: "github", label: "Open GitHub", icon: <FaGithub />, action: openGithub, category: "Social", keywords: ["github", "code"] },
        { id: "linkedin", label: "Open LinkedIn", icon: <FaLinkedin />, action: openLinkedin, category: "Social", keywords: ["linkedin", "professional"] },
        { id: "twitter", label: "Open Twitter", icon: <FaTwitter />, action: openTwitter, category: "Social", keywords: ["twitter", "social"] }
    ], [router, theme, setTheme, openChat]);

    const filteredCommands = useMemo(() => {
        if (!search) return commands;

        const searchLower = search.toLowerCase();
        return commands.filter(cmd =>
            cmd.label.toLowerCase().includes(searchLower) ||
            cmd.category.toLowerCase().includes(searchLower) ||
            cmd.keywords?.some(k => k.includes(searchLower))
        );
    }, [search, commands]);

    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        // Open/Close with Cmd+K or Ctrl+K
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
            e.preventDefault();
            toggleCommandPalette();
            return;
        }

        if (!isCommandPaletteOpen) return;

        // Close with Escape
        if (e.key === "Escape") {
            closeCommandPalette();
            setSearch("");
            setSelectedIndex(0);
            return;
        }

        // Navigate with Arrow Keys
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        }

        // Execute with Enter
        if (e.key === "Enter" && filteredCommands[selectedIndex]) {
            e.preventDefault();
            filteredCommands[selectedIndex].action();
            closeCommandPalette();
            setSearch("");
            setSelectedIndex(0);
        }
    }, [isCommandPaletteOpen, filteredCommands, selectedIndex, toggleCommandPalette, closeCommandPalette]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    useEffect(() => {
        if (isCommandPaletteOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isCommandPaletteOpen]);

    const isDark = theme === "dark";

    const groupedCommands = useMemo(() => {
        const groups: Record<string, Command[]> = {};
        filteredCommands.forEach(cmd => {
            if (!groups[cmd.category]) groups[cmd.category] = [];
            groups[cmd.category].push(cmd);
        });
        return groups;
    }, [filteredCommands]);

    return (
        <>
            {/* Floating Toggle Button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleCommandPalette}
                className="fixed bottom-24 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-gray-800 to-black text-white shadow-lg shadow-black/30 hover:shadow-black/50 transition-shadow border border-white/10"
                title="Open Command Palette (Cmd+K)"
            >
                <FaTerminal size={20} />
            </motion.button>

            <AnimatePresence>
                {isCommandPaletteOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeCommandPalette}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />

                        {/* Command Palette */}
                        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                className={`
                                    w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden
                                    ${isDark ? "bg-gray-900/95 border-white/10" : "bg-white border-black/5"}
                                `}
                            >
                                {/* Search Input */}
                                <div className="flex items-center gap-3 p-4 border-b border-border/50">
                                    <FaSearch className="text-foreground/40" />
                                    <input
                                        type="text"
                                        placeholder="Type a command or search..."
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            setSelectedIndex(0);
                                        }}
                                        className="flex-1 bg-transparent outline-none text-lg"
                                        autoFocus
                                    />
                                    <button
                                        onClick={closeCommandPalette}
                                        className="p-2 rounded-lg hover:bg-foreground/10 transition-colors"
                                    >
                                        <FaTimes className="text-foreground/60" />
                                    </button>
                                </div>

                                {/* Commands List */}
                                <div className="max-h-[60vh] overflow-y-auto p-2">
                                    {Object.entries(groupedCommands).map(([category, cmds]) => (
                                        <div key={category} className="mb-4">
                                            <div className="px-3 py-2 text-xs font-semibold text-foreground/50 uppercase tracking-wide">
                                                {category}
                                            </div>
                                            {cmds.map((cmd) => {
                                                const globalIndex = filteredCommands.indexOf(cmd);
                                                const isSelected = globalIndex === selectedIndex;

                                                return (
                                                    <button
                                                        key={cmd.id}
                                                        onClick={() => {
                                                            cmd.action();
                                                            closeCommandPalette();
                                                            setSearch("");
                                                            setSelectedIndex(0);
                                                        }}
                                                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                                                        className={`
                                                            w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all
                                                            ${isSelected
                                                                ? "bg-primary text-primary-foreground"
                                                                : "hover:bg-foreground/5"
                                                            }
                                                        `}
                                                    >
                                                        <span className="text-xl">{cmd.icon}</span>
                                                        <span className="flex-1 text-left font-medium">{cmd.label}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ))}

                                    {filteredCommands.length === 0 && (
                                        <div className="text-center py-12 text-foreground/50">
                                            No commands found for &quot;{search}&quot;
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between px-4 py-3 border-t border-border/50 text-xs text-foreground/50">
                                    <div className="flex gap-4">
                                        <span><kbd className="px-2 py-1 rounded bg-foreground/10">↑↓</kbd> Navigate</span>
                                        <span><kbd className="px-2 py-1 rounded bg-foreground/10">Enter</kbd> Select</span>
                                        <span><kbd className="px-2 py-1 rounded bg-foreground/10">Esc</kbd> Close</span>
                                    </div>
                                    <span>
                                        <kbd className="px-2 py-1 rounded bg-foreground/10">⌘K</kbd> to open
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
