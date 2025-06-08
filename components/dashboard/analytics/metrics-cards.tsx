import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Code2, Target, Trophy, BookOpen } from "lucide-react";

interface MetricsCardsProps {
  totalProjects: number;
  completedProjects: number;
  completionRate: number;
  winRate: number;
  completedCompetitions: number;
  totalBlogs: number;
  avgReadTime: number;
}

export function MetricsCards({
  totalProjects,
  completedProjects,
  completionRate,
  winRate,
  completedCompetitions,
  totalBlogs,
  avgReadTime,
}: MetricsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          <Code2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProjects}</div>
          <p className="text-xs text-muted-foreground">
            {completedProjects} completed
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Math.round(completionRate)}%
          </div>
          <Progress value={completionRate} className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Competition Win Rate
          </CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{Math.round(winRate)}%</div>
          <p className="text-xs text-muted-foreground">
            {completedCompetitions} competitions
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalBlogs}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round(avgReadTime)} min avg read
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
