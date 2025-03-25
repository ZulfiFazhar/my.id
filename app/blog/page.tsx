/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { connectToDatabase, formatMongoData } from "@/lib/db";
import Blog from "@/models/Blog";
import BlogCard from "@/components/blog/blog-card";

async function getBlogs() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find().sort({ date: -1 });
    return formatMongoData(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
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

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium mb-2">No blog posts found</h2>
            <p className="text-muted-foreground">
              Check back later for new content!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {blogs.map((post: any) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {blogs.length > 0 && (
          <div className="flex justify-center">
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
        )}
      </div>
    </div>
  );
}
