"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import GitHubCalendar from "react-github-calendar";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import GradientText from "@/components/GradientText";
import { githubJourneyContent } from "@/content/github/journey";
import {
  getFallbackGitHubJourneyData,
  loadGitHubJourneyData,
  type GitHubJourneyData,
} from "@/lib/githubJourney";
import { useTheme } from "next-themes";
import { TOP_GITHUB_REPOSITORY } from "@/content/github/journey";
import ProfileHeader from "./_components/ProfileHeader";
import RepositoryCard from "./_components/RepositoryCard";

export default function GithubJourneySection() {
  const [data, setData] = useState<GitHubJourneyData>(() =>
    getFallbackGitHubJourneyData(),
  );
  const { theme } = useTheme();
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2022 + 1 },
    (_, i) => currentYear - i,
  );
  const [year, setYear] = useState<number | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    loadGitHubJourneyData()
      .then((nextData) => {
        if (!cancelled) {
          setData(nextData);
          setStatus("ready");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStatus("error");
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="github-journey"
      className="bg-background px-4 py-16 text-foreground transition-colors duration-500 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 sm:gap-8">
        <motion.div
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-primary backdrop-blur-sm sm:px-4 sm:text-xs sm:tracking-[0.18em]">
            <Sparkles className="h-3.5 w-3.5" />
            {githubJourneyContent.eyebrow}
          </div>
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            GitHub <GradientText>Journey</GradientText>
          </h2>
          <p className="mt-4 text-sm leading-7 text-foreground/65 sm:text-base">
            {githubJourneyContent.intro}
          </p>
        </motion.div>

        <motion.article
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="group/profile relative overflow-hidden rounded-2xl border border-border/40 bg-background/55 p-4 shadow-xl shadow-black/[0.06] backdrop-blur-xl transition-all duration-500 hover:border-border/80 hover:shadow-2xl dark:border-white/10 dark:bg-white/[0.045] dark:shadow-primary/[0.03] sm:rounded-[2rem] sm:p-7 lg:p-9"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-60" />
          <div className="pointer-events-none absolute left-8 top-8 h-32 w-32 rounded-full border border-primary/15 opacity-40" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 translate-x-1/3 translate-y-1/3 rounded-full border border-accent/20 opacity-40" />

          <div className="relative z-10 items-center space-y-6 sm:space-y-8">
            <ProfileHeader data={data} status={status} />

            <div className="mb-6 mt-4 flex w-full flex-col items-center justify-center gap-4 sm:mb-8 sm:mt-6 lg:flex-row lg:gap-6">
              <Image
                src={`https://streak-stats.demolab.com?user=ankitsharma745&theme=${
                  theme === "dark" ? "dark" : "default"
                }&hide_border=true&date_format=j%20M%5B%20Y%5D`}
                alt="GitHub Streak"
                width={895}
                height={300}
                className="h-auto w-full rounded-xl shadow-xl lg:w-2/3"
                unoptimized
              />
              <div className="flex h-full w-full flex-col items-center justify-center rounded-xl border border-border/50 bg-background/50 p-4 shadow-xl dark:border-white/10 dark:bg-black/20 sm:p-6 lg:w-1/3">
                <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-foreground/50 sm:text-sm">Profile Views</h3>
                <Image
                  src={`https://komarev.com/ghpvc/?username=ankitsharma745&color=${theme === "dark" ? "7E6BFF" : "6C63FF"}&style=flat-square&label=VIEWS`}
                  alt="Profile Views"
                  width={200}
                  height={50}
                  className="rounded-md shadow-sm w-auto h-auto"
                  unoptimized
                />
              </div>
            </div>

            <div className="w-full space-y-4 border-t border-border/20 pt-4 dark:border-white/5 sm:space-y-6">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground sm:text-xl">Top Repositories</h3>
              </div>
              <div className="grid grid-cols-1 justify-items-center gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {TOP_GITHUB_REPOSITORY.length > 0 &&
                  TOP_GITHUB_REPOSITORY.map((repository, index) => (
                    <RepositoryCard
                      key={repository.fullName + index}
                      repository={repository}
                      index={index}
                    />
                  ))}
              </div>
            </div>
          </div>
        </motion.article>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full text-center"
        >
          <h3
            className="mb-4 text-xl font-semibold text-gray-800 dark:text-white sm:text-2xl"
          >
            Contribution Calendar {year && ` - ${year}`}
          </h3>

          <div className="mb-6 flex flex-wrap justify-center gap-2 sm:gap-3">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={`rounded-full px-3 py-1 text-sm font-medium transition duration-300 ${year === y
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-purple-500/20 hover:text-zinc-50"
                  }`}
              >
                {y}
              </button>
            ))}
            <button
              onClick={() => setYear(undefined)}
              className="ml-1 text-sm text-cyan-500 underline hover:cursor-pointer sm:ml-2 sm:text-base"
            >
              Clear
            </button>
          </div>

          <div
            className="w-full overflow-x-auto scrollbar-thumb-[#6C63FF] scrollbar-track-transparent"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div
              className="min-w-[720px] rounded-lg bg-white p-3 text-blue-50 shadow-xl dark:bg-[#1d3335] sm:min-w-0 sm:p-4"
            >
              <GitHubCalendar
                username="ankitsharma745"
                year={year}
                blockSize={14}
                blockMargin={5}
                colorScheme={theme === 'dark' ? "dark" : "light"}
                theme={{
                  light: ["#eee", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
                  dark: ["#1f2937", "#6C63FF", "#7E6BFF", "#9F8BFF", "#C9BBCF"],
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
