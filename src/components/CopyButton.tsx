"use client";

import { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";
import { useTheme } from "next-themes";

interface CopyButtonProps {
    text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);
    const { theme } = useTheme();
    const isDark = theme === "dark";

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={`
                absolute top-3 right-3 p-2 rounded-lg transition-all opacity-0 group-hover:opacity-100
                ${isDark
                    ? "bg-white/10 hover:bg-white/20 text-white"
                    : "bg-black/10 hover:bg-black/20 text-black"
                }
            `}
            aria-label="Copy code"
        >
            {copied ? <FaCheck className="text-green-500" size={14} /> : <FaCopy size={14} />}
        </button>
    );
}
