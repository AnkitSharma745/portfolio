"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useUI } from "@/context/UIContext";
import {
    FaHome, FaUser, FaBriefcase, FaProjectDiagram, FaGithub,
    FaBlog, FaEnvelope, FaMoon, FaSun, FaDownload, FaLinkedin,
    FaTwitter, FaSearch, FaTimes, FaRobot, FaTerminal, FaCode
} from "react-icons/fa";
import {
    openGithub,
    openLinkedin,
    openTwitter,
    downloadResume
} from "@/utils/actions";
import {
    commandPaletteContent,
    type CommandCategory,
    type NavigationCommandId,
    type SocialCommandId,
    type StaticActionCommandId,
} from "@/content/command/commandPalette";

interface Command {
    id: string;
    label: string;
    icon: React.ReactNode;
    action: () => void;
    category: CommandCategory;
    keywords?: readonly string[];
}

const navigationCommandIcons: Record<NavigationCommandId, React.ReactNode> = {
    home: <FaHome />,
    about: <FaUser />,
    skills: <FaCode />,
    experience: <FaBriefcase />,
    projects: <FaProjectDiagram />,
    opensource: <FaGithub />,
    blog: <FaBlog />,
    contact: <FaEnvelope />,
    "skills-frontend": <FaCode />,
    "skills-backend": <FaCode />,
    "skills-desktop": <FaCode />,
    "skills-cloud-devops": <FaCode />,
    "frontend-systems": <FaCode />,
    "backend-systems": <FaCode />,
    "desktop-applications": <FaCode />,
    "cloud-devops-delivery": <FaCode />,
    "product-engineering": <FaCode />,
    "ai-augmented-development": <FaCode />,
    "automation-platforms": <FaCode />,
};

const staticActionCommandIcons: Record<StaticActionCommandId, React.ReactNode> = {
    "ask-ai": <FaRobot />,
    "download-resume": <FaDownload />,
};

const socialCommandIcons: Record<SocialCommandId, React.ReactNode> = {
    github: <FaGithub />,
    linkedin: <FaLinkedin />,
    twitter: <FaTwitter />,
};

const socialCommandActions: Record<SocialCommandId, () => void> = {
    github: openGithub,
    linkedin: openLinkedin,
    twitter: openTwitter,
};

export default function CommandPalette() {
    const { isCommandPaletteOpen, toggleCommandPalette, closeCommandPalette, openChat } = useUI();
    const [search, setSearch] = useState("");
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    const commands: Command[] = useMemo(() => [
        // Navigation
        ...commandPaletteContent.navigationCommands.map((command) => ({
            id: command.id,
            label: command.label,
            icon: navigationCommandIcons[command.id],
            action: () => router.push(command.route),
            category: command.category,
            keywords: command.keywords,
        })),

        // Actions
        {
            id: commandPaletteContent.actionCommands.askAi.id,
            label: commandPaletteContent.actionCommands.askAi.label,
            icon: staticActionCommandIcons[commandPaletteContent.actionCommands.askAi.id],
            action: () => openChat(),
            category: commandPaletteContent.actionCommands.askAi.category,
            keywords: commandPaletteContent.actionCommands.askAi.keywords
        },
        {
            id: commandPaletteContent.actionCommands.themeToggle.id,
            label: theme === "dark"
                ? commandPaletteContent.actionCommands.themeToggle.labels.whenDarkTheme
                : commandPaletteContent.actionCommands.themeToggle.labels.whenLightTheme,
            icon: theme === "dark" ? <FaSun /> : <FaMoon />,
            action: () => setTheme(theme === "dark" ? "light" : "dark"),
            category: commandPaletteContent.actionCommands.themeToggle.category,
            keywords: commandPaletteContent.actionCommands.themeToggle.keywords
        },
        {
            id: commandPaletteContent.actionCommands.downloadResume.id,
            label: commandPaletteContent.actionCommands.downloadResume.label,
            icon: staticActionCommandIcons[commandPaletteContent.actionCommands.downloadResume.id],
            action: downloadResume,
            category: commandPaletteContent.actionCommands.downloadResume.category,
            keywords: commandPaletteContent.actionCommands.downloadResume.keywords
        },

        // Social
        ...commandPaletteContent.socialCommands.map((command) => ({
            id: command.id,
            label: command.label,
            icon: socialCommandIcons[command.id],
            action: socialCommandActions[command.id],
            category: command.category,
            keywords: command.keywords,
        }))
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
                className="hidden lg:flex fixed bottom-24 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-gray-800 to-black text-white shadow-lg shadow-black/30 hover:shadow-black/50 transition-shadow border border-white/10 items-center justify-center"
                title={commandPaletteContent.triggerTitle}
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
                                        placeholder={commandPaletteContent.searchPlaceholder}
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
                                            {commandPaletteContent.emptyStatePrefix} &quot;{search}&quot;
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between px-4 py-3 border-t border-border/50 text-xs text-foreground/50">
                                    <div className="flex gap-4">
                                        <span><kbd className="px-2 py-1 rounded bg-foreground/10">{commandPaletteContent.keyboardHints.navigate.keys}</kbd> {commandPaletteContent.keyboardHints.navigate.label}</span>
                                        <span><kbd className="px-2 py-1 rounded bg-foreground/10">{commandPaletteContent.keyboardHints.select.keys}</kbd> {commandPaletteContent.keyboardHints.select.label}</span>
                                        <span><kbd className="px-2 py-1 rounded bg-foreground/10">{commandPaletteContent.keyboardHints.close.keys}</kbd> {commandPaletteContent.keyboardHints.close.label}</span>
                                    </div>
                                    <span>
                                        <kbd className="px-2 py-1 rounded bg-foreground/10">{commandPaletteContent.keyboardHints.open.keys}</kbd> {commandPaletteContent.keyboardHints.open.label}
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
