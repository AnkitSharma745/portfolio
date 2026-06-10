# Portfolio Architecture

> **Last reviewed:** June 2026  
> **Status:** Active — update this document when the folder structure or conventions change.

This document defines the canonical folder structure, architectural conventions, and the reasoning behind every design decision. Any agent or developer working on this codebase must read this before making structural changes.

---

## 1. High-Level Principle

The codebase is split into four orthogonal concerns:

| Layer | Location | What it holds |
|---|---|---|
| **Routing / Page Shells** | `src/app/` | Next.js App Router pages, metadata, layouts |
| **Full-Page Views** | `src/views/` | Client layout wrappers for each route |
| **Page Sections** | `src/sections/` | Self-contained homepage / page section modules |
| **Reusable UI** | `src/components/` | Generic atoms and molecules shared across pages |
| **Portfolio Content** | `src/content/portfolio/` | Pure static data arrays — no JSX |

These layers flow in only one direction:

```
src/app/ → src/views/ → src/sections/ → src/components/
                    ↘                 ↗
               src/content/portfolio/
```

No layer may import from a layer above it.

---

## 2. Folder Tree

```
src/
├── app/                         # Next.js App Router — routing only
│   ├── layout.tsx               # Root layout: providers, nav, footer
│   ├── page.tsx                 # Home route — renders <HomePage />
│   ├── about/page.tsx           # /about — renders <AboutPage />
│   ├── experience/page.tsx      # /experience
│   ├── projects/page.tsx        # /projects
│   ├── open-source/page.tsx     # /open-source
│   ├── skills/page.tsx          # /skills
│   ├── blog/
│   │   ├── page.tsx             # /blog list
│   │   └── [slug]/page.tsx      # /blog/:slug — SSR per post
│   ├── contact/page.tsx
│   ├── guestbook/page.tsx
│   ├── globals.css
│   ├── robots.ts
│   └── sitemap.ts
│
├── views/                       # Full-page layout views (one per route)
│   ├── HomePage/
│   │   └── HomePage.tsx
│   ├── AboutPage/
│   │   └── AboutPage.tsx
│   ├── ExperiencePage/
│   │   └── ExperiencePage.tsx
│   ├── ProjectsPage/
│   │   └── ProjectsPage.tsx
│   ├── OpenSourcePage/
│   │   └── OpenSourcePage.tsx
│   ├── SkillsPage/
│   │   └── SkillsPage.tsx
│   └── ContactPage/
│       └── ContactPage.tsx
│
├── sections/                    # Reusable page-level section modules
│   ├── Hero/
│   │   └── Hero.tsx
│   ├── About/
│   │   └── About.tsx
│   ├── Skills/
│   │   └── Skills.tsx
│   ├── Tools/
│   │   └── Tools.tsx
│   ├── Connect/
│   │   └── Connect.tsx
│   ├── Contact/
│   │   └── Contact.tsx
│   ├── Projects/
│   │   └── Projects.tsx
│   ├── OpenSource/
│   │   └── OpenSource.tsx
│   ├── Solutions/
│   │   └── Solutions.tsx
│   ├── CodingYearJourney/
│   │   └── CodingYearJourney.tsx
│   └── github/
│       └── Github.tsx
│
├── components/                  # Reusable generic UI atoms & molecules
│   ├── navigation/
│   │   ├── Navbar/
│   │   └── Footer/
│   ├── ui/
│   │   └── TerminalLoader.tsx
│   ├── blog/                    # Blog-specific rendering components
│   ├── guestbook/               # Guestbook form + list components
│   ├── ChatWidget/
│   │   └── ChatWidget.tsx
│   ├── CommandPalette.tsx
│   ├── Breadcrumbs.tsx
│   ├── FilterControls.tsx
│   ├── GradientText.tsx
│   ├── IntroVideoModal.tsx
│   ├── KeyboardShortcuts.tsx
│   ├── PageTransition.tsx
│   ├── ParticlesBackground.tsx
│   ├── ProjectModal.tsx
│   ├── ProgressBar.tsx
│   ├── ScrollToTop.tsx
│   ├── SectionDivider.tsx
│   ├── ShareButtons.tsx
│   ├── SkipToContent.tsx
│   ├── SortControls.tsx
│   ├── StatsCard.tsx
│   ├── Toast.tsx
│   ├── Typewriter.tsx
│   ├── CopyButton.tsx
│   └── theme-provider.tsx
│
├── content/                     # All static data and copy
│   ├── portfolio/               # Portfolio-specific content data
│   │   ├── general.tsx          # Typewriter headlines, timeline data
│   │   ├── journey.ts           # JOURNEY_PHASES (coding year progression)
│   │   ├── experience.ts        # EXPERIENCE_DATA + ExperienceItem type
│   │   ├── projects.ts          # PROJECTS_DATA + Project / CompanyProjects types
│   │   ├── skills.tsx           # TECH_ITEMS, TOOLS_DEV, TOOLS_PRODUCTIVITY, etc.
│   │   ├── solutions.tsx        # SOLUTIONS_DATA + Solution type
│   │   └── openSource.tsx       # OPEN_SOURCE_CONTRIBUTIONS + Contribution type
│   ├── blog/                    # MDX blog post files (*.mdx)
│   ├── command/
│   │   └── commandPalette.ts    # Command palette labels, routes, keywords
│   ├── contact/
│   │   ├── connectSection.ts    # Connect section heading/subtext
│   │   └── contactChannels.ts   # Phone, email, social contact cards
│   ├── social/
│   │   └── profiles.ts          # Social profile URLs (github, linkedin, twitter)
│   └── shared/
│       └── navigation.ts        # Nav link definitions
│
├── context/
│   └── UIContext.tsx            # Global UI state: chat open, command palette open
│
├── hooks/
│   ├── useScrollNavigation.ts   # Active section tracking via IntersectionObserver
│   └── useToast.ts              # Toast notification state
│
├── lib/
│   ├── blog.ts                  # Server-side MDX blog utilities (fs, gray-matter)
│   ├── animations.ts            # Shared framer-motion Variants objects
│   ├── guestbook.ts             # Guestbook localStorage helpers
│   ├── metadata.ts              # Shared generateMetadata helpers
│   └── utils/
│       ├── download.ts          # onDownloadResume helper
│       └── email.ts             # EmailJS send helpers
│
└── utils/
    └── actions.ts               # Shared side-effect actions (openGithub, openLinkedin, etc.)
```

