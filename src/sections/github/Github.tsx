"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import GitHubCalendar from "react-github-calendar";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  GitFork,
  Sparkles,
  Star,
} from "lucide-react";
import GradientText from "@/components/GradientText";
import { githubJourneyContent } from "@/content/portfolio/githubJourney";
import {
  formatAbsoluteDate,
  getFallbackGitHubJourneyData,
  loadGitHubJourneyData,
  type GitHubJourneyData,
  type GitHubRepository,
} from "@/lib/githubJourney";
import { FaGithub } from "react-icons/fa";
import { useTheme } from "next-themes";
import { TOP_GITHUB_REPOSITORY } from "@/content/portfolio/githubJourney";

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
      className="bg-background py-16 text-foreground transition-colors duration-500 md:py-24"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-6">
        <motion.div
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            {githubJourneyContent.eyebrow}
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            GitHub <GradientText>Journey</GradientText>
          </h2>
          <p className="mt-4 text-sm leading-7 text-foreground/65 sm:text-base">
            {githubJourneyContent.intro}
          </p>
        </motion.div>

        <motion.article
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="group/profile relative overflow-hidden rounded-[2rem] border border-border/40 bg-background/55 p-5 shadow-xl shadow-black/[0.06] backdrop-blur-xl transition-all duration-500 hover:border-border/80 hover:shadow-2xl dark:border-white/10 dark:bg-white/[0.045] dark:shadow-primary/[0.03] sm:p-7 lg:p-9"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-60" />
          <div className="pointer-events-none absolute left-8 top-8 h-32 w-32 rounded-full border border-primary/15 opacity-40" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 translate-x-1/3 translate-y-1/3 rounded-full border border-accent/20 opacity-40" />

          <div className="relative z-10 space-y-8 items-center">
            <ProfileHeader data={data} status={status} />

            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 w-full mt-6 mb-8">
              <Image
                src={`https://streak-stats.demolab.com?user=ankitsharma745&theme=${
                  theme === "dark" ? "dark" : "default"
                }&hide_border=true&date_format=j%20M%5B%20Y%5D`}
                alt="GitHub Streak"
                width={895}
                height={300}
                className="rounded-xl w-full lg:w-2/3 h-full shadow-xl"
                unoptimized
              />
              <div className="flex flex-col items-center justify-center w-full lg:w-1/3 bg-background/50 border border-border/50 rounded-xl p-6 shadow-xl dark:border-white/10 dark:bg-black/20 h-full">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/50 mb-4">Profile Views</h3>
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

            <div className="space-y-6 w-full pt-4 border-t border-border/20 dark:border-white/5">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold text-foreground">Top Repositories</h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
          className="text-center w-full"
        >
          <h3
            className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white"
          >
            Contribution Calendar {year && ` - ${year}`}
          </h3>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={`px-3 py-1 rounded-full font-medium transition duration-300 ${year === y
                  ? "bg-purple-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-purple-500/20 hover:text-zinc-50"
                  }`}
              >
                {y}
              </button>
            ))}
            <button
              onClick={() => setYear(undefined)}
              className="text-1xl underline text-cyan-500 ml-2 hover:cursor-pointer"
            >
              Clear
            </button>
          </div>

          <div
            className="w-full  scrollbar-thumb-[#6C63FF] scrollbar-track-transparent"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div
              className={`p-4 rounded-lg shadow-xl text-blue-50 bg-white dark:bg-[#1d3335]`}
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

