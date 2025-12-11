import { NextRequest, NextResponse } from "next/server";
import { getProjects, createProject } from "@/lib/projects";
import { Project } from "@/types/projects";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const status = searchParams.get("status") || undefined;
    const limit = parseInt(searchParams.get("limit") || "0");

    const projects = await getProjects({ category, status, limit });

    return NextResponse.json({
      success: true,
      data: projects,
      count: projects.length,
    });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" + e },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const projectData: Project = await request.json();
    const id = await createProject(projectData);

    return NextResponse.json({
      success: true,
      message: "Project created successfully",
      data: { id },
    });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: "Failed to create project" + e },
      { status: 500 }
    );
  }
}
