/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { Competition } from "@/types/competitions";

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "0");

    // Build query
    const query: any = {};
    if (status && status !== "All") {
      query.status = status;
    }

    // Fetch competitions
    let competitionsQuery = db.collection("competitions").find(query);

    if (limit > 0) {
      competitionsQuery = competitionsQuery.limit(limit);
    }

    const competitions = await competitionsQuery
      .sort({ startDate: -1 })
      .toArray();

    // Remove MongoDB _id and convert to Competition type
    const formattedCompetitions: Competition[] = competitions.map(
      ({ _id, createdAt, updatedAt, ...competition }) =>
        ({
          ...competition,
          id: _id.toString(),
        } as Competition)
    );

    return NextResponse.json({
      success: true,
      data: formattedCompetitions,
      count: formattedCompetitions.length,
    });
  } catch (error) {
    console.error("Error fetching competitions:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch competitions" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const competitionData: Competition = await request.json();
    const client = await clientPromise;
    const db = client.db("portfolio");

    const newCompetition = {
      ...competitionData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db
      .collection("competitions")
      .insertOne(newCompetition);

    return NextResponse.json({
      success: true,
      message: "Competition created successfully",
      data: { id: result.insertedId },
    });
  } catch (error) {
    console.error("Error creating competition:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create competition" },
      { status: 500 }
    );
  }
}
