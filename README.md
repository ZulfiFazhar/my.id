# Personal Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features a comprehensive blog system with MDX support, project showcase, and social media integration.

## ✨ Features

### 🏠 Homepage

- Hero section with animated introduction
- Featured projects showcase
- Recent blog posts preview
- Skills and technologies display
- Contact information

### 📝 Blog System

- **MDX Support**: Write blogs in Markdown with React components
- **Dynamic Content**: File-based blog posts with frontmatter
- **Table of Contents**: Auto-generated TOC with active section highlighting
- **Responsive Design**: Mobile-friendly with floating TOC sheet
- **Rich Content**: Code syntax highlighting, images, and interactive components
- **Filtering & Search**: Category-based filtering and full-text search
- **Related Posts**: Smart recommendations based on categories

### 💼 Projects Portfolio

- **Project Showcase**: Detailed project cards with technologies used
- **Advanced Filtering**: Filter by category, status, and sort options
- **Grid/List Views**: Toggle between different viewing modes
- **Project Details**: Comprehensive project pages with features and links
- **Live Demos**: Direct links to live projects and source code

### 🏆 Competitions

- Competition showcase with results and achievements
- Event details with dates, organizers, and locations
- Status tracking (Upcoming, Ongoing, Completed)

### 🌐 Social Media

- Social media platform links with custom styling
- Platform-specific branding and colors
- Contact information and collaboration invites

### 🎨 Design System

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: Theme switching with system preference detection
- **Component Library**: Reusable components with shadcn/ui
- **Smooth Animations**: Framer Motion for enhanced user experience
- **Modern Typography**: Optimized fonts with Next.js font optimization

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Lucide React** - Beautiful icon library

### Content Management

- **MDX** - Markdown with JSX support
- **gray-matter** - Frontmatter parsing
- **next-mdx-remote** - Remote MDX content rendering

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing
- **TypeScript** - Static type checking

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/ZulfiFazhar/my.id.git
cd my.id
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                         # Next.js App Router
│   ├── blogs/                   # Blog pages
│   │   ├── [slug]/              # Dynamic blog post pages
│   │   ├── posts/               # MDX blog posts
│   │   └── page.tsx             # Blog listing page
│   ├── projects/                # Project pages
│   ├── socials/                 # Social media page
│   ├── competitions/            # Competitions page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/                  # React components
│   ├── ui/                      # shadcn/ui components
│   ├── section/                 # Page sections
│   │   ├── blogs/               # Blog-related components
│   │   ├── projects/            # Project-related components
│   │   └── hero/                # Hero section components
├── lib/                         # Utility functions
│   ├── mdx.ts                   # MDX processing utilities
│   └── utils.ts                 # General utilities
├── types/                       # TypeScript type definitions
│   ├── blogs.ts                 # Blog-related types
│   ├── projects.ts              # Project-related types
│   ├── socials.ts               # Social media types
│   └── competitions.ts          # Competition types
├── public/                      # Static assets
│   └── images/                  # Image assets
└── README.md                    # Project documentation
```

## ✍️ Content Management

### Adding Blog Posts

1. **Create a new MDX file** in `app/blogs/posts/`:

```bash
app/blogs/posts/your-post-slug.mdx
```

2. **Add frontmatter** at the top:

```yaml
---
title: "Your Blog Post Title"
description: "Brief description of your post"
publishDate: "2024-01-20"
category: "Frontend"
readTime: 5
tags: ["React", "Next.js", "TypeScript"]
author: "Your Name"
imageUrl: "/images/blogs/your-post-image.jpg"
---
```

3. **Write your content** using Markdown and JSX:

````markdown
# Your Blog Content

This is a paragraph with **bold** and _italic_ text.

```javascript
const example = "code block";
```
````

<CustomComponent prop="value" />
```

### Adding Projects

Edit `types/projects.ts` to add new projects:

```typescript
{
  id: "proj-005",
  title: "Your Project",
  slug: "your-project-slug",
  description: "Project description",
  technologies: ["React", "Node.js"],
  category: "Web",
  status: "Completed",
  startDate: "2024-01-01",
  // ... other fields
}
```

### Updating Social Links

Modify `types/socials.ts` to update social media links:

```typescript
{
  platform: "GitHub",
  username: "@yourusername",
  url: "https://github.com/yourusername",
  color: "#333333",
  icon: Github,
}
```

## 🎨 Customization

### Theming

- Modify `app/globals.css` for global styles
- Update `tailwind.config.js` for custom colors and themes
- Use CSS custom properties for theme variables

### Components

- All UI components are in `components/ui/`
- Custom components are organized by feature in `components/section/`
- Modify existing components or create new ones as needed

### Layout

- Update `app/layout.tsx` for global layout changes
- Modify navigation in layout components
- Add new pages in the `app/` directory

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Key responsive features:

- Mobile-first CSS approach
- Touch-friendly navigation
- Optimized images for different screen sizes
- Adaptive layouts for content sections

## 🔧 Development Scripts

```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint
bun run type-check   # Run TypeScript checks
```

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms

- **Netlify**: Connect GitHub repo and deploy
- **Railway**: Docker deployment support
- **Self-hosted**: Use `npm run build` and serve the `out` folder

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: zulfi.fazhar12@gmail.com
- **LinkedIn**: [LinkedIn](https://www.linkedin.com/in/zulfi-fadilah-azhar/)
- **GitHub**: [GitHub](https://github.com/ZulfiFazhar)
- **Portfolio**: [Website](https://www.zulfifazhar.my.id/)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide](https://lucide.dev/) for the icon library
- [Vercel](https://vercel.com/) for hosting and deployment

---

⭐ **Star this repository if you found it helpful!**
