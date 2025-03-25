import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase, formatMongoData } from "@/lib/db";
import Social from "@/models/Social";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const social = await Social.findById(params.id);

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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const data = await req.json();

    const updatedSocial = await Social.findByIdAndUpdate(
      params.id,
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const deletedSocial = await Social.findByIdAndDelete(params.id);

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
