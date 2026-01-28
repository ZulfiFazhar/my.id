import { Project, projects as allProjects } from "@/types/projects";

export interface ProjectQuery {
  category?: string;
  status?: string;
  limit?: number;
}

/**
 * Get projects with optional filtering
 * @param options - Query options for filtering and limiting results
 * @returns Filtered array of projects
 */
export function getProjects(options: ProjectQuery = {}): Project[] {
  let filteredProjects = [...allProjects];

  // Filter by category
  if (options.category && options.category !== "All") {
    filteredProjects = filteredProjects.filter((project) =>
      project.category.includes(options.category!),
    );
  }

  // Filter by status
  if (options.status && options.status !== "All") {
    filteredProjects = filteredProjects.filter(
      (project) => project.status === options.status,
    );
  }

  // Sort by start date (newest first)
  filteredProjects.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
  );

  // Apply limit
  if (options.limit && options.limit > 0) {
    filteredProjects = filteredProjects.slice(0, options.limit);
  }

  return filteredProjects;
}

/**
 * Get a single project by slug
 * @param slug - The project slug
 * @returns Project or null if not found
 */
export function getProjectBySlug(slug: string): Project | null {
  return allProjects.find((project) => project.slug === slug) || null;
}

/**
 * Get a single project by ID
 * @param id - The project ID
 * @returns Project or null if not found
 */
export function getProjectById(id: string): Project | null {
  return allProjects.find((project) => project.id === id) || null;
}
