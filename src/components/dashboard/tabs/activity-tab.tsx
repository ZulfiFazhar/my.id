/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/projects";
import { Competition } from "@/types/competitions";
import {
  Clock,
  Code,
  Trophy,
  Calendar,
  MapPin,
  Award,
  Target,
} from "lucide-react";

interface ActivityTabProps {
  projects: Project[];
  competitions: Competition[];
}

export function ActivityTab({ projects, competitions }: ActivityTabProps) {
  // Combine and sort all activities by date
  const allActivities = [
    ...projects.map((p) => ({
      id: p.id,
      type: "project" as const,
      title: p.title,
      description: p.description,
      date: p.endDate || p.startDate,
      status: p.status,
      category: p.category,
      technologies: p.technologies,
    })),
    ...competitions.map((c) => ({
      id: c.id,
      type: "competition" as const,
      title: c.title,
      description: c.description,
      date: c.endDate,
      status: c.status,
      result: c.result,
      organizer: c.organizer,
      location: c.location,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const recentActivities = allActivities.slice(0, 10);
  const upcomingActivities = allActivities.filter(
    (activity) =>
      activity.status === "Planned" ||
      activity.status === "Upcoming" ||
      activity.status === "In Progress" ||
      activity.status === "Ongoing"
  );

  const getActivityIcon = (type: string, status?: string) => {
    if (type === "project") {
      return <Code className="h-4 w-4 text-blue-500" />;
    } else {
      return <Trophy className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Progress":
      case "Ongoing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Planned":
      case "Upcoming":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Activity Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Activities
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allActivities.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
            <Code className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {projects.filter((p) => p.status === "In Progress").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ongoing Competitions
            </CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {competitions.filter((c) => c.status === "Ongoing").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                allActivities.filter((activity) => {
                  const activityDate = new Date(activity.date);
                  const now = new Date();
                  return (
                    activityDate.getMonth() === now.getMonth() &&
                    activityDate.getFullYear() === now.getFullYear()
                  );
                }).length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {recentActivities.map((activity) => (
                <div
                  key={`${activity.type}-${activity.id}`}
                  className="flex items-start space-x-4 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type, activity.status)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{activity.title}</h4>
                      <div className="text-xs text-muted-foreground">
                        {new Date(activity.date).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {activity.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.status}
                      </Badge>
                      {activity.type === "competition" &&
                        "result" in activity && (
                          <Badge variant="outline" className="text-xs">
                            {activity.result}
                          </Badge>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming & Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {upcomingActivities.slice(0, 8).map((activity) => (
                <div
                  key={`upcoming-${activity.type}-${activity.id}`}
                  className="flex items-start space-x-4 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type, activity.status)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium">{activity.title}</h4>
                      <Badge className={getStatusColor(activity.status)}>
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {activity.description}
                    </p>
                    {activity.type === "competition" &&
                      "location" in activity && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {activity.location}
                        </div>
                      )}
                    <div className="text-xs text-muted-foreground">
                      {new Date(activity.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
              {upcomingActivities.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  No upcoming activities
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
