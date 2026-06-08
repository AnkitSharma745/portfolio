"use client";

import { motion } from "framer-motion";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

interface SortOption {
    label: string;
    value: string;
}

interface SortControlsProps {
    options: SortOption[];
    activeSort: string;
    onSortChange: (sort: string) => void;
    ascending?: boolean;
    onToggleOrder?: () => void;
    label?: string;
}

export default function SortControls({
    options,
    activeSort,
    onSortChange,
    ascending = true,
    onToggleOrder,
    label = "Sort by"
}: SortControlsProps) {
    return (
        <div className="space-y-3">
            {label && (
                <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide">
                    {label}
                </h3>
            )}

            <div className="flex flex-wrap items-center gap-2">
                {/* Sort Options */}
                <div className="flex flex-wrap gap-2">
                    {options.map((option) => (
                        <motion.button
                            key={option.value}
                            onClick={() => onSortChange(option.value)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`
                                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                                ${activeSort === option.value
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                    : "bg-white dark:bg-white/5 text-foreground hover:bg-gray-50 hover:dark:bg-white/10 border border-black/5 dark:border-white/10 shadow-sm"
                                }
                            `}
                        >
                            {option.label}
                        </motion.button>
                    ))}
                </div>

                {/* Order Toggle */}
                {onToggleOrder && (
                    <motion.button
                        onClick={onToggleOrder}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-full bg-white dark:bg-white/5 text-foreground hover:bg-gray-50 hover:dark:bg-white/10 border border-black/5 dark:border-white/10 shadow-sm transition-all duration-300"
                        title={ascending ? "Ascending" : "Descending"}
                    >
                        {ascending ? <FaSortAmountUp size={16} /> : <FaSortAmountDown size={16} />}
                    </motion.button>
                )}
            </div>
        </div>
    );
}
