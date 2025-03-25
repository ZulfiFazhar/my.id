import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const recentPosts = [
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
];

export default function RecentPostsSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Recent Posts</h2>
          <Button variant="outline" asChild>
            <Link href="/blog">View All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post, index) => (
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
      </div>
    </section>
  );
}
