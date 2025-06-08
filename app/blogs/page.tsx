import { getAllMDXPosts } from "@/lib/mdx";
import { BlogsClient } from "@/components/section/blogs/blogs-client";

export default function BlogsPage() {
  const allBlogs = getAllMDXPosts();

  return <BlogsClient blogs={allBlogs} />;
}
