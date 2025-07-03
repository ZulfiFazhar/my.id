import * as dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import clientPromise from "../lib/mongodb";
import { projects } from "../types/projects";
import { competitions } from "../types/competitions";

async function seedDatabase() {
  try {
    console.log("🔄 Connecting to MongoDB...");
    const client = await clientPromise;
    const db = client.db("portfolio");

    console.log("🗑️ Clearing existing data...");
    // Clear existing data
    await db.collection("projects").deleteMany({});
    await db.collection("competitions").deleteMany({});

    console.log("📦 Seeding projects...");
    // Insert projects with timestamps
    const projectsWithTimestamps = projects.map((project) => ({
      ...project,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const projectsResult = await db
      .collection("projects")
      .insertMany(projectsWithTimestamps);
    console.log(`✅ Inserted ${projectsResult.insertedCount} projects`);

    console.log("🏆 Seeding competitions...");
    // Insert competitions with timestamps
    const competitionsWithTimestamps = competitions.map((competition) => ({
      ...competition,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const competitionsResult = await db
      .collection("competitions")
      .insertMany(competitionsWithTimestamps);
    console.log(`✅ Inserted ${competitionsResult.insertedCount} competitions`);

    console.log("🎉 Database seeded successfully!");

    // Show final count
    const projectCount = await db.collection("projects").countDocuments();
    const competitionCount = await db
      .collection("competitions")
      .countDocuments();

    console.log(`📊 Final counts:`);
    console.log(`   - Projects: ${projectCount}`);
    console.log(`   - Competitions: ${competitionCount}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
