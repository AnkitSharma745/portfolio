import { githubJourneyContent } from "@/content/portfolio/githubJourney";

export interface GitHubProfile {
  login: string;
  name: string;
  avatarUrl: string;
  htmlUrl: string;
  bio: string | null;
  publicRepos: number | null;
  followers: number | null;
  following: number | null;
  createdAt: string | null;
}

export interface GitHubRepository {
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  stars: number;
  forks: number;
  language: string | null;
  techStack?: string[];
  updatedAt: string;
  pushedAt: string | null;
  createdAt: string;
  isFork: boolean;
  isArchived: boolean;
}

export interface GitHubContributionDay {
  date: string;
  count: number;
  weekday: number;
}

export interface GitHubMonthlyContribution {
  key: string;
  label: string;
  count: number;
}

export interface GitHubJourneyMilestone {
  date: string | null;
  kicker: string;
  title: string;
  description: string;
  metric?: string;
}

export interface GitHubJourneyTotals {
  totalContributions: number | null;
  currentStreak: number | null;
  longestStreak: number | null;
  totalRepositories: number | null;
  followers: number | null;
  following: number | null;
  stars: number | null;
  forks: number | null;
}

export interface GitHubJourneyData {
  generatedAt: string | null;
  profile: GitHubProfile;
  totals: GitHubJourneyTotals;
  repositories: GitHubRepository[];
  featuredRepositories: GitHubRepository[];
  contributionDays: GitHubContributionDay[];
  monthlyContributions: GitHubMonthlyContribution[];
  milestones: GitHubJourneyMilestone[];
  source: "fallback" | "live-rest" | "snapshot" | "hybrid";
}

interface GitHubRestUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface GitHubRestRepository {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  pushed_at: string | null;
  created_at: string;
  fork: boolean;
  archived: boolean;
}

export function getFallbackGitHubJourneyData(): GitHubJourneyData {
  const username = githubJourneyContent.username;

  return {
    generatedAt: null,
    profile: {
      login: username,
      name: githubJourneyContent.displayName,
      avatarUrl: `https://github.com/${username}.png`,
      htmlUrl: `https://github.com/${username}`,
      bio: null,
      publicRepos: null,
      followers: null,
      following: null,
      createdAt: null,
    },
    totals: {
      totalContributions: null,
      currentStreak: null,
      longestStreak: null,
      totalRepositories: null,
      followers: null,
      following: null,
      stars: null,
      forks: null,
    },
    repositories: [],
    featuredRepositories: [],
    contributionDays: [],
    monthlyContributions: [],
    milestones: [],
    source: "fallback",
  };
}

export async function loadGitHubJourneyData(): Promise<GitHubJourneyData> {
  const [snapshotResult, restResult] = await Promise.allSettled([
    fetchSnapshotData(),
    fetchLiveRestData(),
  ]);

  const snapshot =
    snapshotResult.status === "fulfilled" ? snapshotResult.value : null;
  const liveRest = restResult.status === "fulfilled" ? restResult.value : null;

  if (snapshot && liveRest) {
    const featuredRepositories = selectFeaturedRepositories(liveRest.repositories);
    const totals = {
      ...snapshot.totals,
      totalRepositories: liveRest.totals.totalRepositories,
      followers: liveRest.totals.followers,
      following: liveRest.totals.following,
      stars: liveRest.totals.stars,
      forks: liveRest.totals.forks,
    };

    return {
      ...snapshot,
      profile: liveRest.profile,
      repositories: liveRest.repositories,
      featuredRepositories,
      totals,
      milestones: buildMilestones(
        liveRest.profile,
        liveRest.repositories,
        totals,
      ),
      source: "hybrid",
    };
  }

  if (snapshot) {
    return {
      ...snapshot,
      source: "snapshot",
    };
  }

  if (liveRest) {
    return liveRest;
  }

  throw new Error("GitHub journey data could not be loaded.");
}

async function fetchSnapshotData(): Promise<GitHubJourneyData | null> {
  const response = await fetch(githubJourneyContent.snapshotPath, {
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as GitHubJourneyData;
}

async function fetchLiveRestData(): Promise<GitHubJourneyData> {
  const username = githubJourneyContent.username;
  const [profileResponse, repositoryResponse] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`),
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&direction=desc&type=owner`,
    ),
  ]);

  if (!profileResponse.ok || !repositoryResponse.ok) {
    throw new Error("GitHub REST data could not be loaded.");
  }

  const user = (await profileResponse.json()) as GitHubRestUser;
  const repositories = ((await repositoryResponse.json()) as GitHubRestRepository[])
    .map(normalizeRepository)
    .filter((repository) => !repository.isArchived);
  const profile = normalizeProfile(user);
  const totals = buildRestTotals(profile, repositories);
  const featuredRepositories = selectFeaturedRepositories(repositories);

  return {
    generatedAt: null,
    profile,
    totals,
    repositories,
    featuredRepositories,
    contributionDays: [],
    monthlyContributions: [],
    milestones: buildMilestones(profile, repositories, totals),
    source: "live-rest",
  };
}

