import clientPromise from "@/lib/mongodb";
import { Project } from "@/types/projects";

export interface ProjectQuery {
  category?: string;
  status?: string;
  limit?: number;
}

export async function getProjects(
  options: ProjectQuery = {}
): Promise<Project[]> {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");

    const query: Record<string, unknown> = {};
    if (options.category && options.category !== "All") {
      query.category = { $in: [options.category] };
    }
    if (options.status && options.status !== "All") {
      query.status = options.status;
    }

    let projectsQuery = db.collection("projects").find(query);

    if (options.limit && options.limit > 0) {
      projectsQuery = projectsQuery.limit(options.limit);
    }

    const projects = await projectsQuery.sort({ startDate: -1 }).toArray();

    return projects.map(({ _id, ...project }) => ({
      ...project,
      id: _id.toString(),
    })) as unknown as Project[];
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");

    const project = await db.collection("projects").findOne({ slug });

    if (!project) return null;

    const { _id, ...projectData } = project;
    return { ...projectData, id: _id.toString() } as unknown as Project;
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    throw new Error("Failed to fetch project");
  }
}

export async function createProject(projectData: Project): Promise<string> {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");

    const newProject = {
      ...projectData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("projects").insertOne(newProject);
    return result.insertedId.toString();
  } catch (error) {
    console.error("Error creating project:", error);
    throw new Error("Failed to create project");
  }
}
