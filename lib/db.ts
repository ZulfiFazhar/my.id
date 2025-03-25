/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

function isDbConnected() {
  return mongoose.connection.readyState === 1; // 1 = Connected
}

export async function connectToDatabase() {
  if (isDbConnected()) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI as any);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to database");
  }
}

export function formatMongoData(data: any) {
  return JSON.parse(JSON.stringify(data));
}
