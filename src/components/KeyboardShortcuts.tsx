"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { FaKeyboard, FaTimes } from "react-icons/fa";

export default function KeyboardShortcuts() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "?" && !e.metaKey && !e.ctrlKey && !e.altKey && (e.target as HTMLElement).tagName !== "INPUT" && (e.target as HTMLElement).tagName !== "TEXTAREA") {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    const shortcuts = [
        { key: "⌘/Ctrl + K", description: "Open Command Palette" },
        { key: "?", description: "Toggle Shortcuts" },
        { key: "Esc", description: "Close Modals" },
        { key: "↑ / ↓", description: "Navigate Lists" },
        { key: "Enter", description: "Select Item" },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`
                                pointer-events-auto w-full max-w-md p-6 rounded-2xl border shadow-2xl
                                ${isDark ? "bg-gray-900 border-white/10" : "bg-white border-black/5"}
                            `}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold flex items-center gap-2">
                                    <FaKeyboard className="text-primary" /> Keyboard Shortcuts
                                </h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-full hover:bg-foreground/10 transition-colors"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="space-y-3">
                                {shortcuts.map((shortcut, index) => (
                                    <div
                                        key={index}
                                        className={`
                                            flex items-center justify-between p-3 rounded-lg
                                            ${isDark ? "bg-white/5" : "bg-black/5"}
                                        `}
                                    >
                                        <span className="text-foreground/80 font-medium">
                                            {shortcut.description}
                                        </span>
                                        <kbd className={`
                                            px-2 py-1 rounded text-sm font-mono font-bold
                                            ${isDark ? "bg-black/40 text-primary" : "bg-white text-primary border border-black/10"}
                                        `}>
                                            {shortcut.key}
                                        </kbd>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
