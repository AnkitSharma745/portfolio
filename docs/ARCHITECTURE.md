# Portfolio Architecture

> Last reviewed: June 2026
> Status: Active. Update this document when folder ownership or conventions change.

This repository is a content-driven portfolio engine. The preferred change model is: add or update content in one place, and let routes, metadata, navigation, and sitemap entries derive from that content where possible.

## Folder Ownership

| Folder | Responsibility |
|---|---|
| `src/app` | Next.js App Router route shells, metadata, SEO routes, and route-local components |
| `src/views` | Full-page wrappers for route experiences |
| `src/sections` | Self-contained visual sections |
| `src/components` | Generic reusable UI only |
| `src/content` | Portfolio knowledge, copy, navigation, SEO source data, and MDX posts |
| `src/hooks` | Reusable custom hooks |
| `src/lib` | Business logic and server utilities |
| `src/utils` | Generic side-effect helpers |

Layer flow:

```txt
src/app -> src/views -> src/sections -> src/components
                  \         \          \
                   \         \          -> src/content
                    \         -> src/content
                     -> src/content
```

No content file may import from `components`, `sections`, `views`, or `app`. Shared components must not import feature-specific modules.

## App Routes

- `src/app/**/page.tsx` files stay Server Components. Do not add `"use client"`.
- Route files compose views/components and own `metadata`, `generateMetadata`, and `generateStaticParams`.
- Visual UI that is only used by one route belongs in route-local `_components`.
- Dynamic routes must keep copyable, indexable URLs.

## Views

- One folder per full-page route, such as `src/views/ProjectsPage/ProjectsPage.tsx`.
- Views may use hooks, transitions, route state, filtering, sorting, and page-level layout.
- View-local components belong in `src/views/<ViewName>/_components`.

## Sections

- Sections are sibling features under `src/sections`.
- Do not import one section into another section.
- Do not create folders ending in `Section`.
- Section-local pieces belong in `src/sections/<Feature>/_components`.

## Components

A component belongs in `src/components` only when it is reusable, prop-driven, and free of page-specific business logic.

Rules:

- Prefer one exported React component per `.tsx` file.
- Local components stay local to the owning route, view, or section.
- Shared components stay generic.
- Component props should use dedicated interfaces.
- Keep feature-specific implementation out of global components.

## Content Domains

Editable portfolio knowledge lives in domain folders:

```txt
src/content/about
src/content/assets
src/content/blog
src/content/command
src/content/contact
src/content/experience
src/content/github
src/content/hero
src/content/projects
src/content/shared
src/content/skills
src/content/solutions
```

Use these imports:

| Domain | Import |
|---|---|
| About | `@/content/about/profile` |
| Blog MDX | `src/content/blog/<slug>.mdx` |
| Command palette | `@/content/command/commandPalette` |
| Contact | `@/content/contact/*` |
| Experience | `@/content/experience/roles` |
| GitHub journey | `@/content/github/journey` |
| Hero | `@/content/hero/*` |
| Projects | `@/content/projects/projects` |
| Shared site config | `@/content/shared/site` |
| Shared navigation | `@/content/shared/navigation` |
| Shared social profiles | `@/content/shared/social` |
| Skills | `@/content/skills/*` |
| Solutions | `@/content/solutions/solutions` |

Content may preserve existing JSX semantics where the current UI expects icon nodes or React content. Do not move hooks, state, event handlers, layouts, animations, or Tailwind classes into content.

## Adding Content

Blog:

1. Add one MDX file in `src/content/blog`.
2. Include frontmatter: `title`, `description`, `slug`, `date`, `tags`, `coverImage`, `seoTitle`, `seoDescription`, `canonical`, `ogImage`, `featured`.
3. Blog routes, metadata, RSS, and sitemap entries derive from the MDX source.

Project:

1. Add one object to `src/content/projects/projects.ts`.
2. Project list, detail route params, metadata, and sitemap entries derive from that object.

Skill:

1. Update the relevant files in `src/content/skills`.
2. Skill pages, deep links, and sitemap entries derive from the skills content.

Experience:

1. Add one object to `src/content/experience/roles.ts`.
2. The experience page consumes that domain source.

## SEO

- `siteConfig` lives in `src/content/shared/site.ts`.
- Shared metadata helpers live in `src/lib/metadata.ts`.
- `src/app/sitemap.ts`, `src/app/robots.ts`, and `src/app/feed.xml/route.ts` use shared content/configuration.
- Dynamic route metadata should use domain content and fall back gracefully when optional SEO fields are missing.

## Hydration Safety

- Do not branch Tailwind class strings from JS theme state. Use `dark:` variants.
- Avoid inline theme styles.
- Do not call `Math.random()`, `Date.now()`, or browser APIs during SSR render.
- Use mounted checks or client effects for browser-only logic.

## Validation

Allowed by default:

- Static import scans with `rg`.
- Focused lint/type checks when they are not build/export commands.

Not allowed without explicit approval:

- `pnpm.cmd run build`
- `pnpm.cmd build`
- `next build`
- export or production verification commands
- package installation
