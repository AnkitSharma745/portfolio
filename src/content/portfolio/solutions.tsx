import { FaNpm, FaPalette, FaCode } from "react-icons/fa";

export interface Solution {
    title: string;
    description: string;
    features: string[];
    repoUrl: string;
    demoUrl?: string;
    icon: React.ReactNode;
    tags: string[];
}

// TODO: Replace "yourusername" with actual GitHub username and update URLs
export const SOLUTIONS_DATA: Solution[] = [
    {
        title: "Next.js Theme Wrapper",
        description: "A lightweight, customizable theme wrapper for Next.js applications with built-in dark mode support and persistent state.",
        features: [
            "Zero-config dark mode",
            "Persisted theme preference",
            "Custom color palette support",
            "No flash on load"
        ],
        repoUrl: "https://github.com/yourusername/next-theme-wrapper",
        icon: <FaPalette />,
        tags: ["React", "Next.js", "Context API"]
    },
    {
        title: "Axios Enhanced",
        description: "A powerful wrapper around Axios that simplifies API calls, error handling, and request cancellation.",
        features: [
            "Global error handling",
            "Request retries",
            "Automatic token refresh",
            "Type-safe responses"
        ],
        repoUrl: "https://github.com/yourusername/axios-enhanced",
        icon: <FaCode />,
        tags: ["TypeScript", "Axios", "API"]
    },
    {
        title: "React Form Hook",
        description: "A custom hook for managing complex form state with validation and dependency tracking.",
        features: [
            "Field validation",
            "Dependency tracking",
            "Async submission",
            "Minimal re-renders"
        ],
        repoUrl: "https://github.com/yourusername/react-form-hook",
        icon: <FaNpm />,
        tags: ["React", "Hooks", "Forms"]
    }
];
