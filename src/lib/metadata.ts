import { Metadata } from "next";
import { siteConfig } from "@/content/shared/site";

interface PageMetadataProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    path?: string;
    keywords?: readonly string[];
    type?: "website" | "article" | "profile";
}

export function generateMetadata({
    title,
    description = siteConfig.description,
    image = siteConfig.ogImage,
    url,
    path,
    keywords = siteConfig.keywords,
    type = "website"
}: PageMetadataProps = {}): Metadata {
    const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;

    // Construct clean absolute canonical URL
    let canonicalUrl: string = siteConfig.url;
    if (url) {
        canonicalUrl = url;
    } else if (path) {
        const baseUrl = siteConfig.url.endsWith("/") ? siteConfig.url.slice(0, -1) : siteConfig.url;
        const cleanPath = path.startsWith("/") ? path : `/${path}`;
        canonicalUrl = `${baseUrl}${cleanPath}`;
    }

    return {
        title: fullTitle,
        description,
        keywords: keywords.join(", "),
        authors: [{ name: siteConfig.name }],
        creator: siteConfig.name,
        openGraph: {
            type,
            locale: "en_US",
            url: canonicalUrl,
            title: fullTitle,
            description,
            siteName: siteConfig.name,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: fullTitle
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description,
            images: [image],
            creator: "@ankitsharma745" // Update with your Twitter handle
        },
        alternates: {
            canonical: canonicalUrl
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1
            }
        },
        icons: {
            icon: "/favicon.ico"
        },
        manifest: "/site.webmanifest"
    };
}

// JSON-LD Structured Data
export function generatePersonSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        name: siteConfig.name,
        url: siteConfig.url,
        image: siteConfig.ogImage,
        jobTitle: "Full Stack Developer",
        worksFor: {
            "@type": "Organization",
            name: "Retail Solutions Inc."
        },
        sameAs: [
            siteConfig.links.github,
            siteConfig.links.linkedin,
            siteConfig.links.twitter
        ],
        knowsAbout: [
            "React",
            "TypeScript",
            "Node.js",
            "Next.js",
            "Electron",
            "MongoDB",
            "Web Development",
            "Desktop Applications"
        ]
    };
}

export function generateWebsiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        author: {
            "@type": "Person",
            name: siteConfig.name
        }
    };
}
