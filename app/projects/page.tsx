"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { projects, Project } from "@/types/projects";
import { ProjectCard } from "@/components/section/projects/projectCard";
import { Filter, Grid, List, ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { FadeIn } from "@/components/ui/fade-in";
import { StaggerContainer } from "@/components/ui/stagger-container";

export default function ProjectsPage() {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];
  const statuses = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.status))),
  ];

  const applyFilters = useCallback(() => {
    let filtered = [...projects];

    // Category filter
    if (categoryFilter !== "All") {
      filtered = filtered.filter(
        (project) => project.category === categoryFilter
      );
    }

    // Status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter((project) => project.status === statusFilter);
    }

    // Sort
    switch (sortBy) {
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
        break;
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        );
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredProjects(filtered);
  }, [categoryFilter, statusFilter, sortBy]);

  // Apply filters whenever filter values change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <div>
      {/* Header */}
      <FadeIn direction="down" className="mb-8">
        <h1 className="text-4xl font-bold mb-4">All Projects</h1>
        <p className="text-muted-foreground text-lg">
          Explore my complete portfolio of projects, ranging from web
          applications to AI solutions.
        </p>
      </FadeIn>

      {/* Collapsible Filters */}
      <FadeIn className="mb-4">
        <Collapsible
          open={isFiltersOpen}
          onOpenChange={setIsFiltersOpen}
          className="mb-4"
        >
          <div className="flex justify-between items-center">
            {/* Results Count */}
            <p className="text-sm text-muted-foreground">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-fit justify-between p-4 h-auto hover:bg-transparent transition-colors duration-200"
              >
                <div className="flex items-center gap-2">
                  <Filter className="size-4" />
                  <span className="text-sm font-medium">Filters</span>
                </div>
                <ChevronDown
                  className={`size-4 transition-all duration-300 ease-in-out ${
                    isFiltersOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up overflow-hidden">
            <div className="pb-4 pt-2">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="flex flex-col gap-2 transform transition-all duration-200">
                    <Label
                      htmlFor="category-select"
                      className="text-sm font-medium"
                    >
                      Category
                    </Label>
                    <Select
                      value={categoryFilter}
                      onValueChange={setCategoryFilter}
                    >
                      <SelectTrigger
                        id="category-select"
                        className="w-full sm:w-[140px] transition-all duration-200 hover:border-primary"
                      >
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category}
                            value={category}
                            className="capitalize transition-colors duration-150 hover:bg-accent"
                          >
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2 transform transition-all duration-200">
                    <Label
                      htmlFor="status-select"
                      className="text-sm font-medium"
                    >
                      Status
                    </Label>
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger
                        id="status-select"
                        className="w-full sm:w-[140px] transition-all duration-200 hover:border-primary"
                      >
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map((status) => (
                          <SelectItem
                            key={status}
                            value={status}
                            className="capitalize transition-colors duration-150 hover:bg-accent"
                          >
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2 transform transition-all duration-200">
                    <Label
                      htmlFor="sort-select"
                      className="text-sm font-medium"
                    >
                      Sort By
                    </Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger
                        id="sort-select"
                        className="w-full sm:w-[140px] transition-all duration-200 hover:border-primary"
                      >
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="newest"
                          className="transition-colors duration-150 hover:bg-accent"
                        >
                          Newest First
                        </SelectItem>
                        <SelectItem
                          value="oldest"
                          className="transition-colors duration-150 hover:bg-accent"
                        >
                          Oldest First
                        </SelectItem>
                        <SelectItem
                          value="name"
                          className="transition-colors duration-150 hover:bg-accent"
                        >
                          Name A-Z
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col gap-2 transform transition-all duration-200">
                  <Label className="text-sm font-medium">View Mode</Label>
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="flex-1 sm:flex-none transition-all duration-200 hover:scale-105"
                    >
                      <Grid className="size-4" />
                      <span className="ml-2">Grid</span>
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="flex-1 sm:flex-none transition-all duration-200 hover:scale-105"
                    >
                      <List className="size-4" />
                      <span className="ml-2">List</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </FadeIn>

      {/* Projects Grid/List */}
      <StaggerContainer
        staggerDelay={50}
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "flex flex-col gap-6"
        }
      >
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </StaggerContainer>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <FadeIn className="text-center py-12">
          <p className="text-muted-foreground">
            No projects found matching your criteria.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setCategoryFilter("All");
              setStatusFilter("All");
              setSortBy("newest");
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </FadeIn>
      )}
    </div>
  );
}
