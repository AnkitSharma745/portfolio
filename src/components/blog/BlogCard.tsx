"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaArrowRight } from "react-icons/fa";
import { BlogPost } from "@/lib/blog";
import { useTheme } from "next-themes";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        className={`
                    h-full flex flex-col p-6 rounded-2xl border transition-all duration-300 group
                    ${isDark
            ? "bg-white/5 border-white/10 hover:border-primary/50 hover:bg-white/10"
            : "bg-white border-black/5 hover:border-primary/50 shadow-lg"
          }
                `}
      >
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-2 py-1 rounded-md bg-primary/10 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-foreground/70 mb-6 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        {/* Meta & CTA */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50 text-sm text-foreground/60">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-primary" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <FaClock className="text-primary" />
              {post.readingTime}
            </span>
          </div>
          <span className="flex items-center gap-1 font-medium text-primary group-hover:translate-x-1 transition-transform">
            Read <FaArrowRight size={12} />
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
