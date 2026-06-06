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
- Content architecture lives under `src/content` because the project already stores MDX blog content there and the `@/*` alias resolves to `src/*`.
- During content refactors, preserve existing component markup, Tailwind classes, animation props, and behavior. Extract human-readable text, URLs, and labels first; avoid moving rendering logic into content modules.
- Command palette content belongs under `src/content/command`; keep command execution functions, router calls, theme toggling, icon rendering, filtering, and keyboard handling inside `CommandPalette.tsx`.

## Maintenance

- When stable repo-specific rules, constraints, or conventions are discovered while working, update this file with the relevant guidance.
- Keep updates concise and practical. Avoid recording one-off observations that are not useful for future work.
