"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Moon, Sun, Menu, X, Download } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { onDownloadResume } from "@/lib/utils/download";
import GradientText from "@/components/GradientText";
import { useScrollNavigation } from "@/hooks/useScrollNavigation";
import { resumeAsset } from "@/content/assets/resume";
import {
  navigationItems,
  navigationLabels,
} from "@/content/shared/navigation";

const subscribeToHydration = () => () => { };
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function NavBar() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { navigateTo } = useScrollNavigation();

  const isDarkTheme = mounted && resolvedTheme === "dark";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const routesToPrefetch = Array.from(
      new Set(
        navigationItems
          .map((item) => item.href)
          .filter((href) => href.startsWith("/") && !href.startsWith("/#")),
      ),
    );

    const prefetchRoutes = () => {
      routesToPrefetch.forEach((href) => router.prefetch(href));
    };

    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(prefetchRoutes, {
        timeout: 2500,
      });

      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(prefetchRoutes, 1200);

    return () => window.clearTimeout(timeoutId);
  }, [router]);

  const toggleTheme = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    setIsMenuOpen(false);
    if (href.startsWith("/#")) {
      e.preventDefault();
      navigateTo(href);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md shadow-md dark:shadow-white/5 py-3" : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, "/#home")}
          className="group relative"
        >
          <span className="text-3xl font-bold tracking-tighter block">
            <GradientText>Ankit</GradientText>
            <span className="text-foreground">.dev</span>
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navigationItems.map((item) => {
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-bold transition-colors relative group cursor-pointer text-foreground/80 hover:text-primary drop-shadow-sm"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 w-0 group-hover:w-full shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
              </Link>
            );
          })}

          <div className="flex items-center gap-4 ml-4">
            <button
              onClick={onDownloadResume}
              className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-primary/25"
            >
              <Download size={16} />
              {navigationLabels.resume}
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-foreground shadow-sm"
              aria-label={navigationLabels.toggleTheme}
            >
              {mounted ? (
                isDarkTheme ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )
              ) : (
                <span className="block h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMenuOpen(true)}
          aria-label={navigationLabels.toggleMenu}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="md:hidden fixed top-0 right-0 bottom-0 w-[80vw] max-w-[320px] bg-background border-l border-border z-50 flex flex-col p-6 shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-bold tracking-tighter">
                  <GradientText>Ankit</GradientText>
                  <span className="text-foreground">.dev</span>
                </h2>
                <button
                  className="p-2 text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-6 flex-grow">
                {navigationItems.map((item, index) => {
                  if (pathname === item.href) return null;
                  if (pathname === "/" && item.href === "/") return null;

                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="text-lg font-bold transition-colors cursor-pointer text-foreground hover:text-primary block py-2 border-b border-border/50"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-6 mt-8 pt-8 border-t border-border"
              >
                <button
                  onClick={() => {
                    window.open(resumeAsset.sharedDriveViewUrl, "_blank");
                    setIsMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-full bg-primary text-primary-foreground font-bold shadow-lg flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  {navigationLabels.resume}
                </button>

                <button
                  onClick={() => {
                    toggleTheme();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-3 text-foreground font-medium py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  {isDarkTheme ? (
                    <>
                      <Sun size={20} /> {navigationLabels.lightMode}
                    </>
                  ) : (
                    <>
                      <Moon size={20} /> {navigationLabels.darkMode}
                    </>
                  )}
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default NavBar;
