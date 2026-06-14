import { GitHubRepository } from "@/lib/githubJourney";

export const githubJourneyContent = {
  username: "ankitsharma745",
  displayName: "Ankit Sharma",
  developerTitle: "Software developer building polished product systems and AI-era workflows.",
  eyebrow: "GitHub Journey",
  heading: "GitHub Journey",
  intro:
    "A live profile dashboard for public code, repository momentum, and contribution consistency.",
  followLabel: "Follow on GitHub",
  profileFallbackBio:
    "Building production-grade portfolio systems, developer tooling, and business software.",
  snapshotPath: "/data/github-journey.json",
  featuredRepositoryNames: ["portfolio", "pos-desktop"],
  metrics: {
    totalContributions: "Total Contributions",
    currentStreak: "Current Streak",
    longestStreak: "Longest Streak",
    totalRepositories: "Total Repositories",
    followers: "Followers",
    following: "Following",
  },
  repositoryShowcaseTitle: "Repository Showcase",
  contributionActivityTitle: "Contribution Activity",
  timelineTitle: "Developer Journey",
  generatedLabel: "Data synced",
  lastUpdatedLabel: "Last updated",
  unavailableLabel: "Sync pending",
} as const;

export const TOP_GITHUB_REPOSITORY: GitHubRepository[] =[
    {
      fullName: "ankitsharma745/portfolio",
      name: "portfolio",
      description: "My personal portfolio system and digital garden.",
      htmlUrl: "https://github.com/ankitsharma745/portfolio",
      primaryLanguage: "TypeScript",
      stars: 12,
      forks: 2,
      isFork: false,
      updatedAt: "2024-06-14T00:00:00Z",
    } as any,
    {
      fullName: "ankitsharma745/pos-desktop",
      name: "pos-desktop",
      description: "Point of Sale System for retail stores",
      htmlUrl: "https://github.com/ankitsharma745/pos-desktop",
      primaryLanguage: "TypeScript",
      stars: 100,
      forks: 10,
      isFork: false,
      updatedAt: "2024-01-01T00:00:00Z",
    } as any,
    {
      fullName: "ankitsharma745/expense-tracker",
      name: "expense-tracker",
      description: "A comprehensive tool to track and manage daily expenses.",
      htmlUrl: "https://github.com/ankitsharma745/expense-tracker",
      primaryLanguage: "TypeScript",
      stars: 45,
      forks: 5,
      isFork: false,
      updatedAt: "2023-11-01T00:00:00Z",
    } as any,
]