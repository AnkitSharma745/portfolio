import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { githubJourneyContent } from "@/content/github/journey";
import type { GitHubJourneyData } from "@/lib/githubJourney";
import DataFreshness from "./DataFreshness";

interface ProfileHeaderProps {
  data: GitHubJourneyData;
  status: "loading" | "ready" | "error";
}

export default function ProfileHeader({ data, status }: ProfileHeaderProps) {
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
