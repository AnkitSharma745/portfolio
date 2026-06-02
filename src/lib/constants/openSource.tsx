import { FaReact } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";

export interface Contribution {
    repoName: string;
    repoUrl: string;
    description: string;
    stars: number;
    forks: number;
    language: string;
    icon: React.ReactNode;
    contributionType: "Pull Request" | "Issue" | "Documentation" | "Feature";
}

export const OPEN_SOURCE_CONTRIBUTIONS: Contribution[] = [
    {
        repoName: "facebook/react",
        repoUrl: "https://github.com/facebook/react",
        description: "Contributed to the React core documentation and fixed a minor bug in the reconciliation process.",
        stars: 213000,
        forks: 45000,
        language: "JavaScript",
        icon: <FaReact />,
        contributionType: "Documentation",
    },
    {
        repoName: "vercel/next.js",
        repoUrl: "https://github.com/vercel/next.js",
        description: "Improved the image optimization strategy in the Next.js image component for better performance.",
        stars: 112000,
        forks: 24000,
        language: "TypeScript",
        icon: <SiNextdotjs />,
        contributionType: "Pull Request",
    },
    {
        repoName: "tailwindlabs/tailwindcss",
        repoUrl: "https://github.com/tailwindlabs/tailwindcss",
        description: "Proposed a new utility class for better handling of grid layouts in complex responsive designs.",
        stars: 78000,
        forks: 4000,
        language: "CSS",
        icon: <SiTailwindcss />,
        contributionType: "Feature",
    },
    {
        repoName: "microsoft/TypeScript",
        repoUrl: "https://github.com/microsoft/TypeScript",
        description: "Reported and helped triage a type inference issue related to generic constraints.",
        stars: 95000,
        forks: 12000,
        language: "TypeScript",
        icon: <SiTypescript />,
        contributionType: "Issue",
    },
];
