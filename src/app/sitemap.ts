import { MetadataRoute } from "next";
import { projects } from "@/types/projects";
import { getAllMDXPosts } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zulfifazhar.my.id";

  // Static pages
  const staticPages = [
    "",
    "/about",
    "/projects",
    "/blogs",
    "/socials",
    "/competitions",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic project pages
  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.endDate || project.startDate),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic blog pages
  const blogPages = getAllMDXPosts().map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: new Date(post.publishDate),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages, ...blogPages];
}
