# Zulfi Fadilah Azhar — Personal Portfolio

<img src="./public/hero.png" alt="Zulfi Fadilah Azhar - portfolio hero">

A modern personal portfolio built with Next.js 15, TypeScript, MDX-based blogs, and Tailwind CSS. This repository demonstrates a production-friendly App Router structure, custom MDX rendering, a projects showcase, and a design system with theme support.

Table of contents

- Overview
- Features
- Quickstart
- Project structure
- Working with Blogs (MDX)
- MDX components & heading IDs
- Working with Projects
- Theming & Styling
- Scripts
- Deployment
- Troubleshooting & tips
- Contributing
- Contact & acknowledgments
- License

---

## Overview

This project is a portfolio site for Zulfi Fadilah Azhar. It uses the Next.js 15 App Router and Server Components where possible. Content-driven pages (blogs, projects) are file-based and easy to author.

Key implementation points:

- Blogs are MDX files in `src/app/blogs/posts/` and are processed with `gray-matter` (frontmatter) and rendered using `next-mdx-remote`.
- Blog utilities live in `src/lib/mdx.ts` (read-time calc, image mapping, getAllMDXPosts/getMDXPost).
- Project utilities live in `src/lib/projects.ts` (getProjects filters and lookups).
- Custom MDX components are provided in `src/components/mdx-components.tsx`.
- Global layout & theme provider are configured in `src/app/layout.tsx`.
- Tailwind + custom CSS variables/styles are in `src/app/globals.css`.

---

## Features

- Next.js 15 App Router + Server Components
- File-based MDX blog system with frontmatter and automatic TOC extraction
- Custom MDX components (styled headings, code, blockquote, links)
- Projects listing with category/status filters and sorting
- Theme switching (light/dark) via a ThemeProvider
- Reusable UI components (shadcn-style components under `src/components/ui/`)

---

## Quickstart

Requirements:

- Node.js 18+ (recommended)
- npm, yarn, pnpm, or bun

1. Clone:

```bash
git clone https://github.com/ZulfiFazhar/my.id.git
cd my.id
```

2. Install dependencies:

```bash
npm install
# or
pnpm install
# or
yarn install
# or (if you use bun)
bun install
```

3. Development server:

```bash
npm run dev
# The project uses: next dev --turbopack
# Visit http://localhost:3000
```

4. Build for production:

```bash
npm run build
npm run start
```

5. Lint:

```bash
npm run lint
```

---

## Project structure (important files)

- app/
  - layout.tsx — Root layout, ThemeProvider, global site metadata
  - globals.css — Tailwind + CSS variables, dark mode tokens
  - page.tsx — Homepage assembling sections (Hero, About, Projects, Blogs)
  - blogs/
    - page.tsx — Blog list page (server side)
    - [slug]/page.tsx — Dynamic blog detail (server side)
    - posts/\*.mdx — MDX blog posts (content)
  - projects/ — Projects listing & pages
- components/
  - mdx-components.tsx — MDX to React component mapping
  - ui/ — UI primitives (Button, Badge, Tooltip, etc.)
  - section/ — Page sections (hero, blogs, projects, etc.)
- lib/
  - mdx.ts — MDX helpers (getAllMDXPosts, getMDXPost, read time, image mapping)
  - projects.ts — Project query helpers (getProjects, getProjectBySlug, getProjectById)
- types/ — TypeScript type definitions for blogs/projects/etc.

---

## Working with Blogs (MDX)

Blog posts live in:
`src/app/blogs/posts/your-post-slug.mdx`

Required frontmatter fields (used by `src/lib/mdx.ts` and templates):

- title (string)
- description (string)
- publishDate (ISO date string)
- category (string)
- tags (array of strings)
- author (string)
- imageUrl (optional string) — if omitted a fallback is chosen based on slug/category
  Example frontmatter and MDX file:

````md
---
title: "Your Blog Post Title"
description: "A short summary."
publishDate: "2024-01-20"
category: "Frontend"
tags: ["React", "Next.js"]
author: "Your Name"
imageUrl: "/placeholder.svg"
---

# Intro

Write Markdown and JSX here.

```javascript
// code block example
console.log("Hello world");
```
````

