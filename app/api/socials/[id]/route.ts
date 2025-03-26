/* eslint-disable @typescript-eslint/no-explicit-any */
import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase, formatMongoData } from "@/lib/db";
import Social from "@/models/Social";

export async function GET(req: NextRequest, context: any) {
  try {
    await connectToDatabase();
    const { id } = await context.params;
    const social = await Social.findById(id);

    if (!social) {
      return NextResponse.json({ error: "Social not found" }, { status: 404 });
    }

    return NextResponse.json(formatMongoData(social), { status: 200 });
  } catch (error) {
    console.error("Error fetching social:", error);
    return NextResponse.json(
      { error: "Failed to fetch social" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, context: any) {
  try {
    await connectToDatabase();

    const data = await req.json();
    const { id } = await context.params;
    const updatedSocial = await Social.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!updatedSocial) {
      return NextResponse.json({ error: "Social not found" }, { status: 404 });
    }

    return NextResponse.json(formatMongoData(updatedSocial), { status: 200 });
  } catch (error) {
    console.error("Error updating social:", error);
    return NextResponse.json(
      { error: "Failed to update social" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, context: any) {
  try {
    await connectToDatabase();
    const { id } = await context.params;
    const deletedSocial = await Social.findByIdAndDelete(id);

    if (!deletedSocial) {
      return NextResponse.json({ error: "Social not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Social deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting social:", error);
    return NextResponse.json(
      { error: "Failed to delete social" },
      { status: 500 }
    );
  }
}
