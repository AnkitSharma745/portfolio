"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaArrowRight } from "react-icons/fa";
import { BlogPost } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="group flex h-full w-full max-w-sm flex-col rounded-2xl border border-black/5 bg-white p-4 shadow-lg transition-all duration-300 hover:border-primary/50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 sm:p-5 md:max-w-none lg:p-6"
      >
        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
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
        <h3 className="mb-3 line-clamp-2 text-xl font-bold transition-colors group-hover:text-primary sm:text-2xl">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="mb-5 line-clamp-3 flex-grow text-sm leading-6 text-foreground/70 sm:mb-6 sm:text-base">
          {post.excerpt}
        </p>

        {/* Meta & CTA */}
        <div className="mt-auto flex flex-col gap-3 border-t border-border/50 pt-4 text-sm text-foreground/60 min-[380px]:flex-row min-[380px]:items-center min-[380px]:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-primary" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <FaClock className="text-primary" />
              {post.readingTime}
            </span>
          </div>
          <span className="flex items-center gap-1 font-medium text-primary transition-transform group-hover:translate-x-1">
            Read <FaArrowRight size={12} />
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
