"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { BlogPost } from "@/lib/blog";
import BlogCard from "./BlogCard";
import { useTheme } from "next-themes";

interface BlogListProps {
  posts: BlogPost[];
  allTags: string[];
}

export default function BlogList({ posts, allTags }: BlogListProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <div className="space-y-12">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-foreground/40" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`
                            w-full pl-12 pr-4 py-3 rounded-xl border outline-none transition-all duration-300
                            ${isDark
                ? "bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10"
                : "bg-white border-black/5 focus:border-primary/50 shadow-sm"
              }
                        `}
          />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-end">
          <button
            onClick={() => setSelectedTag(null)}
            className={`
                            px-4 py-2 rounded-full text-sm font-medium transition-all
                            ${selectedTag === null
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }
                        `}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`
                                px-4 py-2 rounded-full text-sm font-medium transition-all
                                ${selectedTag === tag
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }
                            `}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold mb-2">No articles found</h3>
          <p className="text-foreground/60">
            Try adjusting your search or filters to find what you&apos;re looking
            for.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedTag(null);
            }}
            className="mt-6 text-primary hover:underline font-medium"
          >
            Clear all filters
          </button>
        </motion.div>
      )}
    </div>
  );
}
