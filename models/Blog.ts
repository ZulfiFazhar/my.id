import mongoose, { Schema, type Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  date: Date;
  author: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, default: "/placeholder.svg?height=200&width=400" },
    date: { type: Date, default: Date.now },
    author: { type: String, default: "Zulfi Fadilah Azhar" },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

// Create the model only if it doesn't exist
export default mongoose.models.Blog ||
  mongoose.model<IBlog>("Blog", BlogSchema);
