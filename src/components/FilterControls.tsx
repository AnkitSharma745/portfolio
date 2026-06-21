"use client";

import { motion } from "framer-motion";
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
                            min-h-10 rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-300 sm:px-4
                            ${activeFilter === option.value
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                : "bg-white dark:bg-white/5 text-foreground hover:bg-gray-50 hover:dark:bg-white/10 border border-black/5 dark:border-white/10 shadow-sm"
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
