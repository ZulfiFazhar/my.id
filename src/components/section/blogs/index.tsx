import { Button } from "@/components/ui/button";
import { getAllMDXPosts } from "@/lib/mdx";
import { BlogCard } from "./blogCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Blogs() {
  // Get the 3 most recent blogs from MDX posts (server-side)
  const recentBlogs = getAllMDXPosts()
    .sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    )
    .slice(0, 3);

  return (
    <section id="blogs" className="container flex flex-col py-4 gap-3">
      <div className="max-w-full flex items-center justify-between">
        <h2 className="text-2xl font-bold">Recent Blogs</h2>
        <Button variant="link" size="lg" asChild>
          <Link href="/blogs" className="flex items-center gap-2">
            View All Blogs
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {recentBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}
