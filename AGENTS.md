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

## Maintenance

- When stable repo-specific rules, constraints, or conventions are discovered while working, update this file with the relevant guidance.
- Keep updates concise and practical. Avoid recording one-off observations that are not useful for future work.
