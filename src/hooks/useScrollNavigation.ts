"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

export const SECTIONS = ["home", "about", "skills", "projects", "contact"];

export function useScrollNavigation() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const pathname = usePathname();
  const router = useRouter();

  // Track active section on scroll
  useEffect(() => {
    if (pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px", // Trigger when section is in middle of viewport
        threshold: 0,
      }
    );

    SECTIONS.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  // Robust navigation handler
  const navigateTo = useCallback((href: string) => {
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      
      if (pathname === "/") {
        // Smooth scroll if already on home
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          // Update URL hash without reload
          window.history.pushState(null, "", href);
          setActiveSection(targetId);
        }
      } else {
        // Navigate to home with hash
        router.push(href);
      }
    } else {
      // Standard navigation (e.g., /blog)
      router.push(href);
    }
  }, [pathname, router]);

  return {
    activeSection,
    navigateTo,
    isHome: pathname === "/",
  };
}
