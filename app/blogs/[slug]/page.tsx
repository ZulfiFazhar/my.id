import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { getMDXPost, getAllMDXPosts } from "@/lib/mdx";
import { Calendar, Clock, User, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import Image from "next/image";
import { BlogDetailPageProps } from "@/types/blogs";
import { BlogCard } from "@/components/section/blogs/blogCard";
import Link from "next/link";
import { TableOfContentsSheet } from "@/components/section/blogs/table-of-contents-sheet";
import { ActiveTableOfContents } from "@/components/section/blogs/active-table-of-contents";

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  const blog = getMDXPost(slug);

  if (!blog) {
    notFound();
  }

  // Extract headings for table of contents
  const headings = blog.content
    .split("\n")
    .filter((line) => line.startsWith("## ") || line.startsWith("### "))
    .map((line, index) => {
      const level = line.startsWith("## ") ? 2 : 3;
      const text = line.replace(/^#{2,3}\s/, "");
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      return { id, text, level, index };
    });

  return (
    <div>
      {/* Mobile Table of Contents Sheet - Client Component */}
      <TableOfContentsSheet headings={headings} />

      {/* Header Section */}
      <div className="mb-8">
        {/* Featured Image */}
        {blog.imageUrl && (
          <div className="relative overflow-hidden rounded-lg mb-6 bg-muted">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              width={1200}
              height={400}
              className="w-full h-64 lg:h-80 object-cover"
              priority
            />
          </div>
        )}
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <p className="text-xl text-muted-foreground mb-6">{blog.description}</p>
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary">{blog.category}</Badge>
          <span className="text-sm text-muted-foreground">•</span>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="size-4" />
            <span>
              {new Date(blog.publishDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">•</span>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="size-4" />
            <span>{blog.readTime} min read</span>
          </div>
        </div>

        {/* Author and Share */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <User className="size-4" />
              <span className="text-sm font-medium">
                {blog.author || "Your Name"}
              </span>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Share2 className="size-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Blog Content */}
          <div className="prose prose-lg max-w-none">
            <MDXRemote source={blog.content} components={mdxComponents} />
          </div>
        </div>

        {/* Desktop Sidebar - Hidden on mobile */}
        <div className="hidden lg:block sticky top-8 h-fit max-h-[calc(100vh-4rem)] overflow-y-auto space-y-8 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          {/* Table of Contents */}
          {headings.length > 0 && (
            <div className="border-l-2 border-muted pl-4">
              <h3 className="font-semibold mb-4 text-foreground">
                Table of Contents
              </h3>
              <ActiveTableOfContents headings={headings} />
            </div>
          )}

          {/* Tags */}
          <div className="border-l-2 border-muted pl-4">
            <h3 className="font-semibold mb-4 text-foreground">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Tags Section - Only visible on mobile */}
        <div className="lg:hidden border-t pt-6">
          <h3 className="font-semibold mb-3 text-foreground">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Related Posts Section - Moved to bottom */}
      <div className="mt-16 pt-8 border-t">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Related Posts</h2>
          <Link href="/blogs">
            <Button variant="link">View All Blogs</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getAllMDXPosts()
            .filter((b) => b.slug !== blog.slug && b.category === blog.category)
            .slice(0, 3)
            .map((relatedBlog) => (
              <BlogCard key={relatedBlog.slug} blog={relatedBlog} />
            ))}
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const mdxPosts = getAllMDXPosts();

  return mdxPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = getMDXPost(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: `${blog.title} - Blog`,
    description: blog.description,
  };
}
