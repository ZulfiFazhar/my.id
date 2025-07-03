"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "@/types/projects";
import { Competition } from "@/types/competitions";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
} from "recharts";

interface AnalyticsTabProps {
  projects: Project[];
  competitions: Competition[];
}

export function AnalyticsTab({ projects, competitions }: AnalyticsTabProps) {
  // Generate activity data for the last 6 months
  const activityData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - i));
    const month = date.toLocaleString("default", { month: "short" });

    const projectsInMonth = projects.filter((p) => {
      const projectDate = new Date(p.startDate);
      return (
        projectDate.getMonth() === date.getMonth() &&
        projectDate.getFullYear() === date.getFullYear()
      );
    }).length;

    const competitionsInMonth = competitions.filter((c) => {
      const competitionDate = new Date(c.startDate);
      return (
        competitionDate.getMonth() === date.getMonth() &&
        competitionDate.getFullYear() === date.getFullYear()
      );
    }).length;

    return {
      month,
      projects: projectsInMonth,
      competitions: competitionsInMonth,
    };
  });

  // Technology usage data
  const techStackData = projects
    .flatMap((p) => p.technologies)
    .reduce((acc, tech) => {
      acc[tech] = (acc[tech] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const topTechnologies = Object.entries(techStackData)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([name, count]) => ({ name, count }));

  // Project completion over time
  const completionData = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (11 - i));
    const month = date.toLocaleString("default", { month: "short" });

    const completedInMonth = projects.filter((p) => {
      if (!p.endDate) return false;
      const endDate = new Date(p.endDate);
      return (
        endDate.getMonth() === date.getMonth() &&
        endDate.getFullYear() === date.getFullYear() &&
        p.status === "Completed"
      );
    }).length;

    return {
      month,
      completed: completedInMonth,
    };
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {/* Monthly Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Activity (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="projects"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                  name="Projects"
                />
                <Area
                  type="monotone"
                  dataKey="competitions"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  name="Competitions"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Technologies */}
        <Card>
          <CardHeader>
            <CardTitle>Most Used Technologies</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={topTechnologies} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Project Completion Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Project Completion Timeline (Last 12 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={completionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="completed"
                stroke="#22c55e"
                fill="#22c55e"
                fillOpacity={0.6}
                name="Completed Projects"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Analytics Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Technology Diversity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.keys(techStackData).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Different technologies used
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Average Project Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                projects
                  .filter((p) => p.endDate)
                  .reduce((acc, p) => {
                    const start = new Date(p.startDate);
                    const end = new Date(p.endDate!);
                    const duration =
                      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
                    return acc + duration;
                  }, 0) / projects.filter((p) => p.endDate).length || 0
              )}{" "}
              days
            </div>
            <p className="text-xs text-muted-foreground">
              For completed projects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round(
                (projects.filter((p) => p.status === "Completed").length /
                  projects.length) *
                  100 || 0
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">
              Project completion rate
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
