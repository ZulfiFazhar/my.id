import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Github,
  ExternalLink,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { ProjectDetailPageProps, Project, projects } from "@/types/projects";
import { FadeIn } from "@/components/ui/fade-in";

function getProject(slug: string) {
  return projects.find((p) => p.slug === slug) || null;
}

function getAllProjects() {
  return projects;
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="size-5 text-green-500" />;
      case "In Progress":
        return <Clock className="size-5 text-blue-500" />;
      case "Planned":
        return <AlertCircle className="size-5 text-orange-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "text-green-600 bg-green-50 border-green-200";
      case "In Progress":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "Planned":
        return "text-orange-600 bg-orange-50 border-orange-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div>
      {/* Header Section */}
      <FadeIn direction="down" className="mb-8">
        <div className="flex flex-col gap-4">
          {/* Title and Status */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
              <p className="text-xl text-muted-foreground">
                {project.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(project.status)}
              <Badge
                variant="outline"
                className={`px-3 py-1 ${getStatusColor(project.status)}`}
              >
                {project.status}
              </Badge>
            </div>
          </div>

          {/* Category and Date */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              <span>
                {new Date(project.startDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                {project.endDate && (
                  <>
                    {" "}
                    -{" "}
                    {new Date(project.endDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Project Image */}
          <FadeIn direction="up">
            <Card className="p-0">
              <CardContent className="p-0">
                <Image
                  src={project.imageUrl || "/placeholder.svg"}
                  alt={project.title}
                  width={800}
                  height={400}
                  className="w-full h-48 lg:h-80 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          </FadeIn>

          {/* Description */}
          <FadeIn direction="up">
            <Card className="gap-3">
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {project.longDescription || project.description}
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Features */}
          <FadeIn direction="up">
            <Card className="gap-3">
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="size-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Technologies */}
          <FadeIn direction="right">
            <Card className="gap-3">
              <CardHeader>
                <CardTitle>Technologies Used</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Project Info */}
          <FadeIn direction="right">
            <Card className="gap-4">
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-1">Status</h4>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(project.status)}
                    <span className="text-sm">{project.status}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium text-sm mb-1">Category</h4>
                  <p className="text-sm text-muted-foreground">
                    {project.category.join(", ")}
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium text-sm mb-1">Duration</h4>
                  <p className="text-sm text-muted-foreground">
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
                  </p>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Links */}
          <FadeIn direction="right">
            <Card className="gap-3">
              <CardHeader>
                <CardTitle>Project Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {project.githubUrl && (
                  <Button variant="outline" className="w-full" asChild>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="size-4" />
                      Source Code
                    </a>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button className="w-full" asChild>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="size-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const projects = await getAllProjects();

  return projects.map((project: Project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - Project Details`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.imageUrl ? [project.imageUrl] : [],
    },
  };
}

// Enable ISR
export const revalidate = 3600; // Revalidate every hour
