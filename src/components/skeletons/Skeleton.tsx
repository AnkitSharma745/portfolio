"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface SkeletonProps {
    className?: string;
    width?: string;
    height?: string;
    rounded?: "sm" | "md" | "lg" | "full";
}

export default function Skeleton({
    className = "",
    width = "100%",
    height = "20px",
    rounded = "md"
}: SkeletonProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const roundedClass = {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full"
    }[rounded];

    return (
        <motion.div
            className={`
                ${roundedClass}
                ${isDark ? "bg-white/10" : "bg-black/5"}
                ${className}
            `}
            style={{ width, height }}
            animate={{
                opacity: [0.5, 1, 0.5]
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    );
}
