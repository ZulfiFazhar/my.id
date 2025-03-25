import { DockNavigation } from "@/components/dock-navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Blog</h1>
          <p className="text-muted-foreground">Thoughts, stories, and ideas.</p>
        </header>

        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search articles..." className="pl-9" />
          </div>
        </div>

        <div className="mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              "All",
              "Development",
              "Design",
              "Career",
              "Technology",
              "Productivity",
            ].map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="mb-2">
                  <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {post.date}
                  </span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/blog/${post.slug}`}>Read More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center pb-25">
          <div className="flex gap-2">
            <Button variant="outline" size="icon" disabled>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Button>
            <Button variant="outline" className="px-4">
              1
            </Button>
            <Button variant="outline" className="px-4">
              2
            </Button>
            <Button variant="outline" className="px-4">
              3
            </Button>
            <Button variant="outline" size="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      <DockNavigation />
    </div>
  );
}

const blogPosts = [
  {
    title: "Getting Started with Next.js 14",
    excerpt:
      "Learn how to build modern web applications with Next.js 14 and its new features.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Development",
    date: "March 15, 2024",
    slug: "getting-started-with-nextjs-14",
  },
  {
    title: "The Power of Tailwind CSS",
    excerpt:
      "Discover how Tailwind CSS can transform your workflow and make styling a breeze.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Design",
    date: "March 10, 2024",
    slug: "power-of-tailwind-css",
  },
  {
    title: "Building a Personal Brand Online",
    excerpt:
      "Tips and strategies for building your personal brand and growing your audience.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Career",
    date: "March 5, 2024",
    slug: "building-personal-brand-online",
  },
  {
    title: "Introduction to TypeScript",
    excerpt:
      "Why TypeScript is becoming essential for modern JavaScript development.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Development",
    date: "February 28, 2024",
    slug: "introduction-to-typescript",
  },
  {
    title: "Designing for Accessibility",
    excerpt:
      "Best practices for creating accessible web experiences for all users.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Design",
    date: "February 20, 2024",
    slug: "designing-for-accessibility",
  },
  {
    title: "The Future of Web Development",
    excerpt:
      "Exploring emerging trends and technologies shaping the future of the web.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Technology",
    date: "February 15, 2024",
    slug: "future-of-web-development",
  },
];
