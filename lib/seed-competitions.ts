import clientPromise from "./mongodb";
import { competitions } from "@/types/competitions";

export async function seedCompetitions() {
  try {
    const client = await clientPromise;
    const db = client.db("portfolio");

    // Check if competitions already exist
    const existingCompetitions = await db
      .collection("competitions")
      .countDocuments();

    if (existingCompetitions === 0) {
      const competitionsWithTimestamps = competitions.map((competition) => ({
        ...competition,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await db
        .collection("competitions")
        .insertMany(competitionsWithTimestamps);
      console.log("Competitions seeded successfully");
    } else {
      console.log("Competitions already exist, skipping seed");
    }
  } catch (error) {
    console.error("Error seeding competitions:", error);
  }
}
