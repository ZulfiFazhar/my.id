import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Code2, Trophy } from "lucide-react";
import { Competition } from "@/types/competitions";

interface BreakdownSectionProps {
  completedProjects: number;
  inProgressProjects: number;
  plannedProjects: number;
  topTechnologies: Array<{ name: string; count: number }>;
  totalProjects: number;
  competitions: Competition[];
}

export function BreakdownSection({
  completedProjects,
  inProgressProjects,
  plannedProjects,
  topTechnologies,
  totalProjects,
  competitions,
}: BreakdownSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Project Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Project Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-sm">Completed</span>
            </div>
            <Badge variant="secondary">{completedProjects}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-sm">In Progress</span>
            </div>
            <Badge variant="secondary">{inProgressProjects}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full" />
              <span className="text-sm">Planned</span>
            </div>
            <Badge variant="secondary">{plannedProjects}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Top Technologies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            Most Used Tech
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {topTechnologies.slice(0, 5).map((tech) => (
            <div key={tech.name} className="flex items-center justify-between">
              <span className="text-sm">{tech.name}</span>
              <div className="flex items-center space-x-2">
                <Progress
                  value={(tech.count / totalProjects) * 100}
                  className="w-16 h-2"
                />
                <span className="text-xs text-muted-foreground">
                  {tech.count}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Competition Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Competition Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {competitions.slice(0, 3).map((comp) => (
            <div key={comp.id} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium truncate">
                  {comp.title}
                </span>
                <Badge
                  variant={
                    comp.result.toLowerCase().includes("1st")
                      ? "default"
                      : comp.result.toLowerCase().includes("2nd")
                      ? "secondary"
                      : "outline"
                  }
                  className="text-xs"
                >
                  {comp.result}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{comp.organizer}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
