import { Metadata } from "next";
import { socialProfiles } from "@/content/social/profiles";

export const siteConfig = {
    name: "Ankit Sharma",
    title: "Ankit Sharma - Full Stack Developer & Desktop App Specialist",
    description: "Full Stack Developer specializing in React, TypeScript, Node.js, and Electron. Building high-performance web and desktop applications with modern technologies.",
    url: "https://ankitsharma745.github.io/", // Update with your actual domain
    ogImage: "https://ankitsharma745.github.io/og-image.jpg", // Update with your actual OG image
    links: {
        github: socialProfiles.github.url,
        linkedin: socialProfiles.linkedin.url,
        twitter: socialProfiles.twitter.url,
        email: "mailto:ankitaksharma9763@gmail.com"
    },
    keywords: [
        "Full Stack Developer",
        "React Developer",
        "TypeScript",
        "Node.js",
        "Electron",
        "Next.js",
        "Web Development",
        "Desktop Applications",
        "Software Engineer",
        "Portfolio"
    ]
};

interface PageMetadataProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    keywords?: string[];
    type?: "website" | "article" | "profile";
}

export function generateMetadata({
    title,
    description = siteConfig.description,
    image = siteConfig.ogImage,
    url = siteConfig.url,
    keywords = siteConfig.keywords,
    type = "website"
}: PageMetadataProps = {}): Metadata {
    const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;

    return {
        title: fullTitle,
        description,
        keywords: keywords.join(", "),
        authors: [{ name: siteConfig.name }],
        creator: siteConfig.name,
        openGraph: {
            type,
            locale: "en_US",
            url,
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
            canonical: url
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
