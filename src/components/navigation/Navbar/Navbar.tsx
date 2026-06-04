"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Moon, Sun, Menu, X, Download } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { onDownloadResume } from "@/lib/utils/download";
import GradientText from "@/components/GradientText";
import { useScrollNavigation } from "@/hooks/useScrollNavigation";

const subscribeToHydration = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function NavBar() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribeToHydration,
    getClientSnapshot,
    getServerSnapshot
  );
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const { navigateTo } = useScrollNavigation();

  const RESUME_DERIVE_LINK = "https://drive.google.com/file/d/1JoEIb7jWp_K1yelIFObAnIKE6VbxF4MR/view?usp=sharing";
  const isDarkTheme = mounted && resolvedTheme === "dark";

  const NAV_ITEMS = [
    { label: "Home", href: "/", id: "home" },
    { label: "About", href: "/about", id: "about" },
    { label: "Skills", href: "/skills", id: "skills" },
    { label: "Experience", href: "/experience", id: "experience" },
    { label: "Projects", href: "/projects", id: "projects" },
    { label: "Open Source", href: "/open-source", id: "open-source" },
    { label: "Guestbook", href: "/guestbook", id: "guestbook" },
    { label: "Contact", href: "/contact", id: "contact" },
    { label: "Blog", href: "/blog", id: "blog" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-lg py-3" : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" onClick={(e) => handleNavClick(e, "/#home")} className="group relative">
          <h1 className="text-3xl font-bold tracking-tighter">
            <GradientText>
              Ankit
            </GradientText>
            <span className="text-foreground">.dev</span>
          </h1>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium transition-colors relative group cursor-pointer text-foreground/80 hover:text-primary"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 w-0 group-hover:w-full" />
              </Link>
            );
          })}

          <div className="flex items-center gap-4 ml-4">
            <button
              onClick={onDownloadResume}
              className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-primary/25"
            >
              <Download size={16} />
              Resume
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-secondary transition-colors text-foreground"
              aria-label="Toggle Theme"
            >
              {mounted ? (
                isDarkTheme ? <Sun size={20} /> : <Moon size={20} />
              ) : (
                <span className="block h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed inset-0 top-[60px] bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8"
          >
            {NAV_ITEMS.map((item, index) => {
              // Hide active route link in mobile menu too
              if (pathname === item.href) return null;
              if (pathname === "/" && item.href === "/") return null;

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-2xl font-bold transition-colors cursor-pointer text-foreground hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              )
            })}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col gap-6 mt-8"
            >
              <button
                onClick={() => {
                  window.open(RESUME_DERIVE_LINK, "_blank");
                  setIsMenuOpen(false);
                }}
                className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg"
              >
                Resume
              </button>

              <button
                onClick={() => {
                  toggleTheme();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 text-foreground"
              >
                {isDarkTheme ? (
                  <>
                    <Sun size={20} /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon size={20} /> Dark Mode
                  </>
                )}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default NavBar;
