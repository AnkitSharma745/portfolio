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
      <main className="relative min-h-screen overflow-hidden bg-background pb-12 pt-24 text-foreground sm:pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <Breadcrumbs />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="mx-auto mb-10 max-w-4xl text-center sm:mb-14 md:mb-16">
            <h1 className="mb-4 text-3xl font-bold sm:mb-6 sm:text-5xl md:text-7xl">
              Technical <GradientText>Insights</GradientText>
            </h1>
            <p className="text-base leading-7 text-foreground/70 sm:text-lg sm:leading-8 md:text-xl">
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
