import { motion } from "framer-motion";

const SectionDivider = () => {
    return (
        <div className="relative w-full py-8 flex items-center justify-center overflow-hidden">
            {/* Animated Gradient Line */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="relative w-full max-w-6xl h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
            >
                {/* Glowing Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm" />

                {/* Animated Pulse Dots */}
                <motion.div
                    animate={{
                        x: ["-100%", "100%"],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute top-1/2 left-0 w-2 h-2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.8)]"
                />
            </motion.div>

            {/* Center Diamond Ornament */}
            <motion.div
                initial={{ scale: 0, rotate: 0 }}
                whileInView={{ scale: 1, rotate: 45 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, ease: "backOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/50 z-10"
            >
                {/* Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent blur-md opacity-60" />
            </motion.div>

            {/* Side Decorative Elements */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute left-[10%] top-1/2 -translate-y-1/2 flex gap-1"
            >
                <div className="w-1 h-1 rounded-full bg-primary/60" />
                <div className="w-1 h-1 rounded-full bg-primary/40" />
                <div className="w-1 h-1 rounded-full bg-primary/20" />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute right-[10%] top-1/2 -translate-y-1/2 flex gap-1"
            >
                <div className="w-1 h-1 rounded-full bg-primary/20" />
                <div className="w-1 h-1 rounded-full bg-primary/40" />
                <div className="w-1 h-1 rounded-full bg-primary/60" />
            </motion.div>
        </div>
    );
};

export default SectionDivider;
