import { githubJourneyContent } from "@/content/github/journey";
import {
  formatAbsoluteDate,
  type GitHubJourneyData,
} from "@/lib/githubJourney";

interface DataFreshnessProps {
  data: GitHubJourneyData;
  status: "loading" | "ready" | "error";
}

export default function DataFreshness({
  data,
  status,
}: DataFreshnessProps) {
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
