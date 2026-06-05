import { motion } from "framer-motion";

const SectionDivider = () => {
  return (
    <div
      className="relative w-full py-16 flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      {/* Light-mode surface so the divider has depth on white backgrounds */}
      <div className="absolute inset-x-0 top-1/2 h-32 -translate-y-1/2 bg-gradient-to-b from-transparent via-secondary/80 to-transparent opacity-90 pointer-events-none dark:hidden" />

      {/* Background Glow for Ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-24 rounded-full pointer-events-none bg-gradient-to-r from-primary/12 via-accent/10 to-primary/12 blur-[80px] opacity-90 dark:from-primary/10 dark:via-accent/10 dark:to-primary/10 dark:blur-[90px] dark:opacity-100" />

      <div className="relative w-full max-w-[90vw] flex items-center justify-center">
        <div className="absolute inset-x-[5vw] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-border to-transparent opacity-80 pointer-events-none dark:via-primary/15" />

        {/* Left Energy Beam */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="flex-1 h-[1px] bg-gradient-to-l from-primary/80 via-accent/45 to-transparent origin-right dark:from-primary dark:via-primary/50"
        />

        {/* Central Core Complex */}
        <div className="relative mx-4 flex h-14 w-14 items-center justify-center rounded-full bg-background/85 shadow-[0_10px_35px_rgba(15,23,42,0.08),0_0_30px_rgba(6,182,212,0.18)] ring-1 ring-border/70 backdrop-blur-sm dark:h-auto dark:w-auto dark:bg-transparent dark:shadow-none dark:ring-0 dark:backdrop-blur-0">
          {/* Outer Rotating Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 rounded-full border border-primary/40 border-t-primary border-r-transparent shadow-[0_0_18px_rgba(6,182,212,0.25)] dark:border-primary/30 dark:shadow-[0_0_15px_rgba(34,211,238,0.3)]"
          />

          {/* Inner Counter-Rotating Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            className="absolute w-5 h-5 rounded-full border border-accent/50 border-b-accent border-l-transparent dark:border-accent/40"
          />

          {/* Core Singularity */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(6,182,212,0.65)] dark:bg-white dark:shadow-[0_0_10px_rgba(255,255,255,0.8)]"
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
          className="flex-1 h-[1px] bg-gradient-to-r from-primary/80 via-accent/45 to-transparent origin-left dark:from-primary dark:via-primary/50"
        />

        {/* Floating Data Particles along the line */}
        <motion.div
          initial={{ x: "-40vw", opacity: 0 }}
          whileInView={{ x: "40vw", opacity: [0, 1, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1,
          }}
          className="absolute top-1/2 -translate-y-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-primary/70 to-transparent blur-[1px] dark:via-white"
        />
      </div>
    </div>
  );
};

export default SectionDivider;
