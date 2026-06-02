import { motion } from "framer-motion";

const SectionDivider = () => {
    return (
        <div className="relative w-full py-16 flex items-center justify-center overflow-hidden">
            {/* Background Glow for Ambiance */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-24 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative w-full max-w-[90vw] flex items-center justify-center">

                {/* Left Energy Beam */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="flex-1 h-[1px] bg-gradient-to-l from-primary via-primary/50 to-transparent origin-right"
                />

                {/* Central Core Complex */}
                <div className="relative mx-4 flex items-center justify-center">
                    {/* Outer Rotating Ring */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 rounded-full border border-primary/30 border-t-primary border-r-transparent shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]"
                    />

                    {/* Inner Counter-Rotating Ring */}
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                        className="absolute w-5 h-5 rounded-full border border-accent/40 border-b-accent border-l-transparent"
                    />

                    {/* Core Singularity */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                    />

                    {/* Orbiting Particles */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute w-12 h-12"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full blur-[1px]" />
                    </motion.div>
                </div>

                {/* Right Energy Beam */}
                <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="flex-1 h-[1px] bg-gradient-to-r from-primary via-primary/50 to-transparent origin-left"
                />

                {/* Floating Data Particles along the line */}
                <motion.div
                    initial={{ x: "-40vw", opacity: 0 }}
                    whileInView={{ x: "40vw", opacity: [0, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                    className="absolute top-1/2 -translate-y-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent blur-[1px]"
                />
            </div>
        </div>
    );
};

export default SectionDivider;
