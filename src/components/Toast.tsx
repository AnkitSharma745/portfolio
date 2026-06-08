"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from "react-icons/fa";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
    message: string;
    type: ToastType;
    isVisible: boolean;
    onClose: () => void;
}

export default function Toast({ message, type, isVisible, onClose }: ToastProps) {
    const icons = {
        success: <FaCheckCircle className="text-green-500" />,
        error: <FaExclamationCircle className="text-red-500" />,
        info: <FaInfoCircle className="text-blue-500" />
    };

    const bgColors = {
        success: "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20",
        error: "bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20",
        info: "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20"
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -50, scale: 0.9 }}
                    className="fixed top-4 right-4 z-50 max-w-md"
                >
                    <div
                        className={`
                            flex items-center gap-3 p-4 rounded-lg border shadow-lg backdrop-blur-sm
                            ${bgColors[type]}
                            bg-white/90 dark:bg-gray-900/90
                        `}
                    >
                        <span className="text-2xl">{icons[type]}</span>
                        <p className="flex-1 font-medium">{message}</p>
                        <button
                            onClick={onClose}
                            className="p-1 rounded-lg hover:bg-foreground/10 transition-colors"
                        >
                            <FaTimes className="text-foreground/60" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
