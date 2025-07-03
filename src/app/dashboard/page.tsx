/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Project } from "@/types/projects";
import { Competition } from "@/types/competitions";
import {
  BarChart,
  Calendar,
  Code,
  Trophy,
  BookOpen,
  TrendingUp,
  Clock,
  Target,
  Filter,
  RefreshCw,
  Plus,
  Eye,
  CheckCircle,
  AlertCircle,
  Users,
  Activity,
  GitBranch,
  Star,
  Zap,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart as RechartsBarChart,
  Bar,
} from "recharts";
import Link from "next/link";
import { OverviewTab } from "@/components/dashboard/tabs/overview-tab";
import { ProjectsTab } from "@/components/dashboard/tabs/projects-tab";
import { AnalyticsTab } from "@/components/dashboard/tabs/analytics-tab";
import { ActivityTab } from "@/components/dashboard/tabs/activity-tab";
import { toast } from "sonner";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300"];

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("7d");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
    // Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [projectsRes, competitionsRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/competitions"),
      ]);

      const projectsData = await projectsRes.json();
      const competitionsData = await competitionsRes.json();

      if (projectsData.success) {
        setProjects(projectsData.data);
      } else {
        // Fallback to static data
        const { projects: staticProjects } = await import("@/types/projects");
        setProjects(staticProjects);
        console.warn("Using static projects data");
      }

      if (competitionsData.success) {
        setCompetitions(competitionsData.data);
      } else {
        // Fallback to static data
        const { competitions: staticCompetitions } = await import(
          "@/types/competitions"
        );
        setCompetitions(staticCompetitions);
        console.warn("Using static competitions data");
      }

      setLastUpdated(new Date());

      if (!projectsData.success || !competitionsData.success) {
        setError(
          "Some data loaded from cache. Try refreshing for latest updates."
        );
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load data. Showing cached information.");

      // Load static data as fallback
      try {
        const [
          { projects: staticProjects },
          { competitions: staticCompetitions },
        ] = await Promise.all([
          import("@/types/projects"),
          import("@/types/competitions"),
        ]);
        setProjects(staticProjects);
        setCompetitions(staticCompetitions);
      } catch (importError) {
        console.error("Failed to load static data:", importError);
        toast.error("Failed to load dashboard data");
      }
    } finally {
      setLoading(false);
    }
  };

  // Calculate enhanced statistics
  const stats = {
    totalProjects: projects.length,
    completedProjects: projects.filter((p) => p.status === "Completed").length,
    inProgressProjects: projects.filter((p) => p.status === "In Progress")
      .length,
    plannedProjects: projects.filter((p) => p.status === "Planned").length,
    totalCompetitions: competitions.length,
    completedCompetitions: competitions.filter((c) => c.status === "Completed")
      .length,
    ongoingCompetitions: competitions.filter((c) => c.status === "Ongoing")
      .length,
    upcomingCompetitions: competitions.filter((c) => c.status === "Upcoming")
      .length,
    winRate: competitions.filter(
      (c) =>
        c.result.toLowerCase().includes("1st") ||
        c.result.toLowerCase().includes("winner") ||
        c.result.toLowerCase().includes("1st place")
    ).length,
    recentProjects: projects.filter((p) => {
      const projectDate = new Date(p.startDate);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return projectDate >= thirtyDaysAgo;
    }).length,
  };

  const projectsProgress =
    stats.totalProjects > 0
      ? (stats.completedProjects / stats.totalProjects) * 100
      : 0;

  const competitionsWinRate =
    stats.completedCompetitions > 0
      ? (stats.winRate / stats.completedCompetitions) * 100
      : 0;

  // Enhanced chart data
  const projectStatusData = [
    { name: "Completed", value: stats.completedProjects, color: "#22c55e" },
    { name: "In Progress", value: stats.inProgressProjects, color: "#3b82f6" },
    { name: "Planned", value: stats.plannedProjects, color: "#f59e0b" },
  ].filter((item) => item.value > 0);

  // Generate realistic activity data based on actual project dates
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

  const techStackData = projects
    .flatMap((p) => p.technologies)
    .reduce((acc, tech) => {
      acc[tech] = (acc[tech] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const topTechnologies = Object.entries(techStackData)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  // Enhanced recent activities with better sorting and categorization
  const recentActivities = [
    ...projects.slice(0, 3).map((p) => ({
      type: "project" as const,
      title: p.title,
      description: `${p.status} • ${p.technologies.slice(0, 2).join(", ")}`,
      date: p.endDate || p.startDate,
      status: p.status,
      category: p.category[0] || "Other",
    })),
    ...competitions.slice(0, 3).map((c) => ({
      type: "competition" as const,
      title: c.title,
      description: `${c.organizer} • ${c.result}`,
      date: c.endDate,
      status: c.status,
      category: "Competition",
    })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  if (loading && projects.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-muted-foreground">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your projects, competitions, and activities
          </p>
          {error && (
            <div className="flex items-center gap-2 text-sm text-amber-600 mt-2">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchData}
            disabled={loading}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 flex-wrap">
        <Button asChild>
          <Link href="/dashboard/projects">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard/competitions">
            <Trophy className="mr-2 h-4 w-4" />
            Add Competition
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard/analytics">
            <BarChart className="mr-2 h-4 w-4" />
            View Analytics
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/projects">
            <Eye className="mr-2 h-4 w-4" />
            View Portfolio
          </Link>
        </Button>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
            </CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              {stats.completedProjects} completed, {stats.inProgressProjects} in
              progress
            </p>
            <Progress value={projectsProgress} className="mt-2" />
            <div className="flex items-center gap-1 mt-2 text-xs">
              <Zap className="h-3 w-3 text-green-500" />
              <span className="text-green-600">
                {stats.recentProjects} recent
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Competitions</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCompetitions}</div>
            <p className="text-xs text-muted-foreground">
              {stats.winRate} wins • {Math.round(competitionsWinRate)}% win rate
            </p>
            <div className="flex gap-1 mt-2">
              {[...Array(Math.min(stats.winRate, 5))].map((_, i) => (
                <Star
                  key={i}
                  className="h-3 w-3 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {stats.ongoingCompetitions} ongoing • {stats.upcomingCompetitions}{" "}
              upcoming
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(projectsProgress)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Project completion rate
            </p>
            <Progress value={projectsProgress} className="mt-2" />
            <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              Consistent growth
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Technologies</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.keys(techStackData).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Different technologies used
            </p>
            <div className="flex gap-1 mt-2 flex-wrap">
              {topTechnologies.slice(0, 3).map((tech, i) => (
                <Badge key={tech.name} variant="outline" className="text-xs">
                  {tech.name}
                </Badge>
              ))}
            </div>
            {topTechnologies.length > 3 && (
              <div className="text-xs text-muted-foreground mt-1">
                +{topTechnologies.length - 3} more
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab
            projects={projects}
            competitions={competitions}
            projectStatusData={projectStatusData}
          />
        </TabsContent>

        <TabsContent value="projects">
          <ProjectsTab projects={projects} />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsTab projects={projects} competitions={competitions} />
        </TabsContent>

        <TabsContent value="activity">
          <ActivityTab projects={projects} competitions={competitions} />
        </TabsContent>
      </Tabs>

      {/* Enhanced Footer Info */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground border-t pt-4 space-y-2 sm:space-y-0">
        <div className="flex items-center gap-4">
          <div>
            Last updated: {lastUpdated.toLocaleString()}
            {loading && (
              <span className="ml-2 animate-pulse">Refreshing...</span>
            )}
          </div>
          {!error && (
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle className="h-3 w-3" />
              All systems operational
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span>
            {projects.length} projects • {competitions.length} competitions
          </span>
          <span>Auto-refresh: 5min</span>
        </div>
      </div>
    </div>
  );
}
