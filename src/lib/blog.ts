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
    excerpt: string;
    coverImage?: string;
    tags: string[];
    readingTime: string;
    content: string;
    source?: MDXRemoteSerializeResult;
}

interface BlogFrontmatter {
    title: string;
    date: string;
    excerpt: string;
    coverImage?: string;
    tags: string[];
}

const getStringValue = (value: unknown, fallback: string = ""): string =>
    typeof value === "string" ? value : fallback;

const getStringArray = (value: unknown): string[] =>
    Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];

const getBlogFrontmatter = (
    data: Record<string, unknown>,
    slug: string,
): BlogFrontmatter => ({
    title: getStringValue(data.title, slug),
    date: getStringValue(data.date),
    excerpt: getStringValue(data.excerpt),
    coverImage: typeof data.coverImage === "string" ? data.coverImage : undefined,
    tags: getStringArray(data.tags),
});

export function getBlogPosts(): BlogPost[] {
    // Create directory if it doesn't exist
    if (!fs.existsSync(blogDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(blogDirectory).filter((fileName) => fileName.endsWith(".mdx"));
    const allPostsData = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(blogDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const stats = readingTime(content);
        const frontmatter = getBlogFrontmatter(data, slug);

        return {
            slug,
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
    const fullPath = path.join(blogDirectory, `${slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);
    const frontmatter = getBlogFrontmatter(data, slug);

    const mdxSource = await serialize(content, {
        mdxOptions: {
            rehypePlugins: [rehypeHighlight, rehypeSlug],
        },
    });

    return {
        slug,
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
