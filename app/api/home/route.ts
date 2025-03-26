/* eslint-disable @typescript-eslint/no-unused-vars */
import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase, formatMongoData } from "@/lib/db";
import Home from "@/models/Home";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    // Find the home content or create a default one if it doesn't exist
    let home = await Home.findOne();

    if (!home) {
      // Create default home content
      home = await Home.create({
        hero: {
          title: "Welcome to My Personal Website",
          subtitle:
            "I'm a developer, writer, and creator sharing my thoughts and projects with the world.",
        },
        about: {
          description:
            "I'm passionate about technology, design, and creating meaningful experiences. With over 5 years of experience in web development, I enjoy sharing my knowledge and insights through my blog.",
          experience: "5+ years",
          image: "/placeholder.svg?height=400&width=400",
          skillCategories: [
            {
              name: "Programming Languages",
              skills: [
                { name: "JavaScript", level: 5 },
                { name: "TypeScript", level: 4 },
                { name: "Python", level: 3 },
              ],
            },
            {
              name: "Frontend",
              skills: [
                { name: "React", level: 5 },
                { name: "Next.js", level: 4 },
                { name: "Tailwind CSS", level: 4 },
              ],
            },
          ],
        },
      });
    }

    return NextResponse.json(formatMongoData(home), { status: 200 });
  } catch (error) {
    console.error("Error fetching home content:", error);
    return NextResponse.json(
      { error: "Failed to fetch home content" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase();

    const data = await req.json();

    // Find the home content or create a new one
    let home = await Home.findOne();

    if (home) {
      // Update existing home content
      home = await Home.findByIdAndUpdate(
        home._id,
        { $set: data },
        { new: true, runValidators: true }
      );
    } else {
      // Create new home content
      home = await Home.create(data);
    }

    return NextResponse.json(formatMongoData(home), { status: 200 });
  } catch (error) {
    console.error("Error updating home content:", error);
    return NextResponse.json(
      { error: "Failed to update home content" },
      { status: 500 }
    );
  }
}
