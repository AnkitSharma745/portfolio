"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaExclamationTriangle, FaRedo } from "react-icons/fa";
import { useTheme } from "next-themes";
import GradientText from "@/components/GradientText";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    // Log error to error reporting service
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Icon */}
          <div className="text-6xl md:text-8xl mb-6 flex justify-center">
            <FaExclamationTriangle className="text-yellow-500" />
          </div>

          {/* Message */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <GradientText>Something went wrong!</GradientText>
          </h1>
          <p className="text-lg text-foreground/70 mb-8">
            We encountered an unexpected error. Don&apos;t worry, it&apos;s not
            your fault.
          </p>

          {/* Error Details (Development only) */}
          {process.env.NODE_ENV === "development" && (
            <div
              className={`
                                mb-8 p-4 rounded-lg text-left text-sm font-mono overflow-auto max-h-40
                                ${isDark ? "bg-white/5" : "bg-black/5"}
                            `}
            >
              <p className="text-red-500">{error.message}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={reset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2 justify-center"
            >
              <FaRedo />
              Try Again
            </motion.button>
            <motion.button
              onClick={() => (window.location.href = "/")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                                px-8 py-3 rounded-full font-medium transition-all flex items-center gap-2 justify-center border
                                ${isDark
                  ? "border-white/20 hover:bg-white/10"
                  : "border-black/20 hover:bg-black/5"
                }
                            `}
            >
              Go Home
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
