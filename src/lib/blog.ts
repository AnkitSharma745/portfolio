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

export function getBlogPosts(): BlogPost[] {
    // Create directory if it doesn't exist
    if (!fs.existsSync(blogDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(blogDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(blogDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const stats = readingTime(content);

        return {
            slug,
            title: data.title,
            date: data.date,
            excerpt: data.excerpt,
            coverImage: data.coverImage,
            tags: data.tags || [],
            readingTime: stats.text,
            content,
            ...data,
        } as BlogPost;
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

    const mdxSource = await serialize(content, {
        mdxOptions: {
            rehypePlugins: [rehypeHighlight, rehypeSlug],
        },
    });

    return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        coverImage: data.coverImage,
        tags: data.tags || [],
        readingTime: stats.text,
        content,
        source: mdxSource,
        ...data,
    } as BlogPost;
}

export function getAllTags(): string[] {
    const posts = getBlogPosts();
    const tags = new Set<string>();
    posts.forEach(post => {
        post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
}
