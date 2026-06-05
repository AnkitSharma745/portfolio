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

## Maintenance

- When stable repo-specific rules, constraints, or conventions are discovered while working, update this file with the relevant guidance.
- Keep updates concise and practical. Avoid recording one-off observations that are not useful for future work.
