import { getBlogPosts } from "@/lib/blog";

export const dynamic = "force-static";

export async function GET() {
  const posts = getBlogPosts();
  const siteUrl = "https://ankitsharma745.github.io";

  const rssItems = posts
    .map((post) => `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${siteUrl}/blog/${post.slug}</link>
        <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description><![CDATA[${post.excerpt}]]></description>
      </item>
    `)
    .join("");

  const rssFeed = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ankit Sharma | Technical Insights</title>
    <link>${siteUrl}/blog</link>
    <description>Thoughts, tutorials, and deep dives into the world of modern web development and desktop applications.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=18000",
    },
  });
}
