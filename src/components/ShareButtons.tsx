"use client";

import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaFacebook, FaLink } from "react-icons/fa";
import { useTheme } from "next-themes";
import { useState } from "react";

interface ShareButtonsProps {
    url: string;
    title: string;
    description?: string;
}

export default function ShareButtons({ url, title, description = "" }: ShareButtonsProps) {
    const { theme } = useTheme();
    const isDark = theme === "dark";
    const [copied, setCopied] = useState(false);

    const shareUrl = encodeURIComponent(url);
    const shareTitle = encodeURIComponent(title);
    const shareDescription = encodeURIComponent(description);

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text: description,
                    url
                });
            } catch (err) {
                console.error("Share failed:", err);
            }
        }
    };

    const buttonClass = `
        p-3 rounded-full transition-all
        ${isDark
            ? "bg-white/10 hover:bg-white/20"
            : "bg-black/5 hover:bg-black/10"
        }
    `;

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground/70">Share:</span>

            {/* Twitter */}
            <motion.a
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`${buttonClass} hover:text-[#1DA1F2]`}
                title="Share on Twitter"
            >
                <FaTwitter size={18} />
            </motion.a>

            {/* LinkedIn */}
            <motion.a
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`${buttonClass} hover:text-[#0A66C2]`}
                title="Share on LinkedIn"
            >
                <FaLinkedin size={18} />
            </motion.a>

            {/* Facebook */}
            <motion.a
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`${buttonClass} hover:text-[#1877F2]`}
                title="Share on Facebook"
            >
                <FaFacebook size={18} />
            </motion.a>

            {/* Copy Link */}
            <motion.button
                onClick={handleCopyLink}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`${buttonClass} ${copied ? "text-green-500" : ""}`}
                title="Copy link"
            >
                <FaLink size={18} />
            </motion.button>

            {/* Native Share (Mobile) */}
            {typeof navigator !== "undefined" && navigator.share && (
                <motion.button
                    onClick={handleNativeShare}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={buttonClass}
                    title="Share"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                    </svg>
                </motion.button>
            )}
        </div>
    );
}
