import clientPromise from "./mongodb";
import { projects } from "@/types/projects";
import { competitions } from "@/types/competitions";

export async function seedDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");

    // Clear existing data
    await db.collection("projects").deleteMany({});
    await db.collection("competitions").deleteMany({});

    // Insert projects
    await db.collection("projects").insertMany(
      projects.map((project) => ({
        ...project,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    // Insert competitions
    await db.collection("competitions").insertMany(
      competitions.map((competition) => ({
        ...competition,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
