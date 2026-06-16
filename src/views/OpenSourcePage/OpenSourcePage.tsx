"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowLeft, FaGithub, FaCodeBranch, FaLaptopCode } from "react-icons/fa";
import GradientText from "@/components/GradientText";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function OpenSourcePage() {
    return (
        <PageTransition>
            <main className="min-h-screen bg-background text-foreground relative overflow-hidden pt-24 pb-10 flex flex-col">
                <div className="container mx-auto px-6">
                    <Breadcrumbs />
                </div>
                
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <ParticlesBackground />
                </div>

                <div className="relative z-10 container mx-auto px-6 flex-grow flex flex-col justify-center mt-10">
                    {/* Back Navigation */}
                    <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left Side - Text & CTA */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center lg:text-left"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium mb-8">
                                <FaCodeBranch /> Actively Building
                            </div>
                            
                            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-tight">
                                Building in the <br />
                                <GradientText>Open Source</GradientText>
                            </h1>
                            
                            <p className="text-xl text-foreground/70 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
                                I strongly believe in the power of open-source software. While I am currently curating and documenting my latest open-source contributions for this portfolio, I am actively building, exploring, and collaborating on GitHub every day.
                                <br /><br />
                                Check out my GitHub profile to explore my active repositories, recent commits, and the technologies I'm working with right now!
                            </p>

                            <a
                                href="https://github.com/ankitsharma745"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 rounded-full bg-foreground text-background font-bold text-lg hover:opacity-90 transition-opacity flex items-center gap-3 shadow-2xl shadow-foreground/20"
                                >
                                    <FaGithub size={24} />
                                    Explore My GitHub
                                </motion.button>
                            </a>
                        </motion.div>

                        {/* Right Side - Visual / Graphic */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative flex justify-center items-center"
                        >
                            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
                                {/* Glowing Background Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-[80px] animate-pulse-slow" />
                                
                                {/* Big GitHub Icon */}
                                <div className="relative w-full h-full rounded-full border-2 border-white/5 bg-black/5 dark:bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                                    <FaGithub className="text-[180px] sm:text-[240px] text-foreground/80 drop-shadow-2xl hover:scale-110 transition-transform duration-500" />
                                </div>

                                {/* Floating Elements */}
                                <motion.div 
                                    animate={{ y: [0, -20, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-6 -right-6 w-20 h-20 bg-primary/20 backdrop-blur-md rounded-2xl border border-primary/30 flex items-center justify-center rotate-12"
                                >
                                    <FaCodeBranch size={32} className="text-primary" />
                                </motion.div>
                                
                                <motion.div 
                                    animate={{ y: [0, 20, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute -bottom-10 -left-6 w-24 h-24 bg-accent/20 backdrop-blur-md rounded-full border border-accent/30 flex items-center justify-center -rotate-12"
                                >
                                    <FaLaptopCode size={40} className="text-accent" />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </PageTransition>
    );
}
