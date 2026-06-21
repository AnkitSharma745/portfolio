import type { TechItem } from "@/content/skills/tools";

interface ToolCardProps {
  tool: TechItem;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <div className="group relative flex min-h-[104px] flex-col items-center justify-center overflow-hidden rounded-xl border border-border/50 bg-background/40 px-2.5 py-3 text-center shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:bg-background/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-primary/20 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-primary/40 dark:hover:bg-white/[0.05] sm:min-h-[120px] sm:rounded-2xl sm:px-3 sm:py-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl border border-border/50 bg-gradient-to-b from-background to-background/50 text-2xl text-primary/80 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:border-primary/30 group-hover:text-primary dark:border-white/10 dark:from-white/10 dark:to-white/5 sm:h-14 sm:w-14 sm:rounded-2xl sm:text-3xl md:text-4xl">
        {tool.icon}
      </div>
      <span className="relative z-10 mt-2 text-xs font-bold leading-snug text-foreground/70 transition-colors duration-300 group-hover:text-foreground sm:mt-3 sm:text-sm">
        {tool.label}
      </span>
    </div>
  );
}
