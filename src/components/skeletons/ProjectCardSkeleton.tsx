"use client";

import { useTheme } from "next-themes";
import Skeleton from "./Skeleton";

export default function ProjectCardSkeleton() {
    const { theme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div
            className={`
                rounded-xl overflow-hidden border
                ${isDark ? "bg-white/5 border-white/10" : "bg-white border-black/5"}
            `}
        >
            {/* Image Skeleton */}
            <Skeleton height="192px" rounded="sm" />

            {/* Content */}
            <div className="p-6 space-y-4">
                {/* Title */}
                <Skeleton height="24px" width="80%" />

                {/* Company */}
                <Skeleton height="16px" width="40%" />

                {/* Description */}
                <div className="space-y-2">
                    <Skeleton height="14px" width="100%" />
                    <Skeleton height="14px" width="90%" />
                </div>

                {/* Tech Stack */}
                <div className="flex gap-2">
                    <Skeleton height="24px" width="60px" rounded="md" />
                    <Skeleton height="24px" width="70px" rounded="md" />
                    <Skeleton height="24px" width="80px" rounded="md" />
                </div>
            </div>
        </div>
    );
}
