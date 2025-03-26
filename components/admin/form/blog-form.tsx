/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MarkdownEditor = dynamic(
  () => import("@/components/admin/form/markdown-editor"),
  {
    ssr: false,
  }
);

interface BlogFormProps {
  blog?: any;
  onSave: (blogData: any) => void;
  onCancel: () => void;
}

export function BlogForm({ blog, onSave, onCancel }: BlogFormProps) {
  const [formData, setFormData] = useState({
    _id: undefined,
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Development",
    image: "/placeholder.svg?height=200&width=400",
    tags: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (blog) {
      setFormData({
        _id: blog._id,
        title: blog.title || "",
        slug: blog.slug || "",
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        category: blog.category || "Development",
        image: blog.image || "/placeholder.svg?height=200&width=400",
        tags: blog.tags ? blog.tags.join(", ") : "",
      });
    }
  }, [blog]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Update handler untuk content menggunakan MarkdownEditor
  const handleContentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Process tags dari string yang dipisahkan koma ke array
      const tags = formData.tags
        .split(",")
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag !== "");

      // Generate slug jika kosong
      let slug = formData.slug;
      if (!slug) {
        slug = formData.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-");
      }

      const blogData = {
        ...formData,
        slug,
        tags,
      };

      await onSave(blogData);
    } catch (error) {
      console.error("Error saving blog:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">Slug (URL)</Label>
        <Input
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          placeholder="leave-empty-to-generate-from-title"
        />
        <p className="text-xs text-muted-foreground">
          Leave empty to generate from title
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          required
          rows={2}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        {/* Gantikan Textarea dengan MarkdownEditor */}
        <MarkdownEditor
          value={formData.content}
          onChange={handleContentChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={handleSelectChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Development">Development</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Career">Career</SelectItem>
              <SelectItem value="Productivity">Productivity</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags</Label>
        <Input
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="tag1, tag2, tag3"
        />
        <p className="text-xs text-muted-foreground">
          Separate tags with commas
        </p>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : blog ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
}
