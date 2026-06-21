> Repository Laws
>
> The highest-priority rules in this document were created after real regressions, infinite AI loops, hydration issues, architectural drift, and wasted development time.
>
> Treat these instructions as non-negotiable.
>
> If any future instruction conflicts with these laws, these laws take precedence unless the user explicitly overrides them.

## Repository Laws (Highest Priority)

- NEVER run build verification commands unless explicitly requested by
  the user.
- NEVER execute:
  - `pnpm.cmd run build`
  - `pnpm.cmd build`
  - `next build`
  - export/production verification commands without user approval.
- Ask before expensive verification.
- NEVER install packages without approval.
- Explain package purpose, alternatives, and why it is needed.
- Use `pnpm.cmd` on Windows.

## Scope Control Laws

- Only modify what the user requested.
- Do NOT opportunistically refactor unrelated areas.
- Do NOT introduce competing patterns.
- Preserve existing good implementations.

## Change Classification

- KEEP: Preserve as-is.
- CLEAN UP: Minor safe improvements.
- HARDEN: Production-quality fixes.
- EVOLVE: Architectural enhancements.
- MANUAL REVIEW: Document uncertainty.

## Canonical Architecture

These are the current core architecture rules. They supersede older portfolio
folder conventions unless the user explicitly overrides them.

- `src/app`: Next.js App Router route shells, metadata, SEO routes, and
  route-local components.
- `src/views`: Full-page wrappers for route experiences.
- `src/sections`: Self-contained visual sections.
- `src/components`: Generic reusable UI only.
- `src/content`: Portfolio knowledge, copy, navigation, SEO source data, and
  MDX posts.
- `src/hooks`: Reusable custom hooks.
- `src/lib`: Business logic and server utilities.
- `src/utils`: Generic side-effect helpers.

### Dependency Rules

- `src/app` may compose `views`, route-local `_components`, and metadata logic.
- `src/views` may compose sections, shared components, and content.
- `src/sections` may compose shared components, local `_components`, and content.
- `src/components` must remain generic and reusable.
- `src/content` must never import from `components`, `sections`, `views`, or
  `app`.
- Shared components must never import feature-specific components.

### Routing Rules

- `src/app/**/page.tsx` must NEVER use `"use client"`.
- Route files own route-level `metadata`, `generateMetadata`, and
  `generateStaticParams`.
- Visual UI used by only one route belongs in route-local `_components`.
- Every meaningful dynamic route must remain copyable, indexable, and safe for
  metadata generation.

### Sections Rules

- Sections are siblings.
- Never import sections into sections.
- Never create folders ending with `Section`.
- Section-local pieces belong in `src/sections/<Feature>/_components`.

### View Rules

- One folder per full-page route, such as
  `src/views/ProjectsPage/ProjectsPage.tsx`.
- View-local pieces belong in `src/views/<ViewName>/_components`.

### Component Rules

- Prefer one exported React component per `.tsx` file.
- A component belongs in `src/components` only when it is reusable, prop-driven,
  and free of page-specific business logic.
- Local components stay local to the owning route, view, or section.
- Shared components remain generic.
- Component props should use dedicated interfaces.
- Existing global overlays `CommandPalette.tsx` and `ChatWidget/ChatWidget.tsx`
  may remain in `src/components`; their editable content/configuration must
  stay in `src/content`.

## Content Philosophy

- Components render.
- Content describes.
- Configuration controls.
- Move all editable portfolio knowledge to `src/content`.
- Preserve JSX semantics.
- Do not reintroduce `src/content/portfolio`.
- Do not reintroduce `src/content/social`; shared social profiles live in
  `src/content/shared/social.ts`.
- `siteConfig` lives in `src/content/shared/site.ts`.

### Content Domains

- About: `src/content/about`
- Assets: `src/content/assets`
- Blog: `src/content/blog`
- Command palette: `src/content/command`
- Contact: `src/content/contact`
- Experience: `src/content/experience`
- GitHub journey: `src/content/github`
- Hero: `src/content/hero`
- Projects: `src/content/projects`
- Shared configuration: `src/content/shared`
- Skills: `src/content/skills`
- Solutions: `src/content/solutions`

### Move

- Headings
- Labels
- Paragraphs
- Stats
- Quick prompts
- Filters
- SEO text
- Guestbook text
- Chat content

### Do NOT Move

- Hooks
- Event handlers
- State
- Tailwind classes
- Animations
- Layouts

## Adding Content

### Blog

- Add one MDX file in `src/content/blog`.
- Use frontmatter:
  - title
  - description
  - slug
  - date
  - tags
  - coverImage
  - seoTitle
  - seoDescription
  - canonical
  - ogImage
  - featured
- Blog routes, metadata, RSS, and sitemap entries must derive from the MDX
  source.

### Project

- Add one object to `src/content/projects/projects.ts`.
- Project list, detail route params, metadata, and sitemap entries must derive
  from that object.

