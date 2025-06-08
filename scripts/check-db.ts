import * as dotenv from "dotenv";
import path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

import clientPromise from "../lib/mongodb";

async function checkConnection() {
  try {
    console.log("🔄 Connecting to MongoDB...");
    console.log(
      "📍 URI:",
      process.env.MONGODB_URI?.replace(/\/\/.*@/, "//***:***@") || "Not found"
    );

    const client = await clientPromise;
    const db = client.db("portfolio");

    // Test the connection
    await db.admin().ping();
    console.log("✅ MongoDB connection successful!");

    // List all collections
    const collections = await db.listCollections().toArray();
    console.log(
      "📋 Available collections:",
      collections.map((c) => c.name)
    );

    // Count documents in each collection
    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments();
      console.log(`   - ${collection.name}: ${count} documents`);
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    console.log("🔍 Make sure MongoDB is running on:", process.env.MONGODB_URI);
    process.exit(1);
  }
}

checkConnection();
