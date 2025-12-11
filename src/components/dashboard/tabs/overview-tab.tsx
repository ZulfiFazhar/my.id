"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Project } from "@/types/projects";
import { Competition } from "@/types/competitions";
import {
  BarChart,
  Target,
  Eye,
  Activity,
  Code,
  Trophy,
  Calendar,
  Plus,
} from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import Link from "next/link";

interface OverviewTabProps {
  projects: Project[];
  competitions: Competition[];
  projectStatusData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export function OverviewTab({
  projects,
  competitions,
  projectStatusData,
}: OverviewTabProps) {
  const recentActivities = [
    ...projects.slice(0, 3).map((p) => ({
      type: "project",
      title: p.title,
      description: `${p.status} • ${p.category.join(", ")}`,
      date: p.endDate || p.startDate,
      status: p.status,
      technologies: p.technologies.slice(0, 2),
    })),
    ...competitions.slice(0, 3).map((c) => ({
      type: "competition",
      title: c.title,
      description: `${c.organizer} • ${c.result}`,
      date: c.endDate,
      status: c.status,
      location: c.location,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Show empty state if no data
  if (projects.length === 0 && competitions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          No projects or competitions found. Start by creating your first
          project!
        </div>
        <Button asChild>
          <Link href="/dashboard/projects">
            <Plus className="mr-2 h-4 w-4" />
            Create First Project
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Projects */}
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Recent Projects ({projects.length})
            </CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/projects">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.slice(0, 3).map((project) => (
                <div
                  key={project.id}
                  className="flex items-center space-x-4 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {project.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {project.description.substring(0, 80)}...
                    </p>
                    <div className="flex gap-1 flex-wrap">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(project.startDate).toLocaleDateString()}
                      {project.endDate &&
                        ` - ${new Date(project.endDate).toLocaleDateString()}`}
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Badge
                      variant={
                        project.status === "Completed"
                          ? "default"
                          : project.status === "In Progress"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {project.status}
                    </Badge>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/projects/${project.slug}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No projects yet. Create your first project to get started!
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Project Status Chart */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Project Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={projectStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  dataKey="value"
                  label={({ name, value }) =>
                    (value || 0) > 0 ? `${name}: ${value}` : ""
                  }
                >
                  {projectStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.slice(0, 5).map((activity, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-2 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex-shrink-0">
                  {activity.type === "project" ? (
                    <Code className="h-4 w-4 text-blue-500" />
                  ) : (
                    <Trophy className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(activity.date).toLocaleString()}
                </div>
                <Badge variant="outline">{activity.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
