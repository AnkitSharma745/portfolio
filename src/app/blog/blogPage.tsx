"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";

// Mock Data
const BLOG_POSTS = [
  {
    slug: "mastering-react-server-components",
    title: "Mastering React Server Components in Next.js 14",
    excerpt:
      "A deep dive into the architecture of RSCs, how they improve performance, and when to use them vs Client Components.",
    date: "Nov 20, 2024",
    readTime: "8 min read",
    category: "React",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
  },
  {
    slug: "building-scalable-apis-nodejs",
    title: "Building Scalable APIs with Node.js and Microservices",
    excerpt:
      "Learn how to design robust backend systems that can handle millions of requests using Node.js clustering and Docker.",
    date: "Nov 15, 2024",
    readTime: "12 min read",
    category: "Backend",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    slug: "css-glassmorphism-guide",
    title: "The Ultimate Guide to Glassmorphism in 2024",
    excerpt:
      "How to create stunning, modern UI effects using only CSS and Tailwind. No heavy libraries required.",
    date: "Nov 10, 2024",
    readTime: "6 min read",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    slug: "typescript-advanced-patterns",
    title: "Advanced TypeScript Patterns for Enterprise Apps",
    excerpt:
      "Go beyond the basics. Generics, Utility Types, and infer keywords explained with real-world examples.",
    date: "Nov 05, 2024",
    readTime: "10 min read",
    category: "TypeScript",
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2128&auto=format&fit=crop",
  },
];

const CATEGORIES = ["All", "React", "Backend", "Design", "TypeScript"];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-12 lg:px-20 bg-background text-foreground">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          Engineering <span className="text-gradient">Insights</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-foreground/60 max-w-2xl mx-auto"
        >
          Thoughts on software architecture, frontend performance, and the
          future of web development.
        </motion.p>
      </div>

      {/* Search & Filter */}
      <div className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-secondary text-foreground/70 hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
            size={18}
          />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/blog/${post.slug}`} className="group block h-full">
              <div className="h-full rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 flex flex-col">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-medium border border-white/20">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-foreground/60 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-foreground/70 mb-4 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight size={16} className="ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-xl text-foreground/60">
            No articles found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-4 text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