<SomeCustomComponent prop="value" />
```

Important behaviors implemented in src/lib/mdx.ts:

- getAllMDXPosts() — reads all `.mdx` files, parses frontmatter, calculates readTime and sorts by publishDate (newest first).
- getMDXPost(slug) — reads a single post by slug and returns parsed data. Returns null and logs an error if the file can't be read.
- calculateReadTime(content) — counts words and estimates read time at 180 wpm (minimum 1 minute).
- getBlogImage(slug, category) — maps specific slugs to images and falls back to category-based images or a generic default.

Notes:

- Use relative image paths from the `public/` directory (e.g. `/images/blogs/xxx.jpg`).
- The blog detail page extracts headings from the raw MDX content (lines starting with `##` or `###`) to build a Table of Contents for desktop and a TOC sheet for mobile.

---

## MDX components & heading IDs

Custom MDX components registered in `src/components/mdx-components.tsx` include:

- h1, h2, h3 — styled headings that automatically generate id attributes (converted to kebab-case) for anchors and TOC linking
- p, ul, ol, li — styled text elements
- code, pre — inline code and block code wrappers
- blockquote, hr, a — special styling for quotes, separators, and links

Heading id generation algorithm:

- Lowercases heading text, replaces non-alphanumeric with "-", and trims leading/trailing dashes.
  Example:

```text
"Getting Started with Next.js" -> "getting-started-with-next-js"
```

You can use any of the UI components in MDX by importing them where needed or by extending mdxComponents to inject additional components.

---

## Working with Projects

Project data and helpers live in:

- `src/lib/projects.ts` — exports getProjects(options), getProjectBySlug(slug), getProjectById(id)
- `src/types/projects.ts` — outlines the project type and contains the `projects` array used by the app (edit here to add or update projects)

getProjects(options) supports:

- category?: string (filters by category, skip when "All")
- status?: string (filters by project status, skip when "All")
- limit?: number (returns the first N results)
- Projects are sorted by startDate descending (newest first).

Example project item (add into `types/projects.ts` as part of the exported `projects` array):

```ts
{
  id: "proj-005",
  title: "Your Project",
  slug: "your-project-slug",
  description: "Short description of the project",
  technologies: ["React", "Node.js"],
  category: "Web",
  status: "Completed",
  startDate: "2024-01-01",
  // optionally include links, images, or additional fields as your types define
}
```

---

## Theming & Styling

- Global styles and theme tokens are in `src/app/globals.css`.
- The site uses CSS custom properties and provides a `.dark` token block to switch values for dark mode.
- ThemeProvider is used in `src/app/layout.tsx` (storageKey: `portfolio-theme`).
- Tailwind is configured and used across components; if you update Tailwind config, make sure to recompile.

---

## Scripts

Defined in package.json:

- dev: next dev --turbopack
- build: next build
- start: next start
- lint: next lint

Example:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

Note: The project uses the Turbopack dev server for faster HMR by default (`--turbopack`).

---

## Deployment

Recommended: Vercel (native Next.js support).

- Connect the repository in Vercel, automatic deployments occur on push to main.
- Ensure `NODE` version is compatible (Node 18+ recommended).

Other platforms: Netlify, Cloudflare Pages, or any host supporting Next.js builds.

---

## Troubleshooting & tips

- MDX parsing errors: Check frontmatter syntax and ensure `---` boundaries are present.
- Missing images: Use paths under `public/` (e.g. `/images/blogs/your.jpg`). `getBlogImage` maps common slugs; update or add files to `public/images/blogs/`.
- TypeScript path alias: Code uses `@/*` -> `src/*` (see tsconfig.json).
- If `getMDXPost` returns null, check console for the read-file error — the file may be missing or have a permission issue.
- There is no LICENSE file in the repository root. Add a LICENSE if you want to explicitly set usage terms.

---

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit changes and open a pull request
4. Keep commits atomic and include description about code and content changes

For content changes:

- Add MDX files to `src/app/blogs/posts/`
- Update `src/types/projects.ts` for project entries
- Update or extend `src/components/mdx-components.tsx` if you need new MDX components

---

## Contact

- Email: zulfi.fadilazhar@gmail.com
- LinkedIn: https://www.linkedin.com/in/zulfi-fadilah-azhar/
- GitHub: https://github.com/ZulfiFazhar
- Portfolio: https://www.zulfifazhar.dev/

---

## Acknowledgments

- Next.js, React, Tailwind CSS, shadcn/ui, Lucide icons, and the open-source community for inspiration and components.

---

## License

There is no LICENSE file included in the repository. If you would like to add one, choose a license (for example MIT) and add a `LICENSE` file at the repository root.

---

If you want, I can:

- Add a small CONTRIBUTING.md with a checklist
- Provide a sample MDX post template file under `src/app/blogs/posts/`
- Create a script to validate MDX frontmatter fields before building

Just tell me which you'd like next.
