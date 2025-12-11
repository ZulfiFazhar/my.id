import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import { TrendingUp, Calendar, Activity, GitBranch } from "lucide-react";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

interface ChartsSectionProps {
  topTechnologies: Array<{ name: string; count: number }>;
  categoryData: Array<{ name: string; value: number }>;
  timelineData: Array<{ year: string; projects: number }>;
  monthlyActivity: Array<{ month: string; projects: number; blogs: number }>;
}

const techChartConfig = {
  count: {
    label: "Projects",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const timelineChartConfig = {
  projects: {
    label: "Projects",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const activityChartConfig = {
  projects: {
    label: "Projects",
    color: "var(--chart-1)",
  },
  blogs: {
    label: "Blogs",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartsSection({
  topTechnologies,
  categoryData,
  timelineData,
  monthlyActivity,
}: ChartsSectionProps) {
  const totalTechUsage = topTechnologies.reduce(
    (acc, tech) => acc + tech.count,
    0
  );
  const topTech = topTechnologies[0];
  const techGrowth = topTech
    ? ((topTech.count / totalTechUsage) * 100).toFixed(1)
    : "0";

  return (
    <>
      {/* Main Charts Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Technology Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5" />
              Technology Usage
            </CardTitle>
            <CardDescription>
              Most used technologies across projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={techChartConfig}>
              <BarChart accessibilityLayer data={topTechnologies}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  fontSize={12}
                  tickFormatter={(value) =>
                    value.length > 8 ? value.slice(0, 8) + "..." : value
                  }
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="count" fill="var(--color-count)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
              {topTech?.name} leads with {techGrowth}% usage{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Showing technology distribution across {totalTechUsage} total
              implementations
            </div>
          </CardFooter>
        </Card>

        {/* Project Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Project Categories
            </CardTitle>
            <CardDescription>Distribution of project types</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${((percent || 0) * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="var(--chart-1)"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
              {categoryData.length} different project categories{" "}
              <Activity className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Showing project type distribution
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Activity Timeline */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Project Timeline
            </CardTitle>
            <CardDescription>Projects started by year</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={timelineChartConfig}>
              <AreaChart accessibilityLayer data={timelineData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="year"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  dataKey="projects"
                  type="natural"
                  fill="var(--color-projects)"
                  fillOpacity={0.4}
                  stroke="var(--color-projects)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
              Consistent project development over time{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Showing project initiation timeline
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Monthly Activity
            </CardTitle>
            <CardDescription>Recent project and blog activity</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={activityChartConfig}>
              <LineChart accessibilityLayer data={monthlyActivity}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Line
                  dataKey="projects"
                  type="natural"
                  stroke="var(--color-projects)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="blogs"
                  type="natural"
                  stroke="var(--color-blogs)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
              Active development and content creation{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Showing last 6 months of activity
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