function ProfileHeader({
  data,
  status,
}: {
  data: GitHubJourneyData;
  status: "loading" | "ready" | "error";
}) {
  const profileBio =
    data.profile.bio?.trim() || githubJourneyContent.profileFallbackBio;

  return (
    <div className="flex flex-col gap-5 border-b border-border/50 pb-7 dark:border-white/10 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-primary/25 bg-primary/10 shadow-lg shadow-primary/10 sm:h-20 sm:w-20">
          <Image
            src={data.profile.avatarUrl}
            alt={`${data.profile.name} GitHub avatar`}
            fill
            sizes="(min-width: 640px) 80px, 64px"
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-xl font-extrabold text-foreground sm:text-2xl">
              {data.profile.name}
            </h3>
            <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
              {status === "loading"
                ? "Loading"
                : status === "error"
                  ? "Fallback"
                  : "Live"}
            </span>
          </div>
          <p className="mt-1 text-sm font-semibold text-primary">
            @{data.profile.login}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-foreground/65">
            {githubJourneyContent.developerTitle}
          </p>
          <p className="mt-1 max-w-2xl text-xs leading-5 text-foreground/45">
            {profileBio}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
        <motion.a
          href={data.profile.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.98 }}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-bold text-background shadow-lg shadow-black/10 transition-all hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-4 focus-visible:ring-offset-background dark:bg-white dark:text-black"
        >
          <FaGithub className="h-4 w-4" />
          {githubJourneyContent.followLabel}
          <ArrowUpRight className="h-4 w-4" />
        </motion.a>
        <DataFreshness data={data} status={status} />
      </div>
    </div>
  );
}

function DataFreshness({
  data,
  status,
}: {
  data: GitHubJourneyData;
  status: "loading" | "ready" | "error";
}) {
  const label =
    data.generatedAt !== null
      ? `${githubJourneyContent.generatedLabel}: ${formatAbsoluteDate(
          data.generatedAt,
        )}`
      : status === "loading"
        ? "Loading GitHub data"
        : "Live REST data";

  return (
    <div className="flex items-center justify-center gap-2 rounded-full border border-border/50 bg-background/50 px-3 py-2 text-[11px] font-semibold text-foreground/50 backdrop-blur-sm dark:border-white/10 dark:bg-black/20 lg:justify-end">
      <span
        className={`h-2 w-2 rounded-full ${
          status === "error" ? "bg-amber-400" : "bg-emerald-400"
        }`}
      />
      {status === "error" ? "GitHub fallback view" : label}
    </div>
  );
}

function RepositoryCard({
  repository,
  index,
}: {
  repository: GitHubRepository;
  index: number;
}) {
  return (
    <motion.a
      href={repository.htmlUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileTap={{ scale: 0.99 }}
      className="group/repo relative block overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-background/90 to-background/45 p-4 shadow-sm transition-all duration-500 hover:border-primary/35 hover:shadow-lg hover:shadow-primary/10 dark:border-white/10 dark:from-white/[0.055] dark:to-white/[0.02]"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 transition-opacity duration-500 group-hover/repo:opacity-100" />
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/35">
              Featured Repository #{index + 1}
            </p>
            <h4 className="mt-1 truncate text-base font-extrabold text-foreground group-hover/repo:text-primary">
              {repository.name}
            </h4>
          </div>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-foreground/35 transition-colors group-hover/repo:text-primary" />
        </div>

        <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-foreground/60">
          {repository.description ??
            "Public repository details are available on GitHub."}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-foreground/55 sm:grid-cols-4">
          <RepositorySignal
            icon={<Star className="h-3.5 w-3.5" />}
            label="Stars"
            value={repository.stars.toLocaleString("en-US")}
          />
          <RepositorySignal
            icon={<GitFork className="h-3.5 w-3.5" />}
            label="Forks"
            value={repository.forks.toLocaleString("en-US")}
          />
          <RepositorySignal
            icon={<span className="h-2.5 w-2.5 rounded-full bg-primary" />}
            label="Language"
            value={repository.language ?? "Code"}
          />
          <RepositorySignal
            icon={<CalendarDays className="h-3.5 w-3.5" />}
            label={githubJourneyContent.lastUpdatedLabel}
            value={formatAbsoluteDate(repository.updatedAt)}
          />
        </div>
      </div>
    </motion.a>
  );
}

function RepositorySignal({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border/40 bg-background/55 px-3 py-2 dark:border-white/10 dark:bg-black/20">
      <div className="flex items-center gap-1.5 text-primary">{icon}</div>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-foreground/35">
        {label}
      </p>
      <p className="mt-0.5 truncate font-bold text-foreground/75">{value}</p>
    </div>
  );
}
