import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const username = process.env.GITHUB_USERNAME ?? "ankitsharma745";
const token = process.env.GITHUB_TOKEN;
const featuredRepositoryNames = (
  process.env.GITHUB_FEATURED_REPOS ?? "portfolio,pos-desktop"
)
  .split(",")
  .map((name) => name.trim())
  .filter(Boolean);

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "..");
const outputPath =
  process.env.GITHUB_JOURNEY_OUTPUT ??
  path.join(repositoryRoot, "public", "data", "github-journey.json");

if (!token) {
  throw new Error(
    "GITHUB_TOKEN is required to sync contribution totals and streaks.",
  );
}

const profileQuery = `
  query GitHubJourneyProfile($login: String!) {
    user(login: $login) {
      login
      name
      avatarUrl
      url
      bio
      createdAt
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories(ownerAffiliations: OWNER, privacy: PUBLIC) {
        totalCount
      }
      contributionsCollection {
        contributionYears
      }
    }
  }
`;

const contributionQuery = `
  query GitHubJourneyContributions($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        totalRepositoryContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              weekday
            }
          }
        }
      }
    }
  }
`;

const profileData = await githubGraphql(profileQuery, { login: username });
const user = profileData.user;

if (!user) {
  throw new Error(`GitHub user "${username}" was not found.`);
}

const repositories = await fetchRepositories(username);
const contributionYears = getContributionYears(user);
const yearlyContributions = await Promise.all(
  contributionYears.map((year) => fetchContributionYear(username, year)),
);
const contributionDays = mergeContributionDays(yearlyContributions);
const streaks = calculateStreaks(contributionDays);
const monthlyContributions = buildMonthlyContributions(contributionDays);
const profile = normalizeProfile(user);
const totals = {
  totalContributions: yearlyContributions.reduce(
    (total, year) => total + year.totalContributions,
    0,
  ),
  currentStreak: streaks.currentStreak,
  longestStreak: streaks.longestStreak,
  totalRepositories: profile.publicRepos,
  followers: profile.followers,
  following: profile.following,
  stars: repositories.reduce((total, repository) => total + repository.stars, 0),
  forks: repositories.reduce((total, repository) => total + repository.forks, 0),
};
const featuredRepositories = selectFeaturedRepositories(repositories);

const snapshot = {
  generatedAt: new Date().toISOString(),
  profile,
  totals,
  repositories,
  featuredRepositories,
  contributionDays,
  monthlyContributions,
  milestones: buildMilestones(profile, repositories, totals),
  source: "snapshot",
};

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`);

console.log(
  `Synced GitHub journey data for ${username}: ${totals.totalContributions} contributions, ${repositories.length} repositories.`,
);

async function githubGraphql(query, variables) {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "portfolio-github-journey-sync",
    },
    body: JSON.stringify({ query, variables }),
  });
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(
      `GitHub GraphQL request failed with ${response.status}: ${JSON.stringify(
        payload,
      )}`,
    );
  }

  if (Array.isArray(payload.errors) && payload.errors.length > 0) {
    throw new Error(payload.errors.map((error) => error.message).join("; "));
  }

  return payload.data;
}

async function githubRest(pathname) {
  const response = await fetch(`https://api.github.com${pathname}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "User-Agent": "portfolio-github-journey-sync",
    },
  });

  if (!response.ok) {
    throw new Error(
      `GitHub REST request failed with ${response.status}: ${pathname}`,
    );
  }

  return response.json();
}

async function fetchRepositories(login) {
  const repositories = [];
  let page = 1;

  while (true) {
    const pageData = await githubRest(
      `/users/${login}/repos?per_page=100&page=${page}&sort=updated&direction=desc&type=owner`,
    );

    if (!Array.isArray(pageData) || pageData.length === 0) {
      break;
    }

    repositories.push(...pageData.map(normalizeRepository));

    if (pageData.length < 100) {
      break;
    }

    page += 1;
  }

  return repositories.filter((repository) => !repository.isArchived);
}

async function fetchContributionYear(login, year) {
  const now = new Date();
  const from = new Date(Date.UTC(year, 0, 1, 0, 0, 0));
  const endOfYear = new Date(Date.UTC(year, 11, 31, 23, 59, 59));
  const to = year === now.getUTCFullYear() ? now : endOfYear;

  const data = await githubGraphql(contributionQuery, {
    login,
    from: from.toISOString(),
    to: to.toISOString(),
  });
  const collection = data.user.contributionsCollection;
  const days = collection.contributionCalendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      weekday: day.weekday,
    })),
  );

  return {
    year,
    totalContributions: collection.contributionCalendar.totalContributions ?? 0,
    totalCommitContributions: collection.totalCommitContributions ?? 0,
    totalIssueContributions: collection.totalIssueContributions ?? 0,
    totalPullRequestContributions:
      collection.totalPullRequestContributions ?? 0,
    totalPullRequestReviewContributions:
      collection.totalPullRequestReviewContributions ?? 0,
    totalRepositoryContributions:
      collection.totalRepositoryContributions ?? 0,
    days,
  };
}

