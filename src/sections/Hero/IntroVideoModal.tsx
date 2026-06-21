import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaSpinner } from "react-icons/fa";

interface IntroVideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    videoSrc: string;
}

const IntroVideoModal: React.FC<IntroVideoModalProps> = ({
    isOpen,
    onClose,
    videoSrc,
}) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
                    >
                        {/* Modal Container */}
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-label="Introduction Video"
                            initial={{ scale: 0.5, opacity: 0, y: 100 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.5, opacity: 0, y: 100 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(var(--primary-rgb),0.3)] border border-white/10 group"
                        >
                            {/* Glowing Border Effect */}
                            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20 group-hover:ring-primary/50 transition-all duration-500 pointer-events-none z-20" />

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                aria-label="Close video"
                                className="absolute top-4 right-4 z-30 p-2 bg-black/50 hover:bg-primary/80 text-white rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 group/close"
                            >
                                <FaTimes className="text-xl group-hover/close:rotate-90 transition-transform duration-300" />
                            </button>

                            {/* Loading State */}
                            {isLoading && (
                                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-900/90 backdrop-blur-sm">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    >
                                        <FaSpinner className="text-5xl text-primary" />
                                    </motion.div>
                                    <motion.p
                                        initial={{ opacity: 0.5 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                                        className="mt-4 text-white/80 font-medium tracking-wider"
                                    >
                                        LOADING EXPERIENCE...
                                    </motion.p>
                                </div>
                            )}

                            {/* Video Player */}
                            <video
                                src={videoSrc}
                                className="w-full h-full object-cover"
                                controls
                                autoPlay
                                playsInline
                                onLoadedData={() => setIsLoading(false)}
                                onWaiting={() => setIsLoading(true)}
                                onPlaying={() => setIsLoading(false)}
                            >
                                Your browser does not support the video tag.
                            </video>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default IntroVideoModal;
