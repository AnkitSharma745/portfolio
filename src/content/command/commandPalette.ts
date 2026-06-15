export const commandCategories = {
  navigation: "Navigation",
  actions: "Actions",
  social: "Social",
} as const;

export type CommandCategory =
  (typeof commandCategories)[keyof typeof commandCategories];

export type NavigationCommandId =
  | "home"
  | "about"
  | "skills"
  | "experience"
  | "projects"
  | "opensource"
  | "blog"
  | "contact"
  | "skills-frontend"
  | "skills-backend"
  | "skills-desktop"
  | "skills-cloud-devops"
  | "frontend-systems"
  | "backend-systems"
  | "desktop-applications"
  | "cloud-devops-delivery"
  | "product-engineering"
  | "ai-augmented-development"
  | "automation-platforms";

export type StaticActionCommandId = "ask-ai" | "download-resume";

export type SocialCommandId = "github" | "linkedin" | "twitter";

export interface NavigationCommandContent {
  id: NavigationCommandId;
  label: string;
  route: string;
  category: typeof commandCategories.navigation;
  keywords: string[];
}

export interface StaticActionCommandContent {
  id: StaticActionCommandId;
  label: string;
  category: typeof commandCategories.actions;
  keywords: string[];
}

export interface ThemeCommandContent {
  id: "theme-toggle";
  labels: {
    whenDarkTheme: string;
    whenLightTheme: string;
  };
  category: typeof commandCategories.actions;
  keywords: string[];
}

export interface SocialCommandContent {
  id: SocialCommandId;
  label: string;
  category: typeof commandCategories.social;
  keywords: string[];
}

export const commandPaletteContent = {
  triggerTitle: "Open Command Palette (Cmd+K)",
  searchPlaceholder: "Type a command or search...",
  emptyStatePrefix: "No commands found for",
  keyboardHints: {
    navigate: {
      keys: "↑↓",
      label: "Navigate",
    },
    select: {
      keys: "Enter",
      label: "Select",
    },
    close: {
      keys: "Esc",
      label: "Close",
    },
    open: {
      keys: "⌘K",
      label: "to open",
    },
  },
  navigationCommands: [
    {
      id: "home",
      label: "Go to Home",
      route: "/",
      category: commandCategories.navigation,
      keywords: ["home", "main"],
    },
    {
      id: "about",
      label: "Go to About",
      route: "/about",
      category: commandCategories.navigation,
      keywords: ["about", "me", "bio"],
    },
    {
      id: "skills",
      label: "Go to Skills",
      route: "/skills",
      category: commandCategories.navigation,
      keywords: ["skills", "capabilities", "engineering"],
    },
    {
      id: "skills-frontend",
      label: "Explore Frontend Skills",
      route: "/skills#frontend",
      category: commandCategories.navigation,
      keywords: ["frontend", "react", "typescript", "next.js"],
    },
    {
      id: "skills-backend",
      label: "Explore Backend & Data Skills",
      route: "/skills#backend",
      category: commandCategories.navigation,
      keywords: ["backend", "node", "api", ".net", "database"],
    },
    {
      id: "skills-desktop",
      label: "Explore Desktop Skills",
      route: "/skills#desktop",
      category: commandCategories.navigation,
      keywords: ["desktop", "electron", "windows", "powershell"],
    },
    {
      id: "skills-cloud-devops",
      label: "Explore Cloud & DevOps Skills",
      route: "/skills#cloud-devops",
      category: commandCategories.navigation,
      keywords: ["cloud", "devops", "azure", "deployment", "ci/cd"],
    },
    {
      id: "experience",
      label: "Go to Experience",
      route: "/experience",
      category: commandCategories.navigation,
      keywords: ["experience", "work", "career"],
    },
    {
      id: "projects",
      label: "Go to Projects",
      route: "/projects",
      category: commandCategories.navigation,
      keywords: ["projects", "portfolio", "work"],
    },
    {
      id: "opensource",
      label: "Go to Open Source",
      route: "/open-source",
      category: commandCategories.navigation,
      keywords: ["open source", "github", "contributions"],
    },
    {
      id: "blog",
      label: "Go to Blog",
      route: "/blog",
      category: commandCategories.navigation,
      keywords: ["blog", "articles", "posts"],
    },
    {
      id: "contact",
      label: "Go to Contact",
      route: "/contact",
      category: commandCategories.navigation,
      keywords: ["contact", "email", "message"],
    },
    {
      id: "frontend-systems",
      label: "Explore Frontend Systems",
      route: "/skills/frontend-systems",
      category: commandCategories.navigation,
      keywords: ["frontend", "react", "typescript", "next.js"],
    },
    {
      id: "backend-systems",
      label: "Explore Backend Systems",
      route: "/skills/backend-systems",
      category: commandCategories.navigation,
      keywords: ["backend", "node", "api", ".net"],
    },
    {
      id: "desktop-applications",
      label: "Explore Desktop Applications",
      route: "/skills/desktop-applications",
      category: commandCategories.navigation,
      keywords: ["desktop", "electron", ".net", "c#"],
    },
    {
      id: "cloud-devops-delivery",
      label: "Explore Cloud, DevOps & Delivery",
      route: "/skills/cloud-devops-delivery",
      category: commandCategories.navigation,
      keywords: ["cloud", "devops", "azure", "ci/cd", "delivery"],
    },
    {
      id: "product-engineering",
      label: "Explore Product Engineering",
      route: "/skills/product-engineering",
      category: commandCategories.navigation,
      keywords: ["product", "ux", "delivery"],
    },
    {
      id: "ai-augmented-development",
      label: "Explore AI-Augmented Development",
      route: "/skills/ai-augmented-development",
      category: commandCategories.navigation,
      keywords: ["ai", "codex", "workflow", "automation"],
    },
    {
      id: "automation-platforms",
      label: "Explore Automation Platforms",
      route: "/skills/automation-platforms",
      category: commandCategories.navigation,
      keywords: ["automation", "workflow", "integrations"],
    },
  ] satisfies NavigationCommandContent[],
  actionCommands: {
    askAi: {
      id: "ask-ai",
      label: "Ask AI Assistant",
      category: commandCategories.actions,
      keywords: ["ai", "chat", "bot", "assistant", "help"],
    } satisfies StaticActionCommandContent,
    themeToggle: {
      id: "theme-toggle",
      labels: {
        whenDarkTheme: "Switch to Light Mode",
        whenLightTheme: "Switch to Dark Mode",
      },
      category: commandCategories.actions,
      keywords: ["theme", "dark", "light", "mode"],
    } satisfies ThemeCommandContent,
    downloadResume: {
      id: "download-resume",
      label: "Download Resume",
      category: commandCategories.actions,
      keywords: ["resume", "cv", "download"],
    } satisfies StaticActionCommandContent,
  },
  socialCommands: [
    {
      id: "github",
      label: "Open GitHub",
      category: commandCategories.social,
      keywords: ["github", "code"],
    },
    {
      id: "linkedin",
      label: "Open LinkedIn",
      category: commandCategories.social,
      keywords: ["linkedin", "professional"],
    },
    {
      id: "twitter",
      label: "Open Twitter",
      category: commandCategories.social,
      keywords: ["twitter", "social"],
    },
  ] satisfies SocialCommandContent[],
};
