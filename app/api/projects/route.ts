/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Project } from "@/types/projects";

interface ProjectQuery {
  category?: { $in: string[] };
  status?: string;
}

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "0");

    // Build query
    const query: ProjectQuery = {};
    if (category && category !== "All") {
      query.category = { $in: [category] };
    }
    if (status && status !== "All") {
      query.status = status;
    }

    // Fetch projects
    let projectsQuery = db.collection("projects").find(query);

    if (limit > 0) {
      projectsQuery = projectsQuery.limit(limit);
    }

    const projects = await projectsQuery.sort({ startDate: -1 }).toArray();

    // Remove MongoDB _id and convert to Project type
    const formattedProjects: Project[] = projects.map(
      ({ _id, createdAt, updatedAt, ...project }) => project as Project
    );

    return NextResponse.json({
      success: true,
      data: formattedProjects,
      count: formattedProjects.length,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const projectData: Project = await request.json();
    const client = await clientPromise;
    const db = client.db("portfolio");

    const newProject = {
      ...projectData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("projects").insertOne(newProject);

    return NextResponse.json({
      success: true,
      message: "Project created successfully",
      data: { id: result.insertedId },
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create project" },
      { status: 500 }
    );
  }
}
