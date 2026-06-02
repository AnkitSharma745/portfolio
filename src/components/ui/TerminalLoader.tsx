"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Fragment {
    top: string;
    left: string;
    rotate: string;
    id: string;
}

const TerminalLoader = () => {
    const [lines, setLines] = useState<string[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
    const [fragments, setFragments] = useState<Fragment[]>([]);
    const [memPercent, setMemPercent] = useState<number>(45);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMemPercent(Math.floor(Math.random() * 50) + 20);
        // Check if loader has already run in this session
        const hasRun = sessionStorage.getItem("terminal_loader_shown");
        if (hasRun) {
            setShowLoader(false);
            return;
        }

        const bootSequence = [
            "> Initializing system...",
            "> Boot sequence: Portfolio v3.0.1",
            "> Running environment diagnostics...",
            "> CPU.........OK",
            "> Memory......OK",
            "> GPU.........OK",
            "> Network.....Secured",
            "> Establishing encrypted connection...",
            "> Handshake complete.",
            "> Decrypting personal workspace modules...",
            "> Loading developer profile...",
            "> Authenticating user...",
            "> Welcome, Operator.",
            "> Access Level: Root",
            "> Preparing interface...",
        ];

        let currentLine = 0;

        const addLine = () => {
            if (currentLine >= bootSequence.length) {
                setTimeout(() => {
                    setIsComplete(true);
                    setTimeout(() => {
                        setShowLoader(false);
                        sessionStorage.setItem("terminal_loader_shown", "true");
                    }, 800); // Wait for exit animation
                }, 500);
                return;
            }

            setLines((prev) => [...prev, bootSequence[currentLine]]);

            // Auto-scroll to bottom
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }

            // Reduced delay for faster loading
            const nextDelay = Math.random() * 150 + 50;
            currentLine++;
            setTimeout(addLine, nextDelay);
        };

        // Start sequence
        setTimeout(addLine, 100);

    }, []);

    // Matrix/Data fragments background effect
    const [randomChars, setRandomChars] = useState<string[]>([]);
    useEffect(() => {
        if (!showLoader) return;

        // Initialize background fragments style
        const initialFragments = Array.from({ length: 5 }).map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            rotate: `${Math.random() * 360}deg`,
            id: Math.random().toString(16).substring(2)
        }));
        setFragments(initialFragments);

        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
        const interval = setInterval(() => {
            const newChars = Array.from({ length: 10 }, () =>
                chars.charAt(Math.floor(Math.random() * chars.length))
            );
            setRandomChars(newChars);
        }, 100);
        return () => clearInterval(interval);
    }, [showLoader]);

    if (!showLoader) return null;

    return (
        <AnimatePresence>
            {!isComplete || showLoader ? (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-black text-cyan-500 font-mono overflow-hidden flex flex-col items-center justify-center"
                >
                    {/* CRT Scanline Effect */}
                    <div className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20"></div>

                    {/* CRT Glow */}
                    <div className="absolute inset-0 pointer-events-none z-0 shadow-[inset_0_0_100px_rgba(0,255,255,0.1)]"></div>

                    {/* Background Data Fragments */}
                    <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                        {fragments.map((frag, i) => (
                            <div
                                key={i}
                                className="absolute text-xs text-green-500 whitespace-nowrap animate-pulse"
                                style={{
                                    top: frag.top,
                                    left: frag.left,
                                    transform: `rotate(${frag.rotate})`
                                }}
                            >
                                {randomChars.join("")} {frag.id}
                            </div>
                        ))}
                    </div>

                    {/* Main Terminal Window */}
                    <div className="relative z-20 w-full max-w-2xl p-8 border border-cyan-500/30 bg-black/80 backdrop-blur-sm rounded-lg shadow-[0_0_30px_rgba(0,255,255,0.2)]">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-4 border-b border-cyan-500/30 pb-2">
                            <span className="text-xs uppercase tracking-widest text-cyan-300">Terminal v3.0.1</span>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div
                            ref={scrollRef}
                            className="h-64 overflow-y-auto font-mono text-sm md:text-base space-y-1 scrollbar-hide"
                        >
                            {lines.map((line, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-cyan-400"
                                >
                                    <span className="mr-2 text-cyan-600">➜</span>
                                    {line}
                                </motion.div>
                            ))}
                            <div className="animate-pulse text-cyan-500">_</div>
                        </div>

                        {/* Footer Status */}
                        <div className="mt-4 pt-2 border-t border-cyan-500/30 flex justify-between text-xs text-cyan-600">
                            <span>STATUS: {isComplete ? "READY" : "LOADING..."}</span>
                            <span>MEM: {memPercent}%</span>
                        </div>
                    </div>

                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};

export default TerminalLoader;
