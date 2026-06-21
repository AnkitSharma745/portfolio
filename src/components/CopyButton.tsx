"use client";

import { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";

interface CopyButtonProps {
    text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

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
            className="absolute right-3 top-3 rounded-lg bg-black/10 p-2 text-black opacity-0 transition-all hover:bg-black/20 group-hover:opacity-100 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            aria-label="Copy code"
        >
            {copied ? <FaCheck className="text-green-500" size={14} /> : <FaCopy size={14} />}
        </button>
    );
}
