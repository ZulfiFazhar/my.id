# Copilot Instructions for my-id-v2

## Project Overview

**my-id-v2** is a modern Next.js 15 fully static portfolio website with TypeScript, featuring:

- **Blog System**: MDX-based blogs with gray-matter frontmatter, syntax highlighting via sugar-high
- **Project Portfolio**: Static TypeScript data with filtering by category/status
- **Competition Showcase**: Event tracking and results from static data
- **Styling**: Tailwind CSS v4 + shadcn/ui components + Framer Motion animations

**Tech Stack**: Next.js 15, React 19, TypeScript, MDX, Tailwind

**Architecture**: 100% static site - No database, no authentication, all content in TypeScript files

---

## Architecture Essentials

### Data Flow & Key Boundaries

**MDX Blog System** ([mdx.ts](src/lib/mdx.ts), `src/app/blogs/posts/*.mdx`)

- Posts stored as `.mdx` files with YAML frontmatter (title, description, category, tags, publishDate)
- `getAllMDXPosts()` scans posts directory, parses frontmatter via gray-matter, calculates read time (180 words/min)
- Images mapped via `getBlogImage()` using slug + category fallback
- Posts sorted by publishDate (newest first)
- Frontend renders via [mdx-components.tsx](src/components/mdx-components.tsx) with custom component mapping

**Static Data Management** ([types/projects.ts](src/types/projects.ts), [types/competitions.ts](src/types/competitions.ts))

- All projects and competitions defined as TypeScript arrays in `types/` folder
- Single source of truth for content (no database required)
- Type-safe content with compile-time validation
- Helper functions in [lib/projects.ts](src/lib/projects.ts) for filtering (category, status, limit)
- Direct imports throughout app for instant data access

### Component Organization

- **Layout Components** ([navbar/](src/components/navbar/), [layout/](src/components/layout/)): Global UI patterns
  - Navbar: Fixed bottom, responsive, hides on `/dashboard` routes
  - Conditional breadcrumbs & background patterns based on route
- **Section Components** ([section/](src/components/section/)): Full-width content sections (hero, blogs, projects, etc.)
- **UI Components** ([ui/](src/components/ui/)): shadcn/ui exports + custom theme toggle
- **MagicUI Components**: Animated gradients, scroll progress, word rotation (premium UI effects)

### Routing Strategy

- Public routes: `/`, `/blogs`, `/blogs/[slug]`, `/projects`, `/projects/[slug]`, `/socials`, `/auth`
- Protected dashboard: `/dashboard`, `/dashboard/analytics`, `/dashboard/competitions/*`, `/dashboard/projects/*`
- Auth guard component wraps dashboard routes (checks `isAuthorized` from context)

---

## Developer Workflows

### Setup & Running

```bash
npm install                 # Install dependencies (or: bun install)
npm run dev                 # Start dev server (uses turbopack)
npm run build              # Production build
npm run lint               # Run ESLint
```

### Adding Content

**New Blog Post**:

1. Create `.mdx` file in `src/app/blogs/posts/` (e.g., `my-post.mdx`)
2. Add YAML frontmatter: `title`, `description`, `category`, `tags`, `publishDate`, `author`, `imageUrl?`
3. Content parsed automatically on build

**New Project**:

1. Add entry to `projects` array in [types/projects.ts](src/types/projects.ts)
2. Rebuild to see changes (`npm run dev` auto-reloads)

**New Competition**:

1. Add entry to `competitions` array in [types/competitions.ts](src/types/competitions.ts)
2. Rebuild to see changes

---

## Code Patterns & Conventions

### File Naming

- Components: PascalCase (`Navbar.tsx`, `ProjectCard.tsx`)
- Utilities/hooks: camelCase (`useAuth.ts`, `useBreadcrumb.ts`, `utils.ts`)
- Types: Separate in `types/` directory, exported as named exports
- MDX posts: kebab-case slugs (`getting-started-nextjs-15.mdx`)

### Type Safety

- Strict TypeScript enabled (`"strict": true`)
- Interfaces preferred over types for component props
- Props interfaces named `{ComponentName}Props` (e.g., `NavbarProps`)
- Query/filter objects typed (e.g., `ProjectQuery` in [projects.ts](src/lib/projects.ts))

### Styling

- Tailwind CSS v4 with PostCSS (no arbitrary values in class strings—use `@apply` in CSS when needed)
- Dark/light mode via `next-themes` with system preference detection
- Component library: shadcn/ui (accordion, button, card, dialog, tabs, etc.)
- Animation: Framer Motion for transitions; Motion for page-level animations

### Error Handling

- API endpoints: Try-catch with `NextResponse.json({ success: false, error })` on failure
- Client: Toast notifications via `sonner` package
- Auth errors: Specific Firebase error codes checked (`auth/popup-blocked`, `auth/cancelled-popup-request`, etc.)
- DB errors: Logged with context; rethrown for client-side handling

### Module Path Alias

- `@/*` maps to `src/*` (configured in [tsconfig.json](tsconfig.json))
- Always import from `@/components`, `@/lib`, `@/types`, etc.

---

## Critical Integration Points

| Component          | Purpose                                         | Key Files                                                                          |
| ------------------ | ----------------------------------------------- | ---------------------------------------------------------------------------------- |
| **MDX Processing** | Parse blog frontmatter, generate static content | [mdx.ts](src/lib/mdx.ts), `gray-matter`, `sugar-high`                              |
| **Static Data**    | Type-safe project/competition data              | [types/projects.ts](src/types/projects.ts), [lib/projects.ts](src/lib/projects.ts) |
| **Navbar/Layout**  | Global navigation, responsive patterns          | [navbar/index.tsx](src/components/navbar/index.tsx), always visible                |

---

## Common Tasks

**Filter projects by category/status**:

- Use helper: `getProjects({ category: 'Web', status: 'Completed', limit: 5 })` from [lib/projects.ts](src/lib/projects.ts)
- Returns filtered array from static data

**Theme & dark mode**:

- Provider in [layout.tsx](src/app/layout.tsx): `<ThemeProvider>`
- Toggle component: [theme-toggle.tsx](src/components/ui/theme-toggle.tsx)
- CSS vars in [globals.css](src/app/globals.css)

**Link to blog posts**:

- Use slugs: `/blogs/{slug}` where slug = filename without `.mdx`
- Component: [blogs/[slug]/page.tsx](src/app/blogs/[slug]/page.tsx) fetches via `getAllMDXPosts()`

**Add new project or competition**:

- Edit [types/projects.ts](src/types/projects.ts) or [types/competitions.ts](src/types/competitions.ts)
- Data immediately available (no build step required in dev)

---

## Debugging Tips

- **Blog posts not appearing**: Check YAML frontmatter format (gray-matter sensitive to spacing)
- **Styles not loading**: Clear `.next/` folder and rebuild; check Tailwind config imports
- **Turbopack issues**: Run `npm run build` to test with Next.js standard bundler
