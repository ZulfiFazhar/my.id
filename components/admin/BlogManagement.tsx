/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash } from "lucide-react";
import { BlogForm } from "@/components/admin/form/blog-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  date: string;
  author: string;
  tags: string[];
}

interface BlogManagementProps {
  blogs: Blog[];
  isLoading: boolean;
  onSaveBlog: (blogData: any) => Promise<void>;
  onDeleteItem: (type: "blog" | "social", id: string) => void;
}

export function BlogManagement({
  blogs,
  isLoading,
  onSaveBlog,
  onDeleteItem,
}: BlogManagementProps) {
  const [openBlogForm, setOpenBlogForm] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);

  const handleAddBlog = () => {
    setCurrentBlog(null);
    setOpenBlogForm(true);
  };

  const handleEditBlog = (blog: Blog) => {
    setCurrentBlog(blog);
    setOpenBlogForm(true);
  };

  const handleSaveBlog = async (blogData: any) => {
    await onSaveBlog(blogData);
    setOpenBlogForm(false);
  };

  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Blog Posts</h2>
        <Button onClick={handleAddBlog}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading blog posts...</div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No blog posts found. Create your first post!
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <Card key={blog._id} className="p-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{blog.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(blog.date).toLocaleDateString()} •{" "}
                      {blog.category}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditBlog(blog)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDeleteItem("blog", blog._id)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Blog Form Dialog */}
      <Dialog open={openBlogForm} onOpenChange={setOpenBlogForm}>
        <DialogContent
          className="w-[90vw] h-[90vh] overflow-y-auto"
          style={{ maxWidth: "none" }}
        >
          <DialogHeader>
            <DialogTitle>
              {currentBlog ? "Edit Blog Post" : "Create New Blog Post"}
            </DialogTitle>
          </DialogHeader>
          <BlogForm
            blog={currentBlog}
            onSave={handleSaveBlog}
            onCancel={() => setOpenBlogForm(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
