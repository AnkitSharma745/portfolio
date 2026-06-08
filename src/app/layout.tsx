import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { UIProvider } from "@/context/UIContext";
import NavBar from "@/components/navigation/Navbar/Navbar";
import Footer from "@/components/navigation/Footer/Footer";
import ChatWidget from "@/components/ChatWidget/ChatWidget";
import CommandPalette from "@/components/CommandPalette";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import SkipToContent from "@/components/SkipToContent";
import TerminalLoader from "@/components/ui/TerminalLoader";
import ScrollToTop from "@/components/ScrollToTop";
import ParticlesBackground from "@/components/ParticlesBackground";
import { Inter, Outfit } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030014" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Ankit Sharma | Full-Stack Developer & Tech Consultant",
    template: "%s | Ankit Sharma",
  },
  description:
    "Premium portfolio of Ankit Sharma, a Full-Stack Developer crafting high-performance enterprise applications and stunning web experiences with React, Next.js, and Node.js.",
  keywords: [
    "Full-Stack Developer",
    "React Expert",
    "Next.js Developer",
    "TypeScript",
    "Node.js",
    "Web Architecture",
    "UI/UX Design",
    "Performance Optimization",
  ],
  authors: [{ name: "Ankit Sharma", url: "https://ankitsharma745.github.io/" }],
  creator: "Ankit Sharma",
  metadataBase: new URL("https://ankitsharma745.github.io/"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ankitsharma745.github.io/",
    title: "Ankit Sharma | Full-Stack Developer & Tech Consultant",
    description:
      "Explore the portfolio of Ankit Sharma. specialized in building scalable, high-performance web applications with modern technologies.",
    siteName: "Ankit Sharma Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ankit Sharma - Premium Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ankit Sharma | Full-Stack Developer",
    description:
      "Crafting exceptional digital experiences with code. Check out my latest projects and technical articles.",
    images: ["/og-image.jpg"],
    creator: "@ankitsharma745",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://ankitsharma745.github.io/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${outfit.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Ankit Sharma",
              url: "https://ankitsharma745.github.io/",
              image: "https://ankitsharma745.github.io/profile.jpg",
              jobTitle: "Full-Stack Developer",
              worksFor: {
                "@type": "Organization",
                name: "Freelance / Open to Work",
              },
              sameAs: [
                "https://github.com/ankitsharma745",
                "https://www.linkedin.com/in/ankit-sharma745",
                "https://twitter.com/ankitsharma745",
              ],
              description:
                "Full-Stack Developer specializing in React, TypeScript, Node.js, and enterprise applications.",
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "GraphQL",
                "AWS",
                "System Design",
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UIProvider>
            <SkipToContent />
            <TerminalLoader />
            <NavBar />
            <main id="main-content" className="flex flex-col min-h-screen">
              {children}
            </main>
            <Footer />
            <ChatWidget />
            <CommandPalette />
            <KeyboardShortcuts />
            <ScrollToTop />
            <ParticlesBackground />
          </UIProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
