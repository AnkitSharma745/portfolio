"use client";
import { useState } from "react";
import TypeWriter from "@/components/Typewriter";
import { FaDownload, FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import { onDownloadResume } from "@/lib/utils/download";
import GradientText from "@/components/GradientText";
import IntroVideoModal from "@/components/IntroVideoModal";
import { HEADLINE_FOR_TYPEWRITER } from "@/lib/constants/general";

const Home = () => {
  const ProfileImage = "/assets/images/ankit.png";
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);

  return (
    <>
      <section
        id="home"
        className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 md:px-16 pt-32 pb-0 overflow-hidden bg-background"
      >
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px] animate-pulse-slow" />
        </div>

        <IntroVideoModal
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
          videoSrc="https://www.pexels.com/download/video/30339655/"
        />

        {/* Main Content Container */}
        <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-center gap-12 lg:gap-20">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 text-center lg:text-left space-y-8 z-10"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-foreground">
              Hey{" "}
              <motion.span
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                className="inline-block origin-bottom-right hover:scale-110 transition-transform cursor-default"
              >
                👋🏻
              </motion.span>
              , I&apos;m <br />
              <GradientText>Ankit Sharma</GradientText>
            </h1>

            <div className="text-xl md:text-2xl lg:text-3xl font-medium text-foreground/80 h-[60px]">
              <TypeWriter input={HEADLINE_FOR_TYPEWRITER} />
            </div>

            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Building High-Performance Software, AI-Powered Solutions, and
              Scalable Digital Products that Drive Innovation and Real-World
              Impact.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsVideoOpen(true)}
                className="px-8 py-4 rounded-full bg-linear-to-r from-primary to-cyan-600 text-foreground font-bold text-lg border border-border/50 flex items-center justify-center gap-3 hover:bg-secondary/80 hover:border-primary/30 transition-all active:scale-95"
                // className="px-8 py-4 rounded-full bg-linear-to-r from-primary to-cyan-600 text-white font-bold text-lg shadow-lg shadow-primary/25 flex items-center justify-center gap-3 hover:border-primary/30 transition-all"
              >
                <FaPlay className="text-xl group-hover:scale-110 transition-transform" />{" "}
                Watch Intro
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDownloadResume}
                className="px-8 py-4 rounded-full bg-secondary text-foreground font-bold text-lg border border-border/50 flex items-center justify-center gap-3 hover:bg-secondary/80 hover:border-primary/30 transition-all active:scale-95"
              >
                <FaDownload className="text-xl" /> Resume
              </motion.button>
            </div>
          </motion.div>

          {/* Right Section - Image with stunning effects */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex-1 flex justify-center items-center relative z-10"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] animate-float">
              {/* Glowing Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-full blur-[60px] animate-pulse-slow" />

              {/* Image Container with Gradient Border */}
              <div className="relative w-full h-full rounded-full p-[4px] bg-gradient-to-tr from-primary via-cyan-400 to-accent shadow-2xl shadow-primary/20">
                <div className="w-full h-full rounded-full overflow-hidden bg-background relative border-4 border-background">
                  <Image
                    src={ProfileImage}
                    alt="Profile"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-700"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent/20 rounded-full blur-xl animate-bounce delay-700" />
              <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-bounce delay-1000" />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
