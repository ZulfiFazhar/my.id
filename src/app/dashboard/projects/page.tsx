/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  DataManagement,
  DataManagementConfig,
} from "@/components/dashboard/data-management/data-management";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/types/projects";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import {
  CheckCircle,
  Clock,
  ExternalLink,
  Github,
  MoreHorizontal,
  Edit,
  Copy,
  Trash2,
  Eye,
  TrendingUp,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { DateInput } from "@/components/ui/date-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const projectsConfig: DataManagementConfig<Project> = {
  title: "Projects",
  description: "Manage and organize your project portfolio",
  apiEndpoint: "/api/projects",
  searchFields: ["title", "description", "technologies"],
  statusField: "status",
  statusOptions: ["Completed", "In Progress", "Planned"],
  categoryField: "category",
  viewUrl: (project) => `/projects/${project.slug}`,
  externalUrls: [
    {
      label: "GitHub",
      url: (project) => project.githubUrl,
      icon: <Github className="mr-2 h-4 w-4" />,
    },
    {
      label: "Live Demo",
      url: (project) => project.liveUrl,
      icon: <ExternalLink className="mr-2 h-4 w-4" />,
    },
  ],
  renderCard: (project, actions) => (
    <div className="p-4 border rounded-md shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0 pr-2">
          <h3 className="text-lg font-medium truncate">{project.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground truncate">
            {project.description}
          </p>
        </div>
        <div className="flex-shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  window.open(`/projects/${project.slug}`, "_blank")
                }
              >
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={actions.onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={actions.onDuplicate}>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {project.githubUrl && (
                <DropdownMenuItem
                  onClick={() => window.open(project.githubUrl, "_blank")}
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </DropdownMenuItem>
              )}
              {project.liveUrl && (
                <DropdownMenuItem
                  onClick={() => window.open(project.liveUrl, "_blank")}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={actions.onDelete}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {project.category.slice(0, 3).map((cat) => (
          <Badge key={cat} variant="outline" className="text-xs">
            {cat}
          </Badge>
        ))}
        {project.category.length > 3 && (
          <Badge variant="outline" className="text-xs">
            +{project.category.length - 3}
          </Badge>
        )}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {project.technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs"
          >
            {tech}
          </span>
        ))}
        {project.technologies.length > 4 && (
          <span className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
            +{project.technologies.length - 4}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          {getStatusIcon(project.status)}
          <Badge className={getStatusColor(project.status)}>
            {project.status}
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          {new Date(project.startDate).toLocaleDateString()}
        </div>
      </div>
    </div>
  ),
  renderForm: (formData, setFormData, isEditing) => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
      </div>

      <div>
        <Label htmlFor="longDescription">Long Description</Label>
        <Textarea
          id="longDescription"
          value={formData.longDescription}
          onChange={(e) =>
            setFormData({
              ...formData,
              longDescription: e.target.value,
            })
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="technologies">Technologies (comma-separated)</Label>
          <Input
            id="technologies"
            value={formData.technologies}
            onChange={(e) =>
              setFormData({
                ...formData,
                technologies: e.target.value,
              })
            }
            placeholder="React, Next.js, TypeScript"
          />
        </div>
        <div>
          <Label htmlFor="category">Categories (comma-separated)</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            placeholder="Web, Mobile, AI"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value: any) =>
              setFormData({ ...formData, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Planned">Planned</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <DateInput
            id="startDate"
            value={formData.startDate}
            onChange={(value) => setFormData({ ...formData, startDate: value })}
            placeholder="Select start date"
          />
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <DateInput
            id="endDate"
            value={formData.endDate}
            onChange={(value) => setFormData({ ...formData, endDate: value })}
            placeholder="Select end date"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="githubUrl">GitHub URL</Label>
          <Input
            id="githubUrl"
            value={formData.githubUrl}
            onChange={(e) =>
              setFormData({ ...formData, githubUrl: e.target.value })
            }
          />
        </div>
        <div>
          <Label htmlFor="liveUrl">Live URL</Label>
          <Input
            id="liveUrl"
            value={formData.liveUrl}
            onChange={(e) =>
              setFormData({ ...formData, liveUrl: e.target.value })
            }
          />
        </div>
      </div>

      <div>
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          value={formData.imageUrl}
          onChange={(e) =>
            setFormData({ ...formData, imageUrl: e.target.value })
          }
        />
      </div>

      <div>
        <Label htmlFor="features">Features (comma-separated)</Label>
        <Textarea
          id="features"
          value={formData.features}
          onChange={(e) =>
            setFormData({ ...formData, features: e.target.value })
          }
          placeholder="Feature 1, Feature 2, Feature 3"
        />
      </div>
    </>
  ),
  getInitialFormData: () => ({
    title: "",
    slug: "",
    description: "",
    longDescription: "",
    technologies: "",
    category: "",
    status: "Planned" as const,
    startDate: "",
    endDate: "",
    githubUrl: "",
    liveUrl: "",
    imageUrl: "",
    features: "",
  }),
  formatFormDataForApi: (formData, isEditing, originalItem) => ({
    ...formData,
    id: originalItem?.id || `proj-${Date.now()}`,
    technologies: formData.technologies.split(",").map((t: string) => t.trim()),
    category: formData.category.split(",").map((c: string) => c.trim()),
    features: formData.features.split(",").map((f: string) => f.trim()),
  }),
  formatItemForForm: (project) => ({
    title: project.title,
    slug: project.slug,
    description: project.description,
    longDescription: project.longDescription || "",
    technologies: project.technologies.join(", "),
    category: project.category.join(", "),
    status: project.status,
    startDate: project.startDate,
    endDate: project.endDate || "",
    githubUrl: project.githubUrl || "",
    liveUrl: project.liveUrl || "",
    imageUrl: project.imageUrl || "",
    features: project.features.join(", "),
  }),
  getStats: (projects) => [
    {
      label: "Total Projects",
      value: projects.length,
      icon: <TrendingUp className="h-8 w-8 text-muted-foreground" />,
    },
    {
      label: "Completed",
      value: projects.filter((p) => p.status === "Completed").length,
      color: "text-green-600",
      icon: <CheckCircle className="h-8 w-8 text-green-500" />,
    },
    {
      label: "In Progress",
      value: projects.filter((p) => p.status === "In Progress").length,
      color: "text-blue-600",
      icon: <Clock className="h-8 w-8 text-blue-500" />,
    },
    {
      label: "Planned",
      value: projects.filter((p) => p.status === "Planned").length,
      color: "text-orange-600",
      icon: <AlertCircle className="h-8 w-8 text-orange-500" />,
    },
  ],
};

export default function ProjectsManagementPage() {
  return (
    <div className="space-y-6">
      <DataManagement config={projectsConfig} />

      {/* Footer Info */}
      <div className="text-xs text-muted-foreground text-center border-t pt-4">
        Projects data synced with database • Last page load:{" "}
        {new Date().toLocaleString()}
      </div>
    </div>
  );
}

function getStatusIcon(status: string): import("react").ReactNode {
  switch (status) {
    case "Completed":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "In Progress":
      return <Clock className="h-4 w-4 text-blue-500" />;
    case "Planned":
      return <AlertCircle className="h-4 w-4 text-orange-500" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />;
  }
}

function getStatusColor(status: string): string {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800";
    case "In Progress":
      return "bg-blue-100 text-blue-800";
    case "Planned":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}
