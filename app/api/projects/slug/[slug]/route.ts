/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Project } from "@/types/projects";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const client = await clientPromise;
    const db = client.db("portfolio");

    const project = await db.collection("projects").findOne({ slug });

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    const { _id, createdAt, updatedAt, ...projectData } = project;

    return NextResponse.json({
      success: true,
      data: projectData as Project,
    });
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}
