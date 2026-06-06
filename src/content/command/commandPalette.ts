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
  | "experience"
  | "projects"
  | "opensource"
  | "blog"
  | "contact";

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