---

## 3. Layer Rules

### `src/app/` — Routing Shell

- Every file here is a **Next.js route segment** only.
- Export static `metadata` or `generateMetadata` at the top of each `page.tsx` for SSR SEO.
- Pages must **never contain visual logic** — they only instantiate a single view component and export metadata.
- Do NOT add `"use client"` to a `page.tsx` — always keep them as Server Components.

```tsx
// ✅ Correct page.tsx
import type { Metadata } from "next";
import HomePage from "@/views/HomePage/HomePage";

export const metadata: Metadata = { title: "..." };
export default function Home() { return <HomePage />; }
```

### `src/views/` — Full-Page View Wrappers

- One view per route. Named `<RouteName>Page.tsx`.
- Owns the page's full layout: `PageTransition`, `ParticlesBackground`, `Breadcrumbs`, `ScrollToTop`.
- Must include `"use client"` as they use hooks and transitions.
- Views may import from `src/sections/` and `src/components/`.
- Views may import data directly from `src/content/portfolio/` when needed for client-side state.

### `src/sections/` — Homepage & Shared Sections

- One folder per section. Folder and file name match exactly (e.g. `Hero/Hero.tsx`).
- Each section is a full-height or full-width visual chunk of a page.
- Must always have an `id` attribute matching the section name for scroll navigation.
- Must include `"use client"` when they use framer-motion animations or hooks.
- Sections import their **display data exclusively from `src/content/portfolio/`**.
- Sections import **generic UI from `src/components/`**.

