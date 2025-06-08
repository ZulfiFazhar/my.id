/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Project } from "@/types/projects";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db("portfolio");

    const project = await db.collection("projects").findOne({ id });

    if (!project) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    const { _id, createdAt, updatedAt, ...projectData } = project;

    return NextResponse.json({
      success: true,
      data: projectData,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectData: Project = await request.json();
    const client = await clientPromise;
    const db = client.db("portfolio");

    const result = await db.collection("projects").updateOne(
      { id },
      {
        $set: {
          ...projectData,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project updated successfully",
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db("portfolio");

    const result = await db.collection("projects").deleteOne({ id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
