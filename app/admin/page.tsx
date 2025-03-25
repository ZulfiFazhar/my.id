"use client";

import { DockNavigation } from "@/components/dock-navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PlusCircle,
  Edit,
  Trash,
  LogOut,
  Github,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const auth = localStorage.getItem("isAuthenticated");
    if (auth !== "1") {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    router.push("/login");
    window.location.reload();
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
    <div className="min-h-screen bg-muted/30 pb-25">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </header>

        <Tabs defaultValue="blog">
          <TabsList className="mb-8">
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
            <TabsTrigger value="social">Social Links</TabsTrigger>
          </TabsList>

          <TabsContent value="blog">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Blog Posts</h2>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Post
              </Button>
            </div>

            <div className="space-y-4">
              {blogPosts.map((post, index) => (
                <Card key={index}>
                  <CardContent className="py-2 px-4">
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 items-start sm:items-center justify-between">
                      <div>
                        <h3 className="font-medium">{post.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {post.date} • {post.category}
                        </p>
                      </div>
                      <div className="flex flex-row sm:flex-col gap-2 pb-2 sm:py-2">
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="social">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Manage Social Links</h2>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Link
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialLinks.map((link, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${link.bgColor}`}
                        >
                          <link.icon className={`h-5 w-5 ${link.iconColor}`} />
                        </div>
                        <div>
                          <h3 className="font-medium">{link.platform}</h3>
                          <p className="text-sm text-muted-foreground">
                            {link.username}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <DockNavigation />
    </div>
  );
}

const blogPosts = [
  {
    title: "Getting Started with Next.js 14",
    date: "March 15, 2024",
    category: "Development",
    slug: "getting-started-with-nextjs-14",
  },
  {
    title: "The Power of Tailwind CSS",
    date: "March 10, 2024",
    category: "Design",
    slug: "power-of-tailwind-css",
  },
  {
    title: "Building a Personal Brand Online",
    date: "March 5, 2024",
    category: "Career",
    slug: "building-personal-brand-online",
  },
  {
    title: "Introduction to TypeScript",
    date: "February 28, 2024",
    category: "Development",
    slug: "introduction-to-typescript",
  },
  {
    title: "Designing for Accessibility",
    date: "February 20, 2024",
    category: "Design",
    slug: "designing-for-accessibility",
  },
];

const socialLinks = [
  {
    platform: "GitHub",
    username: "@username",
    url: "https://github.com/username",
    icon: Github,
    bgColor: "bg-gray-900",
    iconColor: "text-white",
  },
  {
    platform: "Twitter",
    username: "@username",
    url: "https://twitter.com/username",
    icon: Twitter,
    bgColor: "bg-blue-500",
    iconColor: "text-white",
  },
  {
    platform: "LinkedIn",
    username: "Full Name",
    url: "https://linkedin.com/in/username",
    icon: Linkedin,
    bgColor: "bg-blue-700",
    iconColor: "text-white",
  },
  {
    platform: "Instagram",
    username: "@username",
    url: "https://instagram.com/username",
    icon: Instagram,
    bgColor: "bg-pink-600",
    iconColor: "text-white",
  },
];
