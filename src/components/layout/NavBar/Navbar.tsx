"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import "./navbar.css";
import { useTheme } from "next-themes";

function NavBar() {
  const { theme, setTheme } = useTheme();
  const RESUME_PDF = "/resume.pdf";
  const RESUME_DERIVE_LINK = "https://drive.google.com/your-resume-link";

  const NAV_ITEMS = [
    ["home", "Home"],
    ["about", "About"],
    ["skills", "Skills"],
    ["projects", "Projects"],
    ["contact", "Contact"],
  ];

  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = theme === "dark";

  const navBg = isDark
    ? "bg-[#202C39]"
    : "bg-gradient-to-br from-[#fbf8f3] via-[#eff7f6] to-[#deeefc]";

  const navText = isDark ? "text-white" : "text-gray-900";

  const gradientFrom = "from-[#5A77FF]";
  const gradientTo = "to-[#00C9A7]";

  const buttonBase = `w-[70%] text-center py-3 font-semibold tracking-wide rounded-lg transition-all duration-300 shadow-md text-white`;
  const buttonGradient = `bg-gradient-to-r ${gradientFrom} ${gradientTo} hover:brightness-110`;

  return (
    <header
      className={`sticky top-0 z-50 w-full shadow-md transition-all duration-300 ${navBg} ${
        scrolled ? "border-b border-[#8E7AB5]/40 backdrop-blur-md" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* <h1
          className={`text-3xl font-extrabold px-4 py-2 rounded-xl bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white shadow-2xl hover:scale-105 transition-transform tracking-wide`}
        >
          Ankit
        </h1> */}
        <h1 className="text-4xl font-extrabold hover:scale-105 transition-transform tracking-wide  bg-gradient-to-r from-[#06b6d4] via-[#3b82f6] to-[#9333ea] text-transparent bg-clip-text">
          Ankit
        </h1>

        {/* Hamburger menu */}
        <button
          className="md:hidden transition-transform duration-300 hover:scale-110"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span className="transition-transform duration-500">
            {isMenuOpen ? (
              <X size={28} className={`${navText} animate-pulse`} />
            ) : (
              <Menu size={28} className={`${navText} animate-pulse`} />
            )}
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-base font-medium">
          {NAV_ITEMS.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={`nav-button ${isDark ? "nav-dark" : "nav-light"}`}
            >
              {label}
            </a>
          ))}

          <button
            onClick={() => {
              window.open(RESUME_DERIVE_LINK, "_blank");
              const link = document.createElement("a");
              link.href = RESUME_PDF;
              link.download = "Resume.pdf";
              link.click();
            }}
            className={`nav-button ${isDark ? "nav-dark" : "nav-light"}`}
          >
            Resume
          </button>

          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`group nav-button  ${isDark ? "border-[#C9BBCF]" : "border-[#5A77FF]"} hover:scale-110 transition-all duration-300`}
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`md:hidden px-6 py-6 flex flex-col gap-5 items-center text-base font-medium transition-all duration-300 ${
            isDark ? "bg-[#202C39] text-white" : "bg-[#fefefe] text-black"
          } shadow-2xl rounded-b-3xl`}
        >
          {NAV_ITEMS.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setIsMenuOpen(false)}
              className={`${buttonBase} ${buttonGradient}`}
            >
              {label}
            </a>
          ))}

          <button
            onClick={() => {
              window.open(RESUME_DERIVE_LINK, "_blank");
              const link = document.createElement("a");
              link.href = RESUME_PDF;
              link.download = "Resume.pdf";
              link.click();
              setIsMenuOpen(false);
            }}
            className={`${buttonBase} ${buttonGradient}`}
          >
            Resume
          </button>

          <button
            onClick={() => {
              setTheme(isDark ? "light" : "dark");
              setIsMenuOpen(false);
            }}
            className={`${buttonBase} ${buttonGradient}`}
          >
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      )}
    </header>
  );
}

export default NavBar;
