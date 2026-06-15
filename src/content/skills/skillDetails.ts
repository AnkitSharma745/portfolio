import {
  homeSkillGroups,
  type HomeSkillGroup,
  type HomeSkillItem,
} from "@/content/skills/homeSkills";
import { additionalSkillsByGroupId } from "@/content/skills/additionalSkills";

export type SkillArticleStatus = "published" | "planned";
export type SkillProofLinkType = "capability" | "project" | "blog";

export interface PublishedSkillArticle {
  status: "published";
  title: string;
  slug: string;
  description: string;
}

export interface PlannedSkillArticle {
  status: "planned";
  title: string;
  slug: string;
  targetDate: string;
  description: string;
}

export type SkillArticle = PublishedSkillArticle | PlannedSkillArticle;

export interface SkillProofLink {
  label: string;
  href: string;
  description: string;
  type: SkillProofLinkType;
}

export interface SkillCategorySummary {
  id: string;
  slug: string;
  title: string;
  description: string;
  skillCount: number;
  featuredSkillCount: number;
}

export interface SkillDetail {
  categoryId: string;
  categorySlug: string;
  categoryTitle: string;
  categoryDescription: string;
  skillSlug: string;
  label: string;
  pageTitle: string;
  shortDescription: string;
  implementationFocus: string;
  usedIn: string[];
  practices: string[];
  proofLinks: SkillProofLink[];
  relatedArticles: SkillArticle[];
  statusNote: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

interface SkillDetailOverride {
  pageTitle?: string;
  shortDescription?: string;
  implementationFocus?: string;
  usedIn?: string[];
  practices?: string[];
  proofLinks?: SkillProofLink[];
  relatedArticles?: SkillArticle[];
  statusNote?: string;
  seo?: {
    title: string;
    description: string;
    keywords: string[];
  };
}

const publishedArticles = {
  portfolio: {
    status: "published",
    title: "Building a Next-Level Developer Portfolio",
    slug: "building-portfolio",
    description:
      "A portfolio build note covering the stack, interaction model, and performance-minded implementation choices.",
  },
  reactServerComponents: {
    status: "published",
    title: "Understanding React Server Components",
    slug: "react-server-components",
    description:
      "A focused explanation of React Server Components, client boundaries, and why they matter for modern Next.js apps.",
  },
} satisfies Record<string, PublishedSkillArticle>;

const plannedArticles = {
  reactHooks: {
    status: "planned",
    title: "React Hooks in Production Interfaces",
    slug: "react-hooks-production-interfaces",
    targetDate: "August 30, 2026",
    description:
      "A practical write-up on effect boundaries, derived state, and keeping hooks predictable in product UI.",
  },
  reactContext: {
    status: "planned",
    title: "Context API Without State Sprawl",
    slug: "context-api-without-state-sprawl",
    targetDate: "September 20, 2026",
    description:
      "A note on when context improves a React system and when local state or route state is cleaner.",
  },
  typeSafeContent: {
    status: "planned",
    title: "Type-Safe Content Architecture",
    slug: "type-safe-content-architecture",
    targetDate: "September 6, 2026",
    description:
      "How typed content models keep portfolio pages editable while protecting routes, metadata, and UI contracts.",
  },
  themeSafeTailwind: {
    status: "planned",
    title: "Theme-Safe Tailwind Patterns",
    slug: "theme-safe-tailwind-patterns",
    targetDate: "October 4, 2026",
    description:
      "A breakdown of dark-mode-safe utility classes, design tokens, and responsive component surfaces.",
  },
  apiBoundaries: {
    status: "planned",
    title: "API Boundaries That Help Frontend Teams Move Faster",
    slug: "api-boundaries-frontend-teams",
    targetDate: "October 25, 2026",
    description:
      "Notes on request contracts, validation, error states, and backend choices that keep product flows maintainable.",
  },
  desktopDelivery: {
    status: "planned",
    title: "Desktop Delivery Lessons from Web Technology",
    slug: "desktop-delivery-web-technology",
    targetDate: "November 15, 2026",
    description:
      "A systems-level article about Electron, native expectations, local workflows, and packaging concerns.",
  },
  automationOps: {
    status: "planned",
    title: "Operational Automation Without Hiding Failure States",
    slug: "operational-automation-failure-states",
    targetDate: "December 6, 2026",
    description:
      "A delivery note on making automation observable, recoverable, and useful for real business workflows.",
  },
  cloudDelivery: {
    status: "planned",
    title: "Cloud Delivery Notes for Small Product Teams",
    slug: "cloud-delivery-small-product-teams",
    targetDate: "December 20, 2026",
    description:
      "A practical write-up on deployment pipelines, environment configuration, and release discipline.",
  },
} satisfies Record<string, PlannedSkillArticle>;

export const plannedSkillArticles: PlannedSkillArticle[] =
  Object.values(plannedArticles);

type SkillDetailFallback = Pick<
  SkillDetail,
  "implementationFocus" | "usedIn" | "practices" | "relatedArticles"
>;

const categoryFallbacks: Record<string, SkillDetailFallback> = {
  frontend: {
    implementationFocus:
      "I use this technology as part of a route-aware frontend system: typed content, reusable UI, accessible interactions, and theme-safe presentation working together.",
    usedIn: [
      "Portfolio pages and interactive sections",
      "Reusable UI composition across public routes",
      "Product-style interfaces that need fast scanning and clear navigation",
    ],
    practices: [
      "Keep rendering, content, and interaction boundaries explicit",
      "Prefer accessible native semantics before adding custom behavior",
      "Use responsive constraints so cards, controls, and text do not shift unexpectedly",
    ],
    relatedArticles: [
      publishedArticles.portfolio,
      plannedArticles.typeSafeContent,
    ],
  },
  backend: {
    implementationFocus:
      "I apply this in service and data-flow work where the UI needs stable contracts, recoverable error states, and predictable integration behavior.",
    usedIn: [
      "API-backed application flows",
      "Business process and data synchronization work",
      "Integration-heavy product features",
    ],
    practices: [
      "Design request and response boundaries around product behavior",
      "Treat validation, failure, and retry paths as first-class UX concerns",
      "Keep business rules separate from transport details",
    ],
    relatedArticles: [plannedArticles.apiBoundaries],
  },
  desktop: {
    implementationFocus:
      "I use this in desktop-oriented work where reliability, repeat usage, native operating-system expectations, and local recovery paths matter.",
    usedIn: [
      "Desktop-first operational tools",
      "Retail and kiosk-style workflows",
      "Windows-adjacent automation and local integration surfaces",
    ],
    practices: [
      "Design for repeated daily usage rather than one-time discovery",
      "Make local failure states visible and recoverable",
      "Balance web delivery speed with native desktop expectations",
    ],
    relatedArticles: [plannedArticles.desktopDelivery],
  },
  "cloud-devops": {
    implementationFocus:
      "I apply this to delivery work where builds, environments, releases, and operational automation need to stay understandable and repeatable.",
    usedIn: [
      "Deployment and release workflows",
      "Environment-aware application configuration",
      "Operational integrations that need predictable delivery paths",
    ],
    practices: [
      "Keep environment configuration explicit and reviewable",
      "Favor repeatable delivery steps over manual release memory",
      "Surface operational states instead of hiding pipeline complexity",
    ],
    relatedArticles: [plannedArticles.cloudDelivery, plannedArticles.automationOps],
  },
};

const skillDetailOverrides: Record<string, SkillDetailOverride> = {
  "frontend-systems/react": {
    pageTitle: "React Implementation Notes",
    shortDescription:
      "How I use React to turn product flows into maintainable, interactive interfaces.",
    implementationFocus:
      "I use React for component boundaries, client-side interactions, and reusable UI surfaces while keeping server-rendered routing and content concerns outside client components when possible.",
    usedIn: [
      "The portfolio homepage sections, project cards, command palette, and interaction-heavy UI surfaces",
      "Reusable product interface patterns that need keyboard, pointer, and mobile behavior",
      "Desktop and web experiences where the same component thinking can support different delivery surfaces",
    ],
    practices: [
      "Keep state close to the interaction that owns it",
      "Avoid derived state and effect loops unless there is a verified need",
      "Use client components for real interactivity, not as the default rendering mode",
      "Preserve accessible semantics before layering animation or custom styling",
    ],
    relatedArticles: [
      publishedArticles.reactServerComponents,
      plannedArticles.reactHooks,
      plannedArticles.reactContext,
    ],
  },
  "frontend-systems/typescript": {
    shortDescription:
      "TypeScript is the contract layer I use to protect content models, route data, and reusable UI APIs.",
    implementationFocus:
      "I use TypeScript to keep portfolio content, skill routes, metadata, and component props aligned without leaking editable content into rendering logic.",
    practices: [
      "Prefer interfaces, discriminated unions, and typed helpers over loose object shapes",
      "Model published and planned content as separate states",
      "Keep route params and generated static paths type-safe",
    ],
    relatedArticles: [publishedArticles.portfolio, plannedArticles.typeSafeContent],
  },
  "frontend-systems/next-js": {
    shortDescription:
      "Next.js is the routing and metadata shell I use for shareable pages, SEO, and static portfolio surfaces.",
    implementationFocus:
      "I use the App Router for route ownership, server-safe page files, static params, metadata, sitemap entries, and clean client/server boundaries.",
    practices: [
      "Keep `src/app` focused on routing, metadata, and page composition",
      "Use shareable URLs for every meaningful skill and capability",
      "Prefer server-rendered content with client components only where interaction needs them",
    ],
    relatedArticles: [
      publishedArticles.reactServerComponents,
      publishedArticles.portfolio,
    ],
  },
  "frontend-systems/tailwind-css": {
    shortDescription:
      "Tailwind CSS helps me build responsive, theme-aware interfaces without separating styling decisions from component structure.",
    implementationFocus:
      "I use Tailwind with token-backed theme values, dark variants, responsive grid constraints, and accessible focus states so UI surfaces remain stable in light and dark mode.",
    practices: [
      "Prefer `dark:` variants over JavaScript theme conditionals",
      "Use fixed aspect ratios and responsive grid tracks for card systems",
      "Keep color usage tied to existing theme tokens",
    ],
    relatedArticles: [publishedArticles.portfolio, plannedArticles.themeSafeTailwind],
  },
  "backend-systems/node-js": {
    shortDescription:
      "Node.js is part of my service and tooling stack for API workflows, integrations, and automation-friendly JavaScript systems.",
    implementationFocus:
      "I use Node.js where shared JavaScript knowledge, package ecosystem reach, and integration speed help connect product interfaces to backend workflows.",
    practices: [
      "Keep service logic separate from transport and UI assumptions",
      "Design APIs around product recovery states",
      "Use typed contracts where frontend and backend decisions meet",
    ],
    relatedArticles: [plannedArticles.apiBoundaries, plannedArticles.automationOps],
  },
  "backend-systems/express-js": {
    shortDescription:
      "Express.js is useful for focused APIs, integration layers, and pragmatic service boundaries.",
    implementationFocus:
      "I use Express-style service design to keep routing, validation, and business behavior understandable for product workflows.",
    relatedArticles: [plannedArticles.apiBoundaries],
  },
  "backend-systems/dotnet": {
    shortDescription:
      ".NET is part of my backend and desktop-adjacent stack for structured business workflows.",
    implementationFocus:
      "I use .NET where strongly structured application layers, service reliability, and Windows ecosystem alignment matter.",
    relatedArticles: [plannedArticles.apiBoundaries, plannedArticles.desktopDelivery],
  },
  "backend-systems/rest-apis": {
    shortDescription:
      "REST APIs are the product contract between UI behavior, backend rules, and durable data.",
    implementationFocus:
      "I design REST API interactions around clear resources, validation, predictable errors, and frontend recovery paths.",
    practices: [
      "Name resources around product language",
      "Return errors the interface can explain and recover from",
      "Keep API shape stable enough for frontend iteration",
    ],
    relatedArticles: [plannedArticles.apiBoundaries],
  },
  "desktop-applications/electron": {
    shortDescription:
      "Electron lets me bring web UI discipline into desktop workflows that need native packaging and local behavior.",
    implementationFocus:
      "I use Electron for desktop-grade product surfaces where local workflows, repeated operations, and familiar web UI architecture can work together.",
    practices: [
      "Design desktop flows for speed and repetition",
      "Treat packaging, update paths, and local recovery as product concerns",
      "Keep native integration concerns isolated from rendering components",
    ],
    relatedArticles: [plannedArticles.desktopDelivery],
  },
  "desktop-applications/powershell": {
    shortDescription:
      "PowerShell supports Windows automation, diagnostics, and repeatable operational tasks.",
    implementationFocus:
      "I use PowerShell to make Windows-adjacent workflows more repeatable, inspectable, and easier to support.",
    relatedArticles: [plannedArticles.desktopDelivery, plannedArticles.automationOps],
  },
  "cloud-devops-delivery/ci-cd": {
    shortDescription:
      "CI/CD is the delivery discipline that keeps implementation, verification, and release paths repeatable.",
    implementationFocus:
      "I use CI/CD thinking to reduce manual release risk, keep verification explicit, and make deployment behavior easier to reason about.",
    practices: [
      "Separate local development commands from production verification",
      "Keep release steps documented and repeatable",
      "Surface failures early enough to fix them before deployment pressure",
    ],
    relatedArticles: [plannedArticles.cloudDelivery],
  },
  "cloud-devops-delivery/azure-blob-storage": {
    shortDescription:
      "Azure Blob Storage is useful for durable file and asset workflows that need cloud-backed persistence.",
    implementationFocus:
      "I use blob storage concepts for media, exported assets, generated files, and product flows where large objects should not live in relational data.",
    relatedArticles: [plannedArticles.cloudDelivery],
  },
  "cloud-devops-delivery/azure-service-bus": {
    shortDescription:
      "Azure Service Bus supports asynchronous workflows where systems need to coordinate without fragile direct coupling.",
    implementationFocus:
      "I use message-driven thinking for decoupled processes, background work, and integration flows that need reliability under changing load.",
    relatedArticles: [plannedArticles.cloudDelivery, plannedArticles.automationOps],
  },
};

export function getSkillCategorySlug(group: HomeSkillGroup): string {
  return group.capabilitySlug ?? group.id;
}

export function getSkillsForGroup(group: HomeSkillGroup): HomeSkillItem[] {
  return [...group.items, ...(additionalSkillsByGroupId[group.id] ?? [])];
}

export function getSkillDetailHref(
  categorySlug: string,
  skillSlug: string,
): string {
  return `/skills/${categorySlug}/${skillSlug}`;
}

function getDefaultProofLinks(
  group: HomeSkillGroup,
  categorySlug: string,
): SkillProofLink[] {
  return [
    {
      label: `${group.title} capability`,
      href: `/skills/${categorySlug}`,
      description:
        "Read the broader capability note that connects these tools to engineering practice.",
      type: "capability",
    },
    {
      label: "Project proof",
      href: "/projects",
      description:
        "Review portfolio projects and technical surfaces where this kind of work appears.",
      type: "project",
    },
  ];
}

function buildSkillDetail(group: HomeSkillGroup, item: HomeSkillItem): SkillDetail {
  const categorySlug = getSkillCategorySlug(group);
  const overrideKey = `${categorySlug}/${item.slug}`;
  const fallback = categoryFallbacks[group.id];
  const override = skillDetailOverrides[overrideKey];
  const pageTitle = override?.pageTitle ?? `${item.label} in ${group.title}`;
  const shortDescription =
    override?.shortDescription ??
    `How I apply ${item.label} inside ${group.title.toLowerCase()} work with maintainable implementation boundaries and product-focused delivery.`;

  return {
    categoryId: group.id,
    categorySlug,
    categoryTitle: group.title,
    categoryDescription: group.description,
    skillSlug: item.slug,
    label: item.label,
    pageTitle,
    shortDescription,
    implementationFocus:
      override?.implementationFocus ?? fallback.implementationFocus,
    usedIn: override?.usedIn ?? fallback.usedIn,
    practices: override?.practices ?? fallback.practices,
    proofLinks: override?.proofLinks ?? getDefaultProofLinks(group, categorySlug),
    relatedArticles: override?.relatedArticles ?? fallback.relatedArticles,
    statusNote:
      override?.statusNote ??
      "Public examples are linked when available. Confidential implementation details are summarized at a system level.",
    seo: override?.seo ?? {
      title: `${item.label} Skills`,
      description: shortDescription,
      keywords: [item.label, group.title, "Ankit Sharma skills"],
    },
  };
}

export const skillCategorySummaries: SkillCategorySummary[] = homeSkillGroups.map(
  (group) => ({
    id: group.id,
    slug: getSkillCategorySlug(group),
    title: group.title,
    description: group.description,
    skillCount: getSkillsForGroup(group).length,
    featuredSkillCount: group.items.filter((item) => item.featuredOnHome).length,
  }),
);

export const skillDetails: SkillDetail[] = homeSkillGroups.flatMap((group) =>
  getSkillsForGroup(group).map((item) => buildSkillDetail(group, item)),
);

export function getSkillCategoryBySlug(
  categorySlug: string,
): SkillCategorySummary | undefined {
  return skillCategorySummaries.find((category) => category.slug === categorySlug);
}

export function getSkillDetailByRoute(
  categorySlug: string,
  skillSlug: string,
): SkillDetail | undefined {
  return skillDetails.find(
    (skill) =>
      skill.categorySlug === categorySlug && skill.skillSlug === skillSlug,
  );
}

export function getSkillDetailsForCategory(categoryId: string): SkillDetail[] {
  return skillDetails.filter((skill) => skill.categoryId === categoryId);
}

export function getPlannedSkillArticleBySlug(
  slug: string,
): PlannedSkillArticle | undefined {
  return plannedSkillArticles.find((article) => article.slug === slug);
}
