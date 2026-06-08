"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaHome, FaSearch } from "react-icons/fa";
import GradientText from "@/components/GradientText";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-background">
            <div className="max-w-2xl w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* 404 Number */}
                    <h1 className="text-9xl md:text-[200px] font-bold mb-4">
                        <GradientText>404</GradientText>
                    </h1>

                    {/* Message */}
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-lg text-foreground/70 mb-8">
                        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2 justify-center w-full sm:w-auto"
                            >
                                <FaHome />
                                Back to Home
                            </motion.button>
                        </Link>
                        <Link href="/projects">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 rounded-full font-medium transition-all flex items-center gap-2 justify-center w-full sm:w-auto border border-black/20 dark:border-white/20 hover:bg-black/5 hover:dark:bg-white/10"
                            >
                                <FaSearch />
                                Browse Projects
                            </motion.button>
                        </Link>
                    </div>

                    {/* Suggestions */}
                    <div className="mt-12">
                        <p className="text-sm text-foreground/60 mb-4">You might be interested in:</p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {[
                                { label: "About", href: "/about" },
                                { label: "Experience", href: "/experience" },
                                { label: "Projects", href: "/projects" },
                                { label: "Open Source", href: "/open-source" },
                                { label: "Blog", href: "/blog" }
                            ].map((link) => (
                                <Link key={link.href} href={link.href}>
                                    <span className="text-sm px-4 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors cursor-pointer">
                                        {link.label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
