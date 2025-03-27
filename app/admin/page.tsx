/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { signOut, getAuth } from "firebase/auth";
import { toast } from "sonner";

// Import modular components
import { BlogManagement } from "@/components/admin/BlogManagement";
import { SocialManagement } from "@/components/admin/SocialManagement";
import { HomeManagement } from "@/components/admin/HomeManagement";
import { DeleteConfirmation } from "@/components/admin/delete-confirmation";
import { AdminHeader } from "@/components/admin/header";

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
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    type: "blog" | "social";
    id: string;
  } | null>(null);

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
      fetchBlogs();
      fetchSocials();
    } else {
      router.push("/login");
    }
    if (error) {
      toast.error(error);
    }
    setIsLoading(false);
  }, [router, user, error]);

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

  const handleSaveBlog = async (blogData: any) => {
    try {
      const method = blogData._id ? "PUT" : "POST";
      const endpoint = blogData._id
        ? `/api/blogs/${blogData._id}`
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

      fetchBlogs();
    } catch (err) {
      console.error("Error saving blog:", err);
      setError("Failed to save blog. Please try again.");
    }
  };

  const handleSaveSocial = async (socialData: any) => {
    try {
      const method = socialData._id ? "PUT" : "POST";
      const endpoint = socialData._id
        ? `/api/socials/${socialData._id}`
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

      fetchSocials();
    } catch (err) {
      console.error("Error saving social link:", err);
      setError("Failed to save social link. Please try again.");
    }
  };

  const handleDeleteConfirmation = (type: "blog" | "social", id: string) => {
    setItemToDelete({ type, id });
    setDeleteConfirmOpen(true);
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
        <AdminHeader onLogout={handleLogout} />

        <Tabs defaultValue="home">
          <TabsList className="mb-8">
            <TabsTrigger value="home" className="cursor-pointer">
              Home Section
            </TabsTrigger>
            <TabsTrigger value="blog" className="cursor-pointer">
              Blog Posts
            </TabsTrigger>
            <TabsTrigger value="social" className="cursor-pointer">
              Social Links
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            <HomeManagement />
          </TabsContent>

          <TabsContent value="blog">
            <BlogManagement
              blogs={blogs}
              isLoading={isLoadingBlogs}
              onSaveBlog={handleSaveBlog}
              onDeleteItem={handleDeleteConfirmation}
            />
          </TabsContent>

          <TabsContent value="social">
            <SocialManagement
              socials={socials}
              isLoading={isLoadingSocials}
              onSaveSocial={handleSaveSocial}
              onDeleteItem={handleDeleteConfirmation}
            />
          </TabsContent>
        </Tabs>
      </div>

      <DeleteConfirmation
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteItem}
        itemType={itemToDelete?.type || null}
      />
    </div>
  );
}
