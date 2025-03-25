/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { connectToDatabase, formatMongoData } from "@/lib/db";
import Blog from "@/models/Blog";
import BlogCard from "@/components/blog/blog-card";

async function getRecentBlogs() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find().sort({ date: -1 }).limit(3);
    return formatMongoData(blogs);
  } catch (error) {
    console.error("Error fetching recent blogs:", error);
    return [];
  }
}

export default async function RecentPostsSection() {
  const recentPosts = await getRecentBlogs();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Recent Posts</h2>
          <Button variant="outline" asChild>
            <Link href="/blog">View All</Link>
          </Button>
        </div>

        {recentPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No blog posts found. Check back later for new content!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post: any) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
