"use client";

import { useScrollNavigation, SECTIONS } from "@/hooks/useScrollNavigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function NextSectionSuggestion() {
    const { activeSection, navigateTo, isHome } = useScrollNavigation();

    if (!isHome) return null;

    const currentIndex = SECTIONS.indexOf(activeSection);
    const nextSection = SECTIONS[currentIndex + 1];

    if (!nextSection) return null;

    const handleNextClick = () => {
        navigateTo(`/#${nextSection}`);
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 hidden md:flex flex-col items-center gap-2 cursor-pointer group"
                onClick={handleNextClick}
            >
                <span className="text-xs font-medium text-foreground/60 group-hover:text-primary transition-colors uppercase tracking-widest">
                    Next: {nextSection}
                </span>
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="p-2 rounded-full bg-secondary/50 backdrop-blur-sm border border-white/10 group-hover:border-primary/50 transition-colors"
                >
                    <ChevronDown size={20} className="text-foreground group-hover:text-primary" />
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
