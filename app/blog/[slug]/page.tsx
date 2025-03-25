/* eslint-disable @typescript-eslint/no-unused-vars */
import { DockNavigation } from "@/components/dock-navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = {
    title: "Getting Started with Next.js 14",
    content: `
      <p>Next.js 14 introduces several exciting features that make building web applications even more enjoyable and efficient. In this post, we'll explore the key highlights and how you can leverage them in your projects.</p>
      
      <h2>Server Components</h2>
      <p>React Server Components allow you to render components on the server, reducing the JavaScript sent to the client and improving performance. This is particularly useful for content-heavy pages that don't require much interactivity.</p>
      
      <p>Here's a simple example of a server component:</p>
      
      <pre><code>// This component renders on the server
export default function ServerComponent() {
  return (
    <div>
      <h1>Hello from the server!</h1>
      <p>This component was rendered on the server.</p>
    </div>
  )
}</code></pre>

      <h2>Improved Data Fetching</h2>
      <p>Next.js 14 simplifies data fetching with built-in functions that work seamlessly with Server Components. You can fetch data directly in your components without additional libraries.</p>
      
      <pre><code>// Fetch data in a server component
async function getData() {
  const res = await fetch('https://api.example.com/data')
  
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  
  return res.json()
}

export default async function Page() {
  const data = await getData()
  
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  )
}</code></pre>

      <h2>Conclusion</h2>
      <p>Next.js 14 represents a significant step forward for React development, offering improved performance, simplified data fetching, and a more intuitive development experience. Whether you're building a simple blog or a complex application, Next.js 14 provides the tools you need to create fast, scalable, and maintainable web applications.</p>
    `,
    image: "/placeholder.svg?height=400&width=800",
    category: "Development",
    date: "March 15, 2024",
    author: "John Doe",
    tags: ["Next.js", "React", "Web Development"],
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <article className="max-w-3xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {post.date}
              </div>
              <div className="flex items-center">
                <User className="mr-1 h-4 w-4" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Tag className="mr-1 h-4 w-4" />
                {post.category}
              </div>
            </div>
            <div className="aspect-[2/1] relative rounded-lg overflow-hidden">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          </header>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-8 pt-6 border-t">
            <h3 className="font-medium mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-muted rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t">
            <h3 className="font-medium mb-4">Share this post</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Twitter
              </Button>
              <Button variant="outline" size="sm">
                Facebook
              </Button>
              <Button variant="outline" size="sm">
                LinkedIn
              </Button>
            </div>
          </div>
        </article>
      </div>

      <DockNavigation />
    </div>
  );
}