### `src/components/` — Generic UI Atoms & Molecules

- Shared UI that has no portfolio-specific knowledge.
- Must be **content-agnostic** — pass all text through props, never hard-code portfolio strings.
- Exception: `CommandPalette.tsx` and `ChatWidget.tsx` contain portfolio-specific behavior but are kept here because they are global app-level overlays.

### `src/content/portfolio/` — Portfolio Data

- **Pure TypeScript modules** — no rendering logic, no JSX (except for icon nodes in `skills.tsx`, `solutions.tsx`, `openSource.tsx` which must use `.tsx` extension).
- Export typed interfaces alongside the data constants.
- All display text (headings, descriptions, labels) lives here, NOT inside the section component file.
- No imports from `src/components/`, `src/sections/`, or `src/views/`.

---

## 4. Import Path Conventions

All imports use the `@/` alias which resolves to `src/`.

| To import from | Use |
|---|---|
| Portfolio data | `@/content/portfolio/<filename>` |
| Blog data | `@/content/blog/<slug>.mdx` |
| Command palette content | `@/content/command/commandPalette` |
| Social profiles | `@/content/social/profiles` |
| Nav links | `@/content/shared/navigation` |
| Animation variants | `@/lib/animations` |
| Blog server utils | `@/lib/blog` |
| Download helpers | `@/lib/utils/download` |
| Email helpers | `@/lib/utils/email` |
| Actions (openGithub, etc.) | `@/utils/actions` |
| UI Context | `@/context/UIContext` |
| Hooks | `@/hooks/<hookname>` |

---

## 5. SSR & Hydration Safety Rules

These rules MUST be followed to prevent Next.js hydration mismatches.

1. **Never conditionally assign Tailwind classes based on JS theme state.** Use native `dark:` variants instead.
   ```tsx
   // ❌ Wrong — causes hydration mismatch
   className={isDark ? "bg-black" : "bg-white"}
   
   // ✅ Correct
   className="bg-white dark:bg-black"
   ```

2. **Never use inline style objects that depend on `theme` JS state.** Use CSS variables defined in `globals.css`.
   ```tsx
   // ❌ Wrong
   style={{ background: isDark ? "#000" : "#fff" }}
   
   // ✅ Correct
   style={{ background: "var(--timeline-bg)" }}
   ```

3. **Never call `Math.random()`, `Date.now()`, or browser APIs at component render time.** Use `useEffect` + mounted state pattern.

4. **Page components (`src/app/**/page.tsx`) must remain Server Components.** Do not add `"use client"` to them.

---

## 6. SEO Conventions

- Every route defines `export const metadata: Metadata` or `generateMetadata()` at the `page.tsx` level.
- Dynamic routes (e.g. `/blog/[slug]`) use `generateMetadata` to populate per-post title, description, and OG image.
- `src/app/robots.ts` and `src/app/sitemap.ts` auto-generate SEO files.
- Use `<h1>` exactly once per page — place it in the view component, not the section.

---

## 7. What NOT to Do

| Anti-Pattern | Reason |
|---|---|
| Add portfolio data strings inside `.tsx` section files | Makes content hard to update without touching rendering code |
| Import a section from inside another section | Creates circular dependency risk |
| Create a `Page` component inside `src/sections/` | Sections are sub-page modules, not full pages |
| Create a `Section` component inside `src/views/` | Views are layout wrappers, not visual sections |
| Add `"use client"` to `src/app/**/page.tsx` | Breaks SSR metadata generation |
| Hard-code contact info / social links in components | Must live in `src/content/` for easy maintenance |
| Use `next/dynamic` for above-the-fold components | Causes layout shift; use static imports instead |
| Name folders with `Section` suffix (e.g. `AboutSection`) | Redundant; sections folder already provides context |
