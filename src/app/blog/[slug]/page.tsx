import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { FaCalendarAlt, FaClock, FaArrowLeft, FaTags } from "react-icons/fa";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { generateMetadata as genMeta } from "@/lib/metadata";
import PageTransition from "@/components/PageTransition";
import Breadcrumbs from "@/components/Breadcrumbs";
import MDXComponents from "@/components/blog/MDXComponents";
import TableOfContents from "@/components/blog/TableOfContents";
import ShareButtons from "@/components/ShareButtons";
import Comments from "@/components/blog/Comments";
import ScrollProgress from "@/components/blog/ScrollProgress";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return genMeta({ title: "Post Not Found" });
  }

  return genMeta({
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    image: post.coverImage,
    type: "article",
  });
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <PageTransition>
      <ScrollProgress />
      <main className="min-h-screen bg-background text-foreground pt-24 pb-20 relative">
        <div className="container mx-auto px-6 mb-8">
          <Breadcrumbs />
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-6 mb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors mb-8 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-center gap-6 text-foreground/60">
              <span className="flex items-center gap-2">
                <FaCalendarAlt className="text-primary" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <FaClock className="text-primary" />
                {post.readingTime}
              </span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="container mx-auto px-6 mb-16">
            <div className="relative w-full h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Content Layout */}
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
            {/* Main Content */}
            <article className="w-full lg:w-3/4">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <MDXRemote
                  source={post.content}
                  components={MDXComponents}
                  options={{
                    mdxOptions: {
                      rehypePlugins: [], // Add plugins here if needed directly
                    },
                  }}
                />
              </div>

              {/* Share & Tags Footer */}
              <div className="mt-16 pt-8 border-t border-border/50">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-2 text-foreground/70">
                    <FaTags className="text-primary" />
                    <span className="font-medium">Tags:</span>
                    <div className="flex gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-secondary px-2 py-1 rounded text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ShareButtons
                    url={`https://ankitsharma.dev/blog/${post.slug}`}
                    title={post.title}
                    description={post.excerpt}
                  />
                </div>
                <Comments />
              </div>
            </article>

            {/* Sidebar */}
            <aside className="w-full lg:w-1/4 hidden lg:block">
              <TableOfContents />
            </aside>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
