import { Suspense } from "react";
import { Project } from "@/types/projects";
import ProjectsClient from "@/components/section/projects/projects-client";
import { getProjects as getProjectsFromLib } from "@/lib/projects";

async function getProjects(): Promise<Project[]> {
  try {
    const projects = await getProjectsFromLib({});
    return projects;
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
