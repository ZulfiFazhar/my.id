/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Edit, Trash, LogOut, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BlogForm } from "@/components/admin/form/blog-form";
import { SocialForm } from "@/components/admin/form/social-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { signOut, getAuth } from "firebase/auth";

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

interface Social {
  _id: string;
  platform: string;
  username: string;
  url: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [socials, setSocials] = useState<Social[]>([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);
  const [isLoadingSocials, setIsLoadingSocials] = useState(false);
  const [error, setError] = useState("");
  const [openBlogForm, setOpenBlogForm] = useState(false);
  const [openSocialForm, setOpenSocialForm] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
  const [currentSocial, setCurrentSocial] = useState<Social | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    type: "blog" | "social";
    id: string;
  } | null>(null);

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
      fetchBlogs();
      fetchSocials();
    }
    setIsLoading(false);
  }, [router, user]);

  const fetchBlogs = async () => {
    setIsLoadingBlogs(true);
    setError("");
    try {
      const response = await fetch("/api/blogs");
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to load blogs. Please try again.");
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  const fetchSocials = async () => {
    setIsLoadingSocials(true);
    setError("");
    try {
      const response = await fetch("/api/socials");
      if (!response.ok) {
        throw new Error("Failed to fetch socials");
      }
      const data = await response.json();
      setSocials(data);
    } catch (err) {
      console.error("Error fetching socials:", err);
      setError("Failed to load social links. Please try again.");
    } finally {
      setIsLoadingSocials(false);
    }
  };

  const handleDeleteItem = async () => {
    if (!itemToDelete) return;

    try {
      const { type, id } = itemToDelete;
      const endpoint =
        type === "blog" ? `/api/blogs/${id}` : `/api/socials/${id}`;

      const response = await fetch(endpoint, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete ${type}`);
      }

      if (type === "blog") {
        setBlogs(blogs.filter((blog) => blog._id !== id));
      } else {
        setSocials(socials.filter((social) => social._id !== id));
      }

      setDeleteConfirmOpen(false);
      setItemToDelete(null);
    } catch (err) {
      console.error("Error deleting item:", err);
      setError(`Failed to delete item. Please try again.`);
    }
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth);
    router.push("/login");
    window.location.reload();
  };

  const handleAddBlog = () => {
    setCurrentBlog(null);
    setOpenBlogForm(true);
  };

  const handleEditBlog = (blog: Blog) => {
    setCurrentBlog(blog);
    setOpenBlogForm(true);
  };

  const handleAddSocial = () => {
    setCurrentSocial(null);
    setOpenSocialForm(true);
  };

  const handleEditSocial = (social: Social) => {
    setCurrentSocial(social);
    setOpenSocialForm(true);
  };

  const handleSaveBlog = async (blogData: any) => {
    try {
      const method = currentBlog ? "PUT" : "POST";
      const endpoint = currentBlog
        ? `/api/blogs/${currentBlog._id}`
        : "/api/blogs";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        throw new Error("Failed to save blog");
      }

      setOpenBlogForm(false);
      fetchBlogs();
    } catch (err) {
      console.error("Error saving blog:", err);
      setError("Failed to save blog. Please try again.");
    }
  };

  const handleSaveSocial = async (socialData: any) => {
    try {
      const method = currentSocial ? "PUT" : "POST";
      const endpoint = currentSocial
        ? `/api/socials/${currentSocial._id}`
        : "/api/socials";

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(socialData),
      });

      if (!response.ok) {
        throw new Error("Failed to save social link");
      }

      setOpenSocialForm(false);
      fetchSocials();
    } catch (err) {
      console.error("Error saving social link:", err);
      setError("Failed to save social link. Please try again.");
    }
  };

  // Show loading or nothing while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // If not authenticated, don't render the admin content
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </header>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="blog">
          <TabsList className="mb-8">
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
            <TabsTrigger value="social">Social Links</TabsTrigger>
          </TabsList>

          <TabsContent value="blog">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Blog Posts</h2>
              <Button onClick={handleAddBlog}>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </div>

            {isLoadingBlogs ? (
              <div className="text-center py-8">Loading blog posts...</div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No blog posts found. Create your first post!
              </div>
            ) : (
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <Card key={blog._id}>
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
                            onClick={() => {
                              setItemToDelete({ type: "blog", id: blog._id });
                              setDeleteConfirmOpen(true);
                            }}
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
          </TabsContent>

          <TabsContent value="social">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Social Links</h2>
              <Button onClick={handleAddSocial}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Link
              </Button>
            </div>

            {isLoadingSocials ? (
              <div className="text-center py-8">Loading social links...</div>
            ) : socials.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No social links found. Add your first social link!
              </div>
            ) : (
              <div className="space-y-4">
                {socials.map((social) => (
                  <Card key={social._id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${social.bgColor}`}
                          >
                            <span className={`${social.iconColor}`}>
                              {social.icon}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-medium">{social.platform}</h3>
                            <p className="text-sm text-muted-foreground">
                              {social.username}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditSocial(social)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              setItemToDelete({
                                type: "social",
                                id: social._id,
                              });
                              setDeleteConfirmOpen(true);
                            }}
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
          </TabsContent>
        </Tabs>
      </div>

      {/* Blog Form Dialog */}
      <Dialog open={openBlogForm} onOpenChange={setOpenBlogForm}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
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

      {/* Social Form Dialog */}
      <Dialog open={openSocialForm} onOpenChange={setOpenSocialForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentSocial ? "Edit Social Link" : "Add New Social Link"}
            </DialogTitle>
          </DialogHeader>
          <SocialForm
            social={currentSocial}
            onSave={handleSaveSocial}
            onCancel={() => setOpenSocialForm(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to delete this {itemToDelete?.type}? This
              action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteItem}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
