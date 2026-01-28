import { Suspense } from "react";
import { projects } from "@/types/projects";
import ProjectsClient from "@/components/section/projects/projects-client";

export default async function ProjectsPage() {
  return (
    <Suspense fallback={<div>Loading projects...</div>}>
      <ProjectsClient initialProjects={projects} />
    </Suspense>
  );
}
