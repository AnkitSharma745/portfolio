# Project Instructions

These instructions apply to this portfolio repository.

## User Preferences

- Do not run build verification commands unless the user explicitly asks for them.
  - This includes `pnpm run build`, `pnpm.cmd run build`, `next build`, and similar production build checks.
- Before running expensive verification, ask the user whether to verify.
- Do not install packages without user approval.
  - If a package is needed, explain the package, why it is needed, and ask the user before installing it.
- Keep verification focused on what the user requested. Avoid spending tokens and runtime on broad checks unless approved.

## Repo Notes

- This is a Next.js portfolio project.
- The package manager is `pnpm`.
- On this Windows environment, use `pnpm.cmd` instead of `pnpm` when the user asks for package-manager commands, because PowerShell execution policy can block `pnpm.ps1`.
- Visual components should be theme-aware. Prefer semantic Tailwind colors such as `bg-background`, `text-foreground`, `border-border`, `primary`, and `accent`, with `dark:` variants where needed. Avoid hard-coded white glow/beam colors unless they are scoped to dark mode.
- **Hydration Safety (Next.js SSR/Hydration Mismatches):**
  - **No dynamic theme conditionals in classNames:** Never toggle tailwind class names in JS using `isDark` or `theme === "dark"`. During SSR, the theme resolves to `undefined`, leading to hydration mismatches when the client updates classNames post-hydration. Instead, use static Tailwind utility classes with native `dark:` variants (e.g. `bg-white dark:bg-black/5`).
  - **No inline style theme evaluations:** Avoid inline style objects that dynamically change properties like background, color, or border based on JS theme checks (e.g., `style={{ background: isDark ? "#000" : "#fff" }}`). Use CSS variables defined in `src/app/globals.css` instead (e.g., `style={{ background: "var(--timeline-bg)" }}`).
  - **No unsafe random/date calls:** Do not use random generators (`Math.random()`), timestamps (`Date.now()`), or browser-only APIs during the initial render. If needed, wrap in a `mounted` state check via `useEffect`, or supply stable static defaults.
- Content architecture lives under `src/content` because the project already stores MDX blog content there and the `@/*` alias resolves to `src/*`.
- During content refactors, preserve existing component markup, Tailwind classes, animation props, and behavior. Extract human-readable text, URLs, and labels first; avoid moving rendering logic into content modules.
- Command palette content belongs under `src/content/command`; keep command execution functions, router calls, theme toggling, icon rendering, filtering, and keyboard handling inside `CommandPalette.tsx`.
- Avoid `next/dynamic` for components that are rendered immediately in the initial tree. Prefer static imports when the terminal loader or app shell already masks initial loading; reserve dynamic imports for truly conditional, below-the-fold, or rarely used heavy widgets.

## Folder Architecture (Canonical — Do Not Deviate)

The project follows a strict four-layer architecture. Each layer has one responsibility.

### Layer Summary

| Layer | Location | Role |
|---|---|---|
| Routing Shell | `src/app/` | Next.js page routes + static metadata only |
| Full-Page Views | `src/views/` | Client layout wrappers, one per route |
| Page Sections | `src/sections/` | Homepage/page visual section modules |
| Generic UI | `src/components/` | Reusable content-agnostic atoms & molecules |
| Portfolio Data | `src/content/portfolio/` | Pure static data arrays and TypeScript types |

### Critical Rules

- **`src/app/**/page.tsx` files must NEVER have `"use client"`.** They are Server Components used for SSR metadata. All client rendering belongs in `src/views/`.
- **Section components live in `src/sections/`** — not `src/components/sections/` (that old location has been removed).
- **Portfolio data lives in `src/content/portfolio/`** — not `src/lib/constants/` (that old location has been removed).
- **`src/utils/constants.ts` has been deleted** — `JOURNEY_PHASES` now lives in `src/content/portfolio/journey.ts`.
- **Never create a folder with the `Section` suffix** (e.g., `AboutSection`). The `src/sections/` directory already provides context — use clean names like `About`, `Hero`, `Skills`.
- **Never import a section from inside another section.** Sections are siblings, not nested.
- **Never hard-code portfolio text (names, URLs, descriptions, labels) inside section or component `.tsx` files.** All human-readable content must live in `src/content/portfolio/`.

### Import Paths (Canonical)

| To import | Use this path |
|---|---|
| Homepage sections | `@/sections/<Name>/<Name>` |
| Portfolio data arrays | `@/content/portfolio/<filename>` |
| Blog MDX utilities | `@/lib/blog` |
| Shared animations | `@/lib/animations` |
| Command palette text | `@/content/command/commandPalette` |
| Social profile URLs | `@/content/social/profiles` |
| Contact data | `@/content/contact/contactChannels` |
| Nav link definitions | `@/content/shared/navigation` |
| Actions (openGithub, etc.) | `@/utils/actions` |
| Download helpers | `@/lib/utils/download` |
| Email helpers | `@/lib/utils/email` |
| UI Context (chat/command) | `@/context/UIContext` |
| Hooks | `@/hooks/<hookname>` |

### Architecture Reference

Full details, rationale, and anti-patterns are documented in `docs/ARCHITECTURE.md`.

## Maintenance

- When stable repo-specific rules, constraints, or conventions are discovered while working, update this file with the relevant guidance.
- Keep updates concise and practical. Avoid recording one-off observations that are not useful for future work.
