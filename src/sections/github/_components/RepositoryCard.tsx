import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import type { GitHubRepository } from "@/lib/githubJourney";

interface RepositoryCardProps {
  repository: GitHubRepository;
  index: number;
}

export default function RepositoryCard({
  repository,
  index,
}: RepositoryCardProps) {
  const technologies =
    repository.techStack || (repository.language ? [repository.language] : []);

  return (
    <motion.a
      href={repository.htmlUrl}
      target="_blank"
      rel="noopener noreferrer"
      whileTap={{ scale: 0.98 }}
      className="group/repo relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/40 bg-background/50 p-6 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/20 dark:border-white/10 dark:bg-white/[0.02]"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/repo:opacity-100" />
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/20 blur-3xl transition-all duration-500 group-hover/repo:bg-primary/30 group-hover/repo:blur-2xl" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-500 group-hover/repo:bg-primary group-hover/repo:text-primary-foreground">
              <FaGithub className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-foreground/40">
                Featured Repository #{index + 1}
              </p>
              <h4 className="truncate text-lg font-bold text-foreground transition-colors group-hover/repo:text-primary">
                {repository.name}
              </h4>
            </div>
          </div>
          <ArrowUpRight className="h-5 w-5 shrink-0 text-foreground/30 transition-transform duration-500 group-hover/repo:-translate-y-1 group-hover/repo:translate-x-1 group-hover/repo:text-primary" />
        </div>

        <p className="mt-2 line-clamp-3 grow text-sm leading-relaxed text-foreground/60">
          {repository.description ??
            "Public repository details are available on GitHub."}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {technologies.map((tech, i) => (
            <span
              key={tech + i}
              className="flex items-center gap-1.5 rounded-full border border-border/50 bg-background/50 px-3 py-1 text-xs font-semibold text-foreground/70 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5"
            >
              {i === 0 && (
                <span className="relative flex h-2 w-2 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
              )}
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}