function normalizeProfile(user: GitHubRestUser): GitHubProfile {
  return {
    login: user.login,
    name: user.name ?? githubJourneyContent.displayName,
    avatarUrl: user.avatar_url,
    htmlUrl: user.html_url,
    bio: user.bio,
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    createdAt: user.created_at,
  };
}

function normalizeRepository(repository: GitHubRestRepository): GitHubRepository {
  return {
    name: repository.name,
    fullName: repository.full_name,
    description: repository.description,
    htmlUrl: repository.html_url,
    stars: repository.stargazers_count,
    forks: repository.forks_count,
    language: repository.language,
    updatedAt: repository.updated_at,
    pushedAt: repository.pushed_at,
    createdAt: repository.created_at,
    isFork: repository.fork,
    isArchived: repository.archived,
  };
}

function buildRestTotals(
  profile: GitHubProfile,
  repositories: GitHubRepository[],
): GitHubJourneyTotals {
  return {
    totalContributions: null,
    currentStreak: null,
    longestStreak: null,
    totalRepositories: profile.publicRepos,
    followers: profile.followers,
    following: profile.following,
    stars: repositories.reduce((total, repository) => total + repository.stars, 0),
    forks: repositories.reduce((total, repository) => total + repository.forks, 0),
  };
}

export function selectFeaturedRepositories(
  repositories: GitHubRepository[],
): GitHubRepository[] {
  const preferredNames = new Set<string>(
    githubJourneyContent.featuredRepositoryNames,
  );
  const preferred = repositories.filter((repository) =>
    preferredNames.has(repository.name),
  );
  const fallback = repositories
    .filter((repository) => !preferredNames.has(repository.name))
    .sort(sortRepositoriesBySignal);

  return [...preferred, ...fallback].slice(0, 2);
}

export function buildMilestones(
  profile: GitHubProfile,
  repositories: GitHubRepository[],
  totals: GitHubJourneyTotals,
): GitHubJourneyMilestone[] {
  const milestones: GitHubJourneyMilestone[] = [];
  const ownerRepositories = repositories.filter((repository) => !repository.isFork);
  const firstRepository = [...ownerRepositories].sort(
    (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt),
  )[0];
  const signalRepository = [...ownerRepositories].sort(sortRepositoriesBySignal)[0];
  const recentRepository = [...ownerRepositories].sort(
    (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt),
  )[0];

  if (profile.createdAt) {
    milestones.push({
      date: profile.createdAt,
      kicker: "Origin",
      title: "GitHub account created",
      description: `Started the public development timeline as @${profile.login}.`,
    });
  }

  if (firstRepository) {
    milestones.push({
      date: firstRepository.createdAt,
      kicker: "First Repository",
      title: firstRepository.name,
      description:
        firstRepository.description ??
        "First public repository in the development archive.",
    });
  }

  if (signalRepository) {
    milestones.push({
      date: signalRepository.updatedAt,
      kicker: "Project Signal",
      title: signalRepository.name,
      description:
        signalRepository.description ??
        "A public repository with visible product and engineering momentum.",
      metric: `${signalRepository.stars} stars / ${signalRepository.forks} forks`,
    });
  }

  if (totals.totalRepositories !== null) {
    milestones.push({
      date: recentRepository?.updatedAt ?? null,
      kicker: "Repository Milestone",
      title: `${totals.totalRepositories.toLocaleString("en-US")} public repositories`,
      description:
        "A growing public codebase across portfolio, product, and learning work.",
    });
  }

  if (totals.totalContributions !== null) {
    milestones.push({
      date: recentRepository?.updatedAt ?? null,
      kicker: "Contribution Milestone",
      title: `${totals.totalContributions.toLocaleString("en-US")} contributions`,
      description:
        "Contribution history generated from GitHub GraphQL contribution data.",
      metric:
        totals.longestStreak !== null
          ? `${totals.longestStreak.toLocaleString("en-US")} day longest streak`
          : undefined,
    });
  }

  return milestones
    .filter(
      (milestone, index, list) =>
        list.findIndex(
          (candidate) =>
            candidate.kicker === milestone.kicker &&
            candidate.title === milestone.title,
        ) === index,
    )
    .slice(0, 5);
}

function sortRepositoriesBySignal(
  first: GitHubRepository,
  second: GitHubRepository,
): number {
  const firstScore = first.stars * 3 + first.forks * 2;
  const secondScore = second.stars * 3 + second.forks * 2;

  if (firstScore !== secondScore) {
    return secondScore - firstScore;
  }

  return Date.parse(second.updatedAt) - Date.parse(first.updatedAt);
}

export function formatAbsoluteDate(date: string | null): string {
  if (!date) {
    return "Date pending";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
