"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Project } from "@/types/projects";
import { Competition } from "@/types/competitions";
// import { projects } from "@/types/projects";
// import { competitions } from "@/types/competitions";
import { MetricsCards } from "@/components/dashboard/analytics/metrics-cards";
import { ChartsSection } from "@/components/dashboard/analytics/charts-section";
import { BreakdownSection } from "@/components/dashboard/analytics/breakdown-section";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

// Mock blog data for analytics (replace with actual data source)
const mockBlogs = [
  { readTime: 5 },
  { readTime: 8 },
  { readTime: 3 },
  { readTime: 12 },
];

export default function AnalyticsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [projectsRes, competitionsRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/competitions"),
      ]);

      const projectsData = await projectsRes.json();
      const competitionsData = await competitionsRes.json();

      if (projectsData.success) setProjects(projectsData.data);
      if (competitionsData.success) setCompetitions(competitionsData.data);

      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      // Fallback to static data
      const { projects: staticProjects } = await import("@/types/projects");
      const { competitions: staticCompetitions } = await import(
        "@/types/competitions"
      );
      setProjects(staticProjects);
      setCompetitions(staticCompetitions);
    } finally {
      setLoading(false);
    }
  };

  // Use mock data instead of getAllMDXPosts()
  const blogs = mockBlogs;

  // Calculate analytics data
  const analytics = useMemo(() => {
    // Project analytics
    const totalProjects = projects.length;
    const completedProjects = projects.filter(
      (p) => p.status === "Completed"
    ).length;
    const inProgressProjects = projects.filter(
      (p) => p.status === "In Progress"
    ).length;
    const plannedProjects = projects.filter(
      (p) => p.status === "Planned"
    ).length;

    // Technology breakdown
    const techCount: Record<string, number> = {};
    projects.forEach((project) => {
      project.technologies.forEach((tech) => {
        techCount[tech] = (techCount[tech] || 0) + 1;
      });
    });

    const topTechnologies = Object.entries(techCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([name, count]) => ({ name, count }));

    // Category breakdown
    const categoryCount: Record<string, number> = {};
    projects.forEach((project) => {
      project.category.forEach((cat) => {
        categoryCount[cat] = (categoryCount[cat] || 0) + 1;
      });
    });

    const categoryData = Object.entries(categoryCount).map(([name, value]) => ({
      name,
      value,
    }));

    // Project timeline data (projects per year)
    const yearCount: Record<string, number> = {};
    projects.forEach((project) => {
      const year = new Date(project.startDate).getFullYear().toString();
      yearCount[year] = (yearCount[year] || 0) + 1;
    });

    const timelineData = Object.entries(yearCount)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([year, count]) => ({ year, projects: count }));

    // Competition analytics
    const totalCompetitions = competitions.length;
    const completedCompetitions = competitions.filter(
      (c) => c.status === "Completed"
    ).length;
    const winRate =
      (competitions.filter(
        (c) =>
          c.result.toLowerCase().includes("1st") ||
          c.result.toLowerCase().includes("winner")
      ).length /
        completedCompetitions) *
      100;

    // Blog analytics
    const totalBlogs = blogs.length;
    const avgReadTime =
      blogs.reduce((acc, blog) => acc + blog.readTime, 0) / totalBlogs || 0;

    // Monthly activity (simulated data based on project dates)
    const monthlyActivity = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const month = date.toLocaleString("default", { month: "short" });

      const projectsInMonth = projects.filter((p) => {
        const projectDate = new Date(p.startDate);
        return (
          projectDate.getMonth() === date.getMonth() &&
          projectDate.getFullYear() === date.getFullYear()
        );
      }).length;

      monthlyActivity.push({
        month,
        projects: projectsInMonth,
        blogs: Math.floor(Math.random() * 3) + 1, // Simulated
      });
    }

    return {
      totalProjects,
      completedProjects,
      inProgressProjects,
      plannedProjects,
      topTechnologies,
      categoryData,
      timelineData,
      totalCompetitions,
      completedCompetitions,
      winRate,
      totalBlogs,
      avgReadTime,
      monthlyActivity,
      techCount,
    };
  }, [projects, competitions, blogs]);

  const completionRate =
    (analytics.completedProjects / analytics.totalProjects) * 100 || 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-muted-foreground">
          Loading analytics...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Explore your project and competition analytics, including completion
            rates, technology usage, and more.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchData}
          disabled={loading}
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
          />
          Refresh Data
        </Button>
      </div>

      {/* Key Metrics */}
      <MetricsCards
        totalProjects={analytics.totalProjects}
        completedProjects={analytics.completedProjects}
        completionRate={completionRate}
        winRate={analytics.winRate}
        completedCompetitions={analytics.completedCompetitions}
        totalBlogs={analytics.totalBlogs}
        avgReadTime={analytics.avgReadTime}
      />

      {/* Charts */}
      <ChartsSection
        topTechnologies={analytics.topTechnologies}
        categoryData={analytics.categoryData}
        timelineData={analytics.timelineData}
        monthlyActivity={analytics.monthlyActivity}
      />

      {/* Detailed Breakdown */}
      <BreakdownSection
        completedProjects={analytics.completedProjects}
        inProgressProjects={analytics.inProgressProjects}
        plannedProjects={analytics.plannedProjects}
        topTechnologies={analytics.topTechnologies}
        totalProjects={analytics.totalProjects}
        competitions={competitions}
      />

      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground border-t pt-4">
        <div>
          Analytics last updated: {lastUpdated.toLocaleString()}
          {loading && <span className="ml-2 animate-pulse">Refreshing...</span>}
        </div>
        <div>
          Data includes {analytics.totalProjects} projects and{" "}
          {analytics.totalCompetitions} competitions
        </div>
      </div>
    </div>
  );
}
