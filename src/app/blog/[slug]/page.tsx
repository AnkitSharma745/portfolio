import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaTags,
} from "react-icons/fa";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { generateMetadata as genMeta } from "@/lib/metadata";
import PageTransition from "@/components/PageTransition";
import Breadcrumbs from "@/components/Breadcrumbs";
import MDXComponents from "../_components/MDXComponents";
import TableOfContents from "../_components/TableOfContents";
import ShareButtons from "@/components/ShareButtons";
import Comments from "../_components/Comments";
import ScrollProgress from "../_components/ScrollProgress";
import BlogPlaceholderPage from "./_components/BlogPlaceholderPage";
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
      path: `/blog/${slug}`,
    });
  }

  return genMeta({
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.description,
    keywords: post.tags,
    image: post.ogImage ?? post.coverImage,
    type: "article",
    url: post.canonical,
    path: `/blog/${slug}`,
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return <BlogPlaceholderPage slug={slug} />;
  }

  return (
    <PageTransition>
      <ScrollProgress />
      <main className="relative min-h-screen bg-background pb-16 pt-24 text-foreground sm:pb-20">
        <div className="container mx-auto mb-6 px-4 sm:mb-8 sm:px-6">
          <Breadcrumbs />
        </div>

        {/* Hero Section */}
        <div className="container mx-auto mb-10 px-4 sm:mb-12 sm:px-6">
          <Link
            href="/blog"
            className="group mb-6 inline-flex min-h-10 items-center gap-2 text-sm text-foreground/60 transition-colors hover:text-primary sm:mb-8 sm:text-base"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-5 flex flex-wrap justify-center gap-2 sm:mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary sm:text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="mb-5 text-3xl font-bold leading-tight sm:mb-6 sm:text-4xl md:text-6xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-foreground/60 sm:gap-6 sm:text-base">
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
          <div className="container mx-auto mb-10 px-4 sm:mb-16 sm:px-6">
            <div className="relative h-[220px] w-full overflow-hidden rounded-2xl shadow-2xl sm:h-[360px] md:h-[600px]">
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
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:gap-12 lg:flex-row">
            {/* Main Content */}
            <article className="w-full lg:w-3/4">
              <div className="prose max-w-none dark:prose-invert sm:prose-lg">
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
              <div className="mt-10 border-t border-border/50 pt-6 sm:mt-16 sm:pt-8">
                <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center md:gap-6">
                  <div className="flex flex-wrap items-center gap-2 text-sm text-foreground/70 sm:text-base">
                    <FaTags className="text-primary" />
                    <span className="font-medium">Tags:</span>
                    <div className="flex flex-wrap gap-2">
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
                    description={post.description}
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
