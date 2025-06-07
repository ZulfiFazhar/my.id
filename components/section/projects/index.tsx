import { Button } from "@/components/ui/button";
import { projects } from "@/types/projects";
import { ProjectCard } from "./projectCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Projects() {
  // Sort projects by start date (most recent first) and take only 3
  const recentProjects = projects
    .sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )
    .slice(0, 3);

  return (
    <section id="projects" className="container flex flex-col py-4 gap-3">
      <div className="max-w-full flex items-center justify-between">
        <h2 className="text-2xl font-bold">Recent Projects</h2>
        <Button variant="link" size="lg" asChild>
          <Link href="/projects" className="flex items-center gap-2">
            View All Projects
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
