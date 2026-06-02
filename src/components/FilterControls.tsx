"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { FaTimes } from "react-icons/fa";

interface FilterOption {
    label: string;
    value: string;
}

interface FilterControlsProps {
    options: FilterOption[];
    activeFilter: string;
    onFilterChange: (filter: string) => void;
    label?: string;
}

export default function FilterControls({
    options,
    activeFilter,
    onFilterChange,
    label = "Filter by"
}: FilterControlsProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const hasActiveFilter = activeFilter !== "All" && activeFilter !== "";

    return (
        <div className="space-y-3">
            {label && (
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide">
                        {label}
                    </h3>
                    {hasActiveFilter && (
                        <button
                            onClick={() => onFilterChange("All")}
                            className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
                        >
                            <FaTimes size={10} />
                            Clear
                        </button>
                    )}
                </div>
            )}

            <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                    <motion.button
                        key={option.value}
                        onClick={() => onFilterChange(option.value)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`
                            px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                            ${activeFilter === option.value
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                : isDark
                                    ? "bg-white/5 text-foreground hover:bg-white/10 border border-white/10"
                                    : "bg-white text-foreground hover:bg-gray-50 border border-black/5 shadow-sm"
                            }
                        `}
                    >
                        {option.label}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
