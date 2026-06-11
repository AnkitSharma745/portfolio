"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaHome, FaChevronRight } from "react-icons/fa";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", href: "/" }];

    let currentPath = "";
    paths.forEach((path) => {
      currentPath += `/${path}`;
      const label = path
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      breadcrumbs.push({ label, href: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (pathname === "/") return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-sm mb-6 text-foreground/70 dark:text-foreground/60"
    >
      {/* Schema.org BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbs.map((crumb, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: crumb.label,
              item: `https://ankitsharma745.github.io/${crumb.href}`,
            })),
          }),
        }}
      />

      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1;
        const isHome = index === 0;

        return (
          <div key={crumb.href} className="flex items-center gap-2">
            {isLast ? (
              <span className="text-foreground font-medium flex items-center gap-2">
                {isHome && <FaHome />}
                {crumb.label}
              </span>
            ) : (
              <>
                <Link
                  href={crumb.href}
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  {isHome && <FaHome />}
                  {crumb.label}
                </Link>
                <FaChevronRight className="text-xs text-foreground/40" />
              </>
            )}
          </div>
        );
      })}
    </nav>
  );
}
