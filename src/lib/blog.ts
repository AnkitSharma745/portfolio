import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import readingTime from 'reading-time';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    description: string;
    excerpt: string;
    coverImage?: string;
    seoTitle?: string;
    seoDescription?: string;
    canonical?: string;
    ogImage?: string;
    featured: boolean;
    tags: string[];
    readingTime: string;
    content: string;
    source?: MDXRemoteSerializeResult;
}

interface BlogFrontmatter {
    slug: string;
    title: string;
    date: string;
    description: string;
    excerpt: string;
    coverImage?: string;
    seoTitle?: string;
    seoDescription?: string;
    canonical?: string;
    ogImage?: string;
    featured: boolean;
    tags: string[];
}

const getStringValue = (value: unknown, fallback: string = ""): string =>
    typeof value === "string" ? value : fallback;

const getStringArray = (value: unknown): string[] =>
    Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];

const getBooleanValue = (value: unknown, fallback = false): boolean =>
    typeof value === "boolean" ? value : fallback;

const getBlogFrontmatter = (
    data: Record<string, unknown>,
    slug: string,
): BlogFrontmatter => {
    const description = getStringValue(
        data.description,
        getStringValue(data.excerpt),
    );
    const coverImage = getStringValue(data.coverImage) || undefined;

    return {
        slug: getStringValue(data.slug) || slug,
        title: getStringValue(data.title, slug),
        date: getStringValue(data.date),
        description,
        excerpt: getStringValue(data.excerpt, description),
        coverImage,
        seoTitle: getStringValue(data.seoTitle) || undefined,
        seoDescription: getStringValue(data.seoDescription) || undefined,
        canonical: getStringValue(data.canonical) || undefined,
        ogImage: getStringValue(data.ogImage, coverImage ?? "") || undefined,
        featured: getBooleanValue(data.featured),
        tags: getStringArray(data.tags),
    };
};

const getBlogFileNames = (): string[] => {
    if (!fs.existsSync(blogDirectory)) {
        return [];
    }

    return fs.readdirSync(blogDirectory).filter((fileName) => fileName.endsWith(".mdx"));
};

const getBlogPostFileName = (slug: string): string | null => {
    const directFileName = `${slug}.mdx`;
    const directPath = path.join(blogDirectory, directFileName);

    if (fs.existsSync(directPath)) {
        return directFileName;
    }

    return getBlogFileNames().find((fileName) => {
        const fullPath = path.join(blogDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);
        const fileSlug = fileName.replace(/\.mdx$/, "");
        const frontmatter = getBlogFrontmatter(data, fileSlug);

        return frontmatter.slug === slug;
    }) ?? null;
};

export function getBlogPosts(): BlogPost[] {
    const fileNames = getBlogFileNames();
    const allPostsData = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(blogDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const stats = readingTime(content);
        const frontmatter = getBlogFrontmatter(data, slug);

        return {
            ...frontmatter,
            readingTime: stats.text,
            content,
        };
    });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    const fileName = getBlogPostFileName(slug);

    if (!fileName) {
        return null;
    }

    const fileSlug = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(blogDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);
    const frontmatter = getBlogFrontmatter(data, fileSlug);

    const mdxSource = await serialize(content, {
        mdxOptions: {
            rehypePlugins: [rehypeHighlight, rehypeSlug],
        },
    });

    return {
        ...frontmatter,
        readingTime: stats.text,
        content,
        source: mdxSource,
    };
}

export function getAllTags(): string[] {
    const posts = getBlogPosts();
    const tags = new Set<string>();
    posts.forEach(post => {
        post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
}
