/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Competition } from "@/types/competitions";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db("portfolio");

    const competition = await db.collection("competitions").findOne({ id });

    if (!competition) {
      return NextResponse.json(
        { success: false, error: "Competition not found" },
        { status: 404 }
      );
    }

    const { _id, createdAt, updatedAt, ...competitionData } = competition;

    return NextResponse.json({
      success: true,
      data: competitionData as Competition,
    });
  } catch (error) {
    console.error("Error fetching competition:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch competition" },
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
    const competitionData: Competition = await request.json();
    const client = await clientPromise;
    const db = client.db("portfolio");

    const updatedCompetition = {
      ...competitionData,
      updatedAt: new Date(),
    };

    const result = await db
      .collection("competitions")
      .updateOne({ id }, { $set: updatedCompetition });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Competition not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Competition updated successfully",
    });
  } catch (error) {
    console.error("Error updating competition:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update competition" },
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

    const result = await db.collection("competitions").deleteOne({ id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Competition not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Competition deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting competition:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete competition" },
      { status: 500 }
    );
  }
}
