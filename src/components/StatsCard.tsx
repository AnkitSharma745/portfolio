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
            className="group relative overflow-hidden rounded-xl border border-black/5 bg-white p-4 shadow-lg hover:border-primary/50 hover:bg-white/10 dark:border-white/10 dark:bg-white/5 dark:shadow-none hover:dark:bg-white/10 sm:p-5 md:p-6"
        >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

            <div className="relative z-10 flex flex-col items-center text-center">
                {/* Icon */}
                <div className={`mb-2 bg-gradient-to-r ${gradient} bg-clip-text text-3xl text-transparent transition-transform duration-300 group-hover:scale-110 sm:mb-3 sm:text-4xl`}>
                    <Icon />
                </div>

                {/* Animated Counter */}
                <div className="mb-1 text-2xl font-bold sm:mb-2 sm:text-3xl md:text-4xl">
                    {prefix}{count.toLocaleString()}{suffix}
                </div>

                {/* Label */}
                <div className="text-xs font-medium leading-snug text-foreground/60 sm:text-sm">
                    {label}
                </div>
            </div>
        </motion.div>
    );
}
