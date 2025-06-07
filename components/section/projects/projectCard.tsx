import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProjectCardProps } from "@/types/projects";

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`}>
      <Card className="hover:shadow-lg transition-all duration-300 group cursor-pointer pt-0">
        <CardHeader className="space-y-3 p-0">
          {project.imageUrl && (
            <div className="relative overflow-hidden rounded-md">
              <Image
                src="./placeholder.svg"
                alt={project.title}
                width={400}
                height={200}
                loading="lazy"
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          <div className="flex items-center justify-between px-6">
            <Badge variant="outline" className="capitalize">
              {project.category}
            </Badge>
            <Badge
              variant={
                project.status === "Completed"
                  ? "default"
                  : project.status === "In Progress"
                  ? "secondary"
                  : "outline"
              }
              className="capitalize"
            >
              {project.status}
            </Badge>
          </div>
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground px-6">
            <Calendar className="size-4" />
            <span>
              {new Date(project.startDate).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
              {project.endDate && (
                <>
                  {" "}
                  -{" "}
                  {new Date(project.endDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </>
              )}
            </span>
          </div>
          <CardTitle className="line-clamp-2 px-6">{project.title}</CardTitle>
          <CardDescription className="line-clamp-3 px-6">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardFooter className="space-y-4">
          {/* Technologies */}
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