function getContributionYears(profile) {
  const years = Array.isArray(profile.contributionsCollection.contributionYears)
    ? profile.contributionsCollection.contributionYears
    : [];
  const currentYear = new Date().getUTCFullYear();
  const createdYear = new Date(profile.createdAt).getUTCFullYear();

  return [...new Set([...years, currentYear, createdYear])].sort(
    (first, second) => first - second,
  );
}

function mergeContributionDays(yearlyData) {
  const daysByDate = new Map();

  for (const year of yearlyData) {
    for (const day of year.days) {
      daysByDate.set(day.date, day);
    }
  }

  return [...daysByDate.values()].sort(
    (first, second) => Date.parse(first.date) - Date.parse(second.date),
  );
}

function calculateStreaks(days) {
  const countByDate = new Map(days.map((day) => [day.date, day.count]));
  let activeStreak = 0;
  let longestStreak = 0;

  for (const day of days) {
    if (day.count > 0) {
      activeStreak += 1;
      longestStreak = Math.max(longestStreak, activeStreak);
    } else {
      activeStreak = 0;
    }
  }

  const now = new Date();
  let cursor = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
  );

  if ((countByDate.get(toDateKey(cursor)) ?? 0) === 0) {
    cursor = addUtcDays(cursor, -1);
  }

  let currentStreak = 0;

  while ((countByDate.get(toDateKey(cursor)) ?? 0) > 0) {
    currentStreak += 1;
    cursor = addUtcDays(cursor, -1);
  }

  return {
    currentStreak,
    longestStreak,
  };
}

function buildMonthlyContributions(days) {
  const countByMonth = new Map();

  for (const day of days) {
    const key = day.date.slice(0, 7);
    countByMonth.set(key, (countByMonth.get(key) ?? 0) + day.count);
  }

  const now = new Date();
  const months = [];

  for (let offset = 11; offset >= 0; offset -= 1) {
    const date = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - offset, 1),
    );
    const key = `${date.getUTCFullYear()}-${String(
      date.getUTCMonth() + 1,
    ).padStart(2, "0")}`;

    months.push({
      key,
      label: new Intl.DateTimeFormat("en-US", {
        month: "short",
        timeZone: "UTC",
      }).format(date),
      count: countByMonth.get(key) ?? 0,
    });
  }

  return months;
}

function normalizeProfile(profile) {
  return {
    login: profile.login,
    name: profile.name ?? "Ankit Sharma",
    avatarUrl: profile.avatarUrl,
    htmlUrl: profile.url,
    bio: profile.bio,
    publicRepos: profile.repositories.totalCount,
    followers: profile.followers.totalCount,
    following: profile.following.totalCount,
    createdAt: profile.createdAt,
  };
}

function normalizeRepository(repository) {
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

function selectFeaturedRepositories(repositories) {
  const preferredNames = new Set(featuredRepositoryNames);
  const preferred = repositories.filter((repository) =>
    preferredNames.has(repository.name),
  );
  const fallback = repositories
    .filter((repository) => !preferredNames.has(repository.name))
    .sort(sortRepositoriesBySignal);

  return [...preferred, ...fallback].slice(0, 2);
}

function buildMilestones(profile, repositories, totals) {
  const milestones = [];
  const ownerRepositories = repositories.filter((repository) => !repository.isFork);
  const firstRepository = [...ownerRepositories].sort(
    (first, second) =>
      Date.parse(first.createdAt) - Date.parse(second.createdAt),
  )[0];
  const signalRepository = [...ownerRepositories].sort(sortRepositoriesBySignal)[0];
  const recentRepository = [...ownerRepositories].sort(
    (first, second) =>
      Date.parse(second.updatedAt) - Date.parse(first.updatedAt),
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

  milestones.push({
    date: recentRepository?.updatedAt ?? null,
    kicker: "Repository Milestone",
    title: `${totals.totalRepositories.toLocaleString("en-US")} public repositories`,
    description:
      "A growing public codebase across portfolio, product, and learning work.",
  });

  milestones.push({
    date: recentRepository?.updatedAt ?? null,
    kicker: "Contribution Milestone",
    title: `${totals.totalContributions.toLocaleString("en-US")} contributions`,
    description:
      "Contribution history generated from GitHub GraphQL contribution data.",
    metric: `${totals.longestStreak.toLocaleString("en-US")} day longest streak`,
  });

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

function sortRepositoriesBySignal(first, second) {
  const firstScore = first.stars * 3 + first.forks * 2;
  const secondScore = second.stars * 3 + second.forks * 2;

  if (firstScore !== secondScore) {
    return secondScore - firstScore;
  }

  return Date.parse(second.updatedAt) - Date.parse(first.updatedAt);
}

function addUtcDays(date, days) {
  const nextDate = new Date(date);
  nextDate.setUTCDate(nextDate.getUTCDate() + days);
  return nextDate;
}

function toDateKey(date) {
  return date.toISOString().slice(0, 10);
}
