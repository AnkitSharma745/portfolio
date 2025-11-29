"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, Linkedin, Twitter, Facebook } from "lucide-react";

export default function BlogPost() {
  const { slug } = useParams();

  // In a real app, fetch data based on slug
  const post = {
    title: "Mastering React Server Components in Next.js 14",
    date: "Nov 20, 2024",
    readTime: "8 min read",
    author: "Ankit Sharma",
    category: "React",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    content: (
      <div className="space-y-6 text-lg leading-relaxed text-foreground/80">
        <p>
          React Server Components (RSC) represent the biggest paradigm shift in the React ecosystem since hooks. They allow us to render components on the server, reducing the bundle size sent to the client and improving initial page load performance.
        </p>
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Why RSC Matters?</h2>
        <p>
          Traditionally, React applications were client-side rendered (CSR). This meant the browser had to download a large JavaScript bundle before it could render anything interactive. With RSC, we can move the heavy lifting to the server.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Zero Bundle Size:</strong> Server components are not included in the client bundle.</li>
          <li><strong>Direct Database Access:</strong> You can query your database directly inside your component.</li>
          <li><strong>Automatic Code Splitting:</strong> Next.js handles this out of the box.</li>
        </ul>
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">When to use Client Components?</h2>
        <p>
          While RSCs are powerful, they can&apos;t handle interactivity like `useState` or `useEffect`. For that, we still need Client Components. The key is to push Client Components to the leaves of your component tree.
        </p>
        <div className="bg-secondary/50 p-6 rounded-xl border-l-4 border-primary my-8">
          <p className="italic">
            &quot;RSC is not about replacing Client Components, it&apos;s about using the right tool for the right job.&quot;
          </p>
        </div>
        <p>
          By combining the power of the server with the interactivity of the client, Next.js 14 offers the best of both worlds.
        </p>
      </div>
    ),
  };

  return (
    <article className="min-h-screen pt-24 pb-20 bg-background text-foreground">
      {/* Progress Bar (Simulated) */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-primary z-50"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 2, ease: "linear" }}
      />

      <div className="max-w-3xl mx-auto px-6">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </Link>

        {/* Header */}
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center gap-4 text-sm text-foreground/60 mb-6">
            <span className="px-3 py-1 rounded-full bg-secondary text-primary font-medium">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} /> {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} /> {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {post.content}
        </div>

        {/* Footer / Share */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm text-foreground/60 mb-1">Written by</p>
            <p className="font-bold text-lg">{post.author}</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-foreground/60">Share this article:</span>
            <button className="p-2 rounded-full bg-secondary hover:bg-[#0077B5] hover:text-white transition-colors">
              <Linkedin size={18} />
            </button>
            <button className="p-2 rounded-full bg-secondary hover:bg-[#1DA1F2] hover:text-white transition-colors">
              <Twitter size={18} />
            </button>
            <button className="p-2 rounded-full bg-secondary hover:bg-[#4267B2] hover:text-white transition-colors">
              <Facebook size={18} />
            </button>
            <button className="p-2 rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
