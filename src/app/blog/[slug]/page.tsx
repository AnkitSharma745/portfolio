import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaPenNib,
  FaTags,
} from "react-icons/fa";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { generateMetadata as genMeta } from "@/lib/metadata";
import PageTransition from "@/components/PageTransition";
import Breadcrumbs from "@/components/Breadcrumbs";
import MDXComponents from "@/components/blog/MDXComponents";
import TableOfContents from "@/components/blog/TableOfContents";
import ShareButtons from "@/components/ShareButtons";
import Comments from "@/components/blog/Comments";
import ScrollProgress from "@/components/blog/ScrollProgress";
import {
  getPlannedSkillArticleBySlug,
  plannedSkillArticles,
} from "@/content/skills/skillDetails";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    const plannedPost = getPlannedSkillArticleBySlug(slug);

    return genMeta({
      title: plannedPost?.title ?? "Technical Write-Up In Progress",
      description:
        plannedPost?.description ??
        "This technical write-up is being prepared and will be published with implementation details soon.",
      keywords: ["blog", "technical writing", "software engineering"],
      url: `https://ankitsharma745.github.io/blog/${slug}`,
    });
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
  return [
    ...posts.map((post) => ({
      slug: post.slug,
    })),
    ...plannedSkillArticles.map((post) => ({
      slug: post.slug,
    })),
  ];
}

function formatFallbackTitle(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function BlogPlaceholderPage({ slug }: { slug: string }) {
  const plannedPost = getPlannedSkillArticleBySlug(slug);
  const title = plannedPost?.title ?? formatFallbackTitle(slug);
  const description =
    plannedPost?.description ??
    "This technical write-up is being prepared. The page is available now so shared links stay useful while the implementation notes are being finished.";
  const targetDate = plannedPost?.targetDate ?? "Publishing schedule coming soon";

  return (
    <PageTransition>
      <main className="relative min-h-screen bg-background pb-20 pt-24 text-foreground">
        <div className="container mx-auto px-6">
          <Breadcrumbs />
        </div>

        <article className="mx-auto max-w-4xl px-6 py-12">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-foreground/60 transition hover:text-primary"
          >
            <FaArrowLeft aria-hidden="true" />
            Back to Blog
          </Link>

          <div className="rounded-lg border border-border bg-card/80 p-8 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-primary">
              <FaPenNib aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                Write-up in progress
              </span>
            </div>

            <h1 className="text-[26px] font-extrabold leading-tight tracking-tight text-gray-950 dark:text-white sm:text-3xl md:text-4xl">
              {title}
            </h1>
            <p className="mt-5 text-base leading-7 text-foreground/70">
              {description}
            </p>

            <div className="mt-6 rounded-lg border border-border bg-background/70 p-5 dark:border-white/10 dark:bg-black/20">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                Status
              </p>
              <p className="mt-2 text-lg font-bold text-foreground">
                {targetDate}
              </p>
              <p className="mt-2 text-sm leading-6 text-foreground/62">
                Public implementation notes will appear here once the article is
                ready. Until then, this page keeps the route shareable and
                avoids a broken reading path.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/skills"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                Explore skills
              </Link>
              <Link
                href="/blog"
                className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4 focus-visible:ring-offset-background dark:border-white/10"
              >
                View published posts
              </Link>
            </div>
          </div>
        </article>
      </main>
    </PageTransition>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return <BlogPlaceholderPage slug={slug} />;
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
                    url={`https://ankitsharma745.github.io/blog/${post.slug}`}
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
