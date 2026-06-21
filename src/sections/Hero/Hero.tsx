"use client";
import { useState } from "react";
import TypeWriter from "@/components/Typewriter";
import { FaDownload, FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import { onDownloadResume } from "@/lib/utils/download";
import GradientText from "@/components/GradientText";
import IntroVideoModal from "@/sections/Hero/IntroVideoModal";
import { HEADLINE_FOR_TYPEWRITER } from "@/content/hero/headlines";

const Home = () => {
  const ProfileImage = "/assets/images/ankit.png";
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);

  return (
    <>
      <section
        id="home"
        className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-background px-4 pb-14 pt-24 sm:px-6 sm:pt-28 md:px-8 lg:pb-0 lg:pt-32"
      >
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px] animate-pulse-slow" />
        </div>

        <IntroVideoModal
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
          videoSrc="https://www.pexels.com"
        />

        {/* Main Content Container */}
        <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-center justify-center gap-9 sm:gap-12 lg:flex-row lg:gap-20">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="z-10 flex-1 space-y-5 text-center sm:space-y-7 lg:text-left"
          >
            <h1 className="text-[2.6rem] font-extrabold leading-[1.04] tracking-tight text-foreground min-[380px]:text-5xl sm:text-5xl md:text-6xl lg:text-7xl">
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

            <div className="mx-auto flex h-[48px] max-w-[20rem] items-center justify-center text-lg font-medium leading-tight text-foreground/80 sm:h-[56px] sm:max-w-none sm:text-xl md:text-2xl lg:mx-0 lg:justify-start lg:text-3xl">
              <TypeWriter input={HEADLINE_FOR_TYPEWRITER} />
            </div>

            <p className="mx-auto max-w-[34rem] text-[15px] leading-7 text-foreground/70 sm:text-lg md:text-xl lg:mx-0">
              Building High-Performance Software, AI-Powered Solutions, and
              Scalable Digital Products that Drive Innovation and Real-World
              Impact.
            </p>

            <div className="mx-auto mt-7 flex w-full max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4 lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsVideoOpen(true)}
                className="flex min-h-12 items-center justify-center gap-3 rounded-full border border-border/50 bg-linear-to-r from-primary to-cyan-600 px-6 py-3 text-base font-bold text-foreground transition-all hover:border-primary/30 hover:bg-secondary/80 active:scale-95 sm:px-8 sm:py-4 sm:text-lg"
              >
                <FaPlay className="text-xl group-hover:scale-110 transition-transform" />{" "}
                Watch Intro
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDownloadResume}
                className="flex min-h-12 items-center justify-center gap-3 rounded-full border border-border/50 bg-secondary px-6 py-3 text-base font-bold text-foreground transition-all hover:border-primary/30 hover:bg-secondary/80 active:scale-95 sm:px-8 sm:py-4 sm:text-lg"
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
            className="relative z-10 flex flex-1 items-center justify-center"
          >
            <div className="relative h-52 w-52 animate-float min-[380px]:h-60 min-[380px]:w-60 sm:h-80 sm:w-80 md:h-96 md:w-96 lg:h-[450px] lg:w-[450px]">
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
