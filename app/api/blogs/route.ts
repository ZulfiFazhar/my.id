/* eslint-disable @typescript-eslint/no-unused-vars */
import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase, formatMongoData } from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const blogs = await Blog.find().sort({ date: -1 });

    return NextResponse.json(formatMongoData(blogs), { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const data = await req.json();

    if (!data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-");
    }

    const newBlog = new Blog(data);
    await newBlog.save();

    return NextResponse.json(formatMongoData(newBlog), { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
