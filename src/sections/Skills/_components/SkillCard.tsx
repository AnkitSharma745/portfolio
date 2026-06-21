import type { HomeSkillItem } from "@/content/skills/homeSkills";

interface SkillCardProps {
  skill: HomeSkillItem;
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <div className="group relative flex min-h-[120px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-border/50 bg-background/40 px-3 py-4 text-center shadow-sm backdrop-blur-sm transition-all duration-500 hover:border-primary/50 hover:bg-background/80 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-primary/20 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-primary/40 dark:hover:bg-white/[0.05]">
      <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-border/50 bg-gradient-to-b from-background to-background/50 text-3xl text-primary/80 shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:border-primary/30 group-hover:text-primary dark:border-white/10 dark:from-white/10 dark:to-white/5 md:text-4xl">
        {skill.icon}
      </div>
      <span className="relative z-10 mt-3 text-sm font-bold tracking-wide text-foreground/70 transition-colors duration-300 group-hover:text-foreground">
        {skill.label}
      </span>
    </div>
  );
}
