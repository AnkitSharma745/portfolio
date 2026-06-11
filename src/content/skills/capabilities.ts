export type CapabilityConfidenceLevel =
  | "Battle-Tested"
  | "Production Ready"
  | "Applied Professionally"
  | "Working Knowledge"
  | "Exploring";

export interface EngineeringCapability {
  slug: string;
  title: string;
  descriptor: string;
  technologies: string[];
  confidenceLevel: CapabilityConfidenceLevel;
  proofIndicator: string;
  exploreLabel: string;
  featured: boolean;
  availability: string;
  overview: string;
  appliedIn: string[];
  practices: string[];
  artifactNote: string;
  lessons: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const skillsOverviewPageContent = {
  eyebrow: "Skills snapshot",
  title: "Skills & Stack",
  description:
    "A simple view of the technologies I use, with optional deeper notes for how they fit into real projects.",
  seo: {
    title: "Skills | Ankit Sharma",
    description:
      "Skills and technology stack of Ankit Sharma across frontend, backend, desktop applications, tools, and product engineering.",
    keywords: [
      "skills",
      "technology stack",
      "frontend systems",
      "backend systems",
      "desktop applications",
      "product engineering",
      "AI augmented development",
      "automation platforms",
    ],
  },
} as const;

export const capabilityDetailPageContent = {
  eyebrow: "Engineering capability",
  sections: {
    appliedIn: "Where this shows up",
    confidence: "Confidence",
    practices: "Practices",
    lessons: "Lessons learned",
    artifacts: "Artifacts",
  },
  actions: {
    viewAllCapabilities: "View all capabilities",
    seeProjectProof: "See project proof",
  },
} as const;

export const engineeringCapabilities: EngineeringCapability[] = [
  {
    slug: "frontend-systems",
    title: "Frontend Systems",
    descriptor: "Scalable interfaces and product experiences.",
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    confidenceLevel: "Battle-Tested",
    proofIndicator: "Production UI patterns",
    exploreLabel: "Explore",
    featured: true,
    availability: "Public examples are available through portfolio projects.",
    overview:
      "Frontend systems are where product intent becomes usable software: routing, state, component architecture, accessibility, performance, and visual polish working together.",
    appliedIn: [
      "Portfolio routes and interactive sections",
      "Dashboard-style interfaces",
      "Reusable UI patterns and motion states",
    ],
    practices: [
      "Component boundaries that keep layout, behavior, and content understandable",
      "Accessible interactions for keyboard, pointer, and touch users",
      "Static rendering and route-aware navigation where it improves speed",
    ],
    artifactNote:
      "More implementation notes will be added as public case studies become available.",
    lessons: [
      "The strongest frontend systems make common flows feel obvious.",
      "Motion should clarify state, not distract from the task.",
    ],
    seo: {
      title: "Frontend Systems",
      description:
        "Frontend systems capability covering React, TypeScript, Next.js, accessibility, performance, and product UI architecture.",
      keywords: ["frontend systems", "React", "TypeScript", "Next.js"],
    },
  },
  {
    slug: "backend-systems",
    title: "Backend Systems",
    descriptor: "APIs, services, data flows, and integration layers.",
    technologies: ["Node.js", "Express", ".NET", "MongoDB"],
    confidenceLevel: "Applied Professionally",
    proofIndicator: "Service design experience",
    exploreLabel: "Explore",
    featured: true,
    availability: "Some production details are confidential, but architecture patterns can be discussed.",
    overview:
      "Backend systems connect product behavior to durable data, predictable APIs, and operational workflows.",
    appliedIn: [
      "API-backed product features",
      "Business process automation",
      "Data-driven application flows",
    ],
    practices: [
      "Clear request/response contracts",
      "Validation and error handling that supports UI recovery",
      "Separation between business logic and transport concerns",
    ],
    artifactNote:
      "Public architecture write-ups will be shared when implementation details can be safely published.",
    lessons: [
      "Reliable backends are designed around failure modes, not only happy paths.",
      "API clarity improves both frontend speed and long-term maintainability.",
    ],
    seo: {
      title: "Backend Systems",
      description:
        "Backend systems capability covering APIs, service design, data flows, Node.js, Express, .NET, and MongoDB.",
      keywords: ["backend systems", "Node.js", "Express", ".NET", "MongoDB"],
    },
  },
  {
    slug: "desktop-applications",
    title: "Desktop Applications",
    descriptor: "Desktop-grade tools with web technology and native workflows.",
    technologies: ["Electron", ".NET", "C#", "Local Storage"],
    confidenceLevel: "Applied Professionally",
    proofIndicator: "Desktop workflow focus",
    exploreLabel: "Explore",
    featured: true,
    availability: "Public artifacts may be limited by project confidentiality.",
    overview:
      "Desktop applications need a different level of reliability: local state, offline behavior, hardware-adjacent workflows, and familiar user expectations.",
    appliedIn: [
      "Point-of-sale style workflows",
      "Operational tools",
      "Desktop-first productivity interfaces",
    ],
    practices: [
      "Designing for repeated daily use",
      "Balancing native expectations with web-driven delivery",
      "Handling local persistence and recovery states",
    ],
    artifactNote:
      "Confidential production artifacts are summarized at a system level instead of exposing implementation details.",
    lessons: [
      "Desktop tools must feel fast even when the surrounding system is slow.",
      "Operational software succeeds when it reduces repeated user effort.",
    ],
    seo: {
      title: "Desktop Applications",
      description:
        "Desktop application capability covering Electron, .NET, C#, local-first workflows, and operational product design.",
      keywords: ["desktop applications", "Electron", ".NET", "C#"],
    },
  },
  {
    slug: "product-engineering",
    title: "Product Engineering",
    descriptor: "Turning ambiguous ideas into usable product systems.",
    technologies: ["UX Systems", "React", "Analytics", "Iteration"],
    confidenceLevel: "Production Ready",
    proofIndicator: "End-to-end delivery",
    exploreLabel: "Explore",
    featured: true,
    availability: "Portfolio sections demonstrate product thinking and interaction design.",
    overview:
      "Product engineering connects user goals, technical constraints, and delivery speed into a coherent working experience.",
    appliedIn: [
      "Portfolio information architecture",
      "Reusable page and section patterns",
      "Feature workflows from idea to implementation",
    ],
    practices: [
      "Clarifying the user decision each screen needs to support",
      "Using progressive disclosure to avoid overwhelming users",
      "Preserving fast paths while keeping deeper exploration available",
    ],
    artifactNote:
      "More product teardown notes will be added as the portfolio content system matures.",
    lessons: [
      "Good product engineering makes complexity feel navigable.",
      "The best UI decisions are usually architectural decisions too.",
    ],
    seo: {
      title: "Product Engineering",
      description:
        "Product engineering capability covering UX systems, product workflows, iteration, and end-to-end software delivery.",
      keywords: ["product engineering", "UX systems", "software delivery"],
    },
  },
  {
    slug: "ai-augmented-development",
    title: "AI-Augmented Development",
    descriptor: "Using AI tools to accelerate careful engineering work.",
    technologies: ["Codex", "Prompting", "Code Review", "Automation"],
    confidenceLevel: "Working Knowledge",
    proofIndicator: "AI-era workflow",
    exploreLabel: "Explore",
    featured: true,
    availability: "Currently evolving through active experimentation and project workflows.",
    overview:
      "AI-augmented development is not about replacing engineering judgment. It is about using AI to explore, implement, review, and document faster while preserving ownership of quality.",
    appliedIn: [
      "Content architecture refactors",
      "Code review and implementation planning",
      "Documentation and maintainability workflows",
    ],
    practices: [
      "Keeping source-of-truth rules close to the repository",
      "Asking for verification before expensive commands",
      "Using AI for acceleration while retaining technical decision-making",
    ],
    artifactNote:
      "Architecture insights will be shared in future publications as patterns stabilize.",
    lessons: [
      "AI is most useful when the repository has clear rules and boundaries.",
      "Fast iteration still needs careful verification and code ownership.",
    ],
    seo: {
      title: "AI-Augmented Development",
      description:
        "AI-augmented development capability covering Codex workflows, prompt design, review loops, and automation-aware engineering.",
      keywords: ["AI development", "Codex", "AI workflow", "software engineering"],
    },
  },
  {
    slug: "automation-platforms",
    title: "Automation Platforms",
    descriptor: "Systems that reduce repeated operational effort.",
    technologies: ["Node.js", "APIs", "Workflows", "Integrations"],
    confidenceLevel: "Production Ready",
    proofIndicator: "Workflow automation",
    exploreLabel: "Explore",
    featured: true,
    availability: "Implementation examples may be abstracted when tied to private systems.",
    overview:
      "Automation platforms turn repeated human effort into reliable workflows that can be monitored, reused, and improved.",
    appliedIn: [
      "Operational workflows",
      "Dashboard-assisted processes",
      "Integration-heavy product features",
    ],
    practices: [
      "Modeling the workflow before coding the interface",
      "Making failure states visible and recoverable",
      "Keeping automation understandable for the people using it",
    ],
    artifactNote:
      "Public diagrams and deeper write-ups will be added where confidentiality allows.",
    lessons: [
      "Automation should explain what it did and what needs attention.",
      "The best automation reduces cognitive load, not just clicks.",
    ],
    seo: {
      title: "Automation Platforms",
      description:
        "Automation platform capability covering workflow systems, API integrations, operational tools, and process automation.",
      keywords: ["automation platforms", "workflow automation", "API integrations"],
    },
  },
];

export function getEngineeringCapabilityBySlug(slug: string) {
  return engineeringCapabilities.find((capability) => capability.slug === slug);
}
