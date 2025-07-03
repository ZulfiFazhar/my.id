import { Suspense } from "react";
import { Project } from "@/types/projects";
import ProjectsClient from "@/components/section/projects/projects-client";

async function getProjects(): Promise<Project[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/projects`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      throw new Error("Failed to fetch projects");
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    // Fallback to static data
    const { projects } = await import("@/types/projects");
    return projects;
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <Suspense fallback={<div>Loading projects...</div>}>
      <ProjectsClient initialProjects={projects} />
    </Suspense>
  );
}

// Enable ISR
export const revalidate = 3600; // Revalidate every hour
