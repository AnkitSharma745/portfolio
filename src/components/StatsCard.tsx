"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { IconType } from "react-icons";

interface StatsCardProps {
    icon: IconType;
    value: number;
    label: string;
    suffix?: string;
    prefix?: string;
    delay?: number;
    gradient?: string;
}

export default function StatsCard({
    icon: Icon,
    value,
    label,
    suffix = "",
    prefix = "",
    delay = 0,
    gradient = "from-primary via-cyan-400 to-accent"
}: StatsCardProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const duration = 2000; // 2 seconds
            const increment = end / (duration / 16); // 60fps

            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.02 }}
            className="relative p-6 rounded-xl border overflow-hidden group bg-white dark:bg-white/5 border-black/5 dark:border-white/10 hover:border-primary/50 hover:bg-white/10 hover:dark:bg-white/10 shadow-lg dark:shadow-none"
        >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

            <div className="relative z-10 flex flex-col items-center text-center">
                {/* Icon */}
                <div className={`text-4xl mb-3 bg-gradient-to-r ${gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                    <Icon />
                </div>

                {/* Animated Counter */}
                <div className="text-3xl md:text-4xl font-bold mb-2">
                    {prefix}{count.toLocaleString()}{suffix}
                </div>

                {/* Label */}
                <div className="text-sm text-foreground/60 font-medium">
                    {label}
                </div>
            </div>
        </motion.div>
    );
}
