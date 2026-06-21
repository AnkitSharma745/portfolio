"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import PageTransition from "@/components/PageTransition";
import { motion } from "framer-motion";
import { FaGithub, FaCodeBranch, FaLaptopCode } from "react-icons/fa";
import GradientText from "@/components/GradientText";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function OpenSourcePage() {
    return (
        <PageTransition>
            <main className="relative flex min-h-screen flex-col overflow-hidden bg-background pb-14 pt-24 text-foreground sm:pb-16">
                <div className="container mx-auto px-4 sm:px-6">
                    <Breadcrumbs />
                </div>
                
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <ParticlesBackground />
                </div>

                <div className="container relative z-10 mx-auto mt-6 flex flex-grow flex-col justify-center px-4 sm:mt-10 sm:px-6">
                    {/* Back Navigation */}
                    <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-16">
                        {/* Left Side - Text & CTA */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center lg:text-left"
                        >
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-2 text-sm font-medium text-primary sm:mb-8 sm:px-4 sm:text-base">
                                <FaCodeBranch /> Actively Building
                            </div>
                            
                            <h1 className="mb-5 text-3xl font-extrabold leading-tight sm:mb-6 sm:text-5xl md:text-7xl">
                                Building in the <br />
                                <GradientText>Open Source</GradientText>
                            </h1>
                            
                            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-foreground/70 sm:mb-10 sm:text-lg sm:leading-8 md:text-xl lg:mx-0">
                                I strongly believe in the power of open-source software. While I am currently curating and documenting my latest open-source contributions for this portfolio, I am actively building, exploring, and collaborating on GitHub every day.
                                <br /><br />
                                Check out my GitHub profile to explore my active repositories, recent commits, and the technologies I&apos;m working with right now!
                            </p>

                            <a
                                href="https://github.com/ankitsharma745"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-full justify-center sm:w-auto"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex min-h-12 w-full max-w-sm items-center justify-center gap-3 rounded-full bg-foreground px-6 py-3 text-base font-bold text-background shadow-2xl shadow-foreground/20 transition-opacity hover:opacity-90 sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
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
                            className="relative flex items-center justify-center"
                        >
                            <div className="relative h-56 w-56 min-[380px]:h-64 min-[380px]:w-64 sm:h-96 sm:w-96">
                                {/* Glowing Background Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-[80px] animate-pulse-slow" />
                                
                                {/* Big GitHub Icon */}
                                <div className="relative flex h-full w-full items-center justify-center rounded-full border-2 border-white/5 bg-black/5 shadow-2xl backdrop-blur-sm dark:bg-white/5">
                                    <FaGithub className="text-[132px] text-foreground/80 drop-shadow-2xl transition-transform duration-500 hover:scale-110 min-[380px]:text-[160px] sm:text-[240px]" />
                                </div>

                                {/* Floating Elements */}
                                <motion.div 
                                    animate={{ y: [0, -20, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -right-3 -top-4 flex h-14 w-14 rotate-12 items-center justify-center rounded-2xl border border-primary/30 bg-primary/20 backdrop-blur-md sm:-right-6 sm:-top-6 sm:h-20 sm:w-20"
                                >
                                    <FaCodeBranch className="h-6 w-6 text-primary sm:h-8 sm:w-8" />
                                </motion.div>
                                
                                <motion.div 
                                    animate={{ y: [0, 20, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute -bottom-6 -left-3 flex h-16 w-16 -rotate-12 items-center justify-center rounded-full border border-accent/30 bg-accent/20 backdrop-blur-md sm:-bottom-10 sm:-left-6 sm:h-24 sm:w-24"
                                >
                                    <FaLaptopCode className="h-7 w-7 text-accent sm:h-10 sm:w-10" />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
        </PageTransition>
    );
}
