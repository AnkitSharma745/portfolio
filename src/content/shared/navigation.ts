export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

export const navigationItems: NavigationItem[] = [
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

export const navigationLabels = {
  resume: "Resume",
  darkMode: "Dark Mode",
  lightMode: "Light Mode",
  toggleTheme: "Toggle Theme",
  toggleMenu: "Toggle Menu",
} as const;
