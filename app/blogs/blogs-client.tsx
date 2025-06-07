"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { BlogCard } from "@/components/section/blogs/blogCard";
import { Filter, Search, Grid, List, ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { MDXPost } from "@/lib/mdx";
import { BlogsClientProps } from "@/types/blogs";

export function BlogsClient({ blogs }: BlogsClientProps) {
  const [filteredBlogs, setFilteredBlogs] = useState<MDXPost[]>(blogs);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const categories = [
    "All",
    ...Array.from(new Set(blogs.map((b) => b.category))),
  ];

  const applyFilters = useCallback(() => {
    let filtered = [...blogs];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Category filter
    if (categoryFilter !== "All") {
      filtered = filtered.filter((blog) => blog.category === categoryFilter);
    }

    // Sort
    switch (sortBy) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.publishDate).getTime() -
            new Date(a.publishDate).getTime()
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.publishDate).getTime() -
            new Date(b.publishDate).getTime()
        );
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "readTime":
        filtered.sort((a, b) => a.readTime - b.readTime);
        break;
    }

    setFilteredBlogs(filtered);
  }, [categoryFilter, sortBy, searchQuery, blogs]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">All Blogs</h1>
        <p className="text-muted-foreground text-lg">
          Explore my thoughts, tutorials, and insights on web development, AI,
          and technology.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Collapsible Filters */}
      <Collapsible
        open={isFiltersOpen}
        onOpenChange={setIsFiltersOpen}
        className="mb-4"
      >
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing {filteredBlogs.length} of {blogs.length} blogs
          </p>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-fit justify-between p-4 h-auto hover:bg-transparent transition-colors duration-200"
            >
              <div className="flex items-center gap-2">
                <Filter className="size-4" />
                <span className="text-sm font-medium">Filters</span>
              </div>
              <ChevronDown
                className={`size-4 transition-all duration-300 ease-in-out ${
                  isFiltersOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
          <div className="pb-4 pt-2">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="category-select"
                    className="text-sm font-medium"
                  >
                    Category
                  </Label>
                  <Select
                    value={categoryFilter}
                    onValueChange={setCategoryFilter}
                  >
                    <SelectTrigger
                      id="category-select"
                      className="w-full sm:w-[140px] transition-all duration-200 hover:border-primary"
                    >
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category}
                          className="capitalize"
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="sort-select" className="text-sm font-medium">
                    Sort By
                  </Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger
                      id="sort-select"
                      className="w-full sm:w-[140px] transition-all duration-200 hover:border-primary"
                    >
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="title">Title A-Z</SelectItem>
                      <SelectItem value="readTime">Read Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium">View Mode</Label>
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="flex-1 sm:flex-none transition-all duration-200 hover:scale-105"
                  >
                    <Grid className="size-4" />
                    <span className="ml-2">Grid</span>
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="flex-1 sm:flex-none transition-all duration-200 hover:scale-105"
                  >
                    <List className="size-4" />
                    <span className="ml-2">List</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Blogs Grid/List */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "flex flex-col gap-6"
        }
      >
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      {/* Empty State */}
      {filteredBlogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No blogs found matching your criteria.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setCategoryFilter("All");
              setSortBy("newest");
              setSearchQuery("");
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