### Skill

- Update the relevant files in `src/content/skills`.
- Skill pages, deep links, and sitemap entries must derive from the skills
  content.

### Experience

- Add one object to `src/content/experience/roles.ts`.
- The experience page must consume `src/content/experience/roles.ts`.

## Hydration Safety

- Never use JS theme conditionals for Tailwind classes.
- Prefer `dark:` variants.
- Avoid inline theme styles.
- Avoid `Math.random()` and `Date.now()` during SSR.
- Use mounted checks for browser-only logic.

## Command Palette

- Content: `src/content/command`
- Execution logic remains in `CommandPalette.tsx`

## Dynamic Imports

- Avoid `next/dynamic` for immediately rendered components.
- Use only for truly conditional/heavy experiences.

## Blog System

- Use MDX.
- One file per post.
- Frontmatter:
  - title
  - description
  - slug
  - date
  - tags
  - coverImage
  - seoTitle
  - seoDescription
  - canonical
  - ogImage
  - featured

## TypeScript Excellence

- ZERO `any` unless technically unavoidable.
- Prefer:
  - interfaces
  - type aliases
  - generics
  - utility types
  - unknown
  - discriminated unions
- Justify any remaining `any`.

## React Standards

Avoid: - state updates during render - infinite effect loops - stale
closures - memory leaks - improper cleanup - derived state misuse -
StrictMode warnings

Fix only verified issues.

## Next.js Standards

Verify: - App Router conventions - generateMetadata usage -
client/server boundaries - hydration safety - Image usage - Link usage -
static export compatibility

Preserve behavior.

## Accessibility Standards

Ensure: - semantic HTML - keyboard support - aria labels - modal
accessibility - focus management - reduced motion support - image alt
text

## Performance Philosophy

- Measure before optimizing.
- Avoid premature memoization.
- Avoid unnecessary client components.
- Optimize only verified bottlenecks.

## Skills Experience Philosophy

Progressive disclosure:

Overview → Capabilities → Technologies → Usage → Practices → Proof →
Artifacts → Lessons Learned

- Skills content lives in `src/content/skills`.
- The home skills section should be instantly scannable: direct skill
  cards first, deeper capability links second.
- Avoid proficiency percentages, fake bars, and dense capability copy on
  the homepage.

Desktop: - Hover interactions

Mobile: - Tap interactions

No hover-only experiences.

### Hover Stability

- Do not move the hovered target itself with vertical hover transforms such as
  `hover:-translate-y-*` or `whileHover={{ y: ... }}`.
- Border-edge hover must not flicker, repeatedly enter/leave, or feel like the
  page is hanging.
- Use stable hover feedback instead: color, border, shadow, opacity, or
  transforms on inner decorative children that do not move the hit target.

## Routing Philosophy

Every meaningful interaction should support routing.

Examples: - /skills/frontend-systems - /skills/frontend-systems/react -
/projects/\[slug\] - /blog/\[slug\]

Support: - breadcrumbs - copyable URLs - SEO indexing - chat
navigation - command palette navigation

## Missing Information Handling

Use graceful fallbacks:

- Public artifacts unavailable due to confidentiality.
- Technical write-up coming soon.
- Architecture insights will be shared in future publications.

Never show broken states.

## SEO Philosophy

Maintain: - metadata - Open Graph - Twitter metadata - canonical URLs -
JSON-LD - sitemap.xml - robots.txt - RSS - llms.txt

Single source of truth.

## Discoverability

Prepare for: - Google Search Console - Bing indexing - AI
discoverability

Ensure meaningful routes are indexable.

## Validation Rules

After every approved change verify:

- no runtime regressions
- no broken interactions
- no accessibility regressions
- no SEO regressions

Only run builds when explicitly approved.

## Agent Output Requirements

For every task report:

- files scanned
- implementations preserved
- issues discovered
- changes made
- why changes are safe
- validations performed
- manual review recommendations
- remaining technical debt

Never silently skip decisions.

## Portfolio Vision

The portfolio should feel like:

- Apple Precision
- Linear Efficiency
- Raycast Discoverability
- Vercel Polish
- Stripe Storytelling

It should communicate:

"This engineer can take ideas, leverage modern tools including AI, and
build production-grade products end-to-end."

The portfolio should progressively reveal:

- identity
- capabilities
- proof of work
- engineering thinking
- AI-era workflow
- technical depth

Avoid: - fake percentages - vanity metrics - meaningless labels -
gimmicky effects - template-like experiences

Prefer: - evidence over adjectives - proof over claims - clarity over
complexity - progressive disclosure over information dumping

## Final Objective

Evolve this repository into:

A production-grade, content-driven, AI-era portfolio engine that
progressively reveals identity, capabilities, engineering depth, proof
of work, and technical thinking while remaining elegant, fast,
maintainable, discoverable, and trustworthy.

Protect existing quality.

Evolve intentionally.

Leave the codebase better than you found it.
