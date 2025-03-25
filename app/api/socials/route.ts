/* eslint-disable @typescript-eslint/no-unused-vars */
import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase, formatMongoData } from "@/lib/db";
import Social from "@/models/Social";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const socials = await Social.find();

    return NextResponse.json(formatMongoData(socials), { status: 200 });
  } catch (error) {
    console.error("Error fetching socials:", error);
    return NextResponse.json(
      { error: "Failed to fetch socials" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const data = await req.json();

    const newSocial = new Social(data);
    await newSocial.save();

    return NextResponse.json(formatMongoData(newSocial), { status: 201 });
  } catch (error) {
    console.error("Error creating social:", error);
    return NextResponse.json(
      { error: "Failed to create social" },
      { status: 500 }
    );
  }
}
