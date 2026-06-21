import { Metadata } from "next";
import { getBlogPosts, getAllTags } from "@/lib/blog";
import BlogList from "./_components/BlogList";
import PageTransition from "@/components/PageTransition";
import Breadcrumbs from "@/components/Breadcrumbs";
import GradientText from "@/components/GradientText";
import { generateMetadata as genMeta } from "@/lib/metadata";

export const metadata: Metadata = genMeta({
  title: "Blog",
  description:
    "Technical insights, tutorials, and thoughts on web development.",
  keywords: ["blog", "web development", "react", "next.js", "tutorial"],
  path: "/blog",
});

export default function BlogPage() {
  const posts = getBlogPosts();
  const allTags = getAllTags();

  return (
    <PageTransition>
      <main className="min-h-screen bg-background text-foreground relative overflow-hidden pt-24 pb-10">
        <div className="container mx-auto px-6">
          <Breadcrumbs />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Technical <GradientText>Insights</GradientText>
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">
              Thoughts, tutorials, and deep dives into the world of modern web
              development.
            </p>
          </div>

          {/* Blog List */}
          <BlogList posts={posts} allTags={allTags} />
        </div>
      </main>
    </PageTransition>
  );
}
