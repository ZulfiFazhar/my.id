import mongoose, { Schema, type Document } from "mongoose";

// Define interfaces for nested objects
interface Skill {
  name: string;
  level?: number; // Optional skill proficiency level (1-5)
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface IHome extends Document {
  hero: {
    title: string;
    subtitle: string;
  };
  about: {
    description: string;
    experience: string;
    image: string;
    skillCategories: SkillCategory[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema({
  name: { type: String, required: true },
  level: { type: Number, min: 1, max: 5 },
});

const SkillCategorySchema = new Schema({
  name: { type: String, required: true },
  skills: [SkillSchema],
});

const HomeSchema: Schema = new Schema(
  {
    hero: {
      title: { type: String, required: true },
      subtitle: { type: String, required: true },
    },
    about: {
      description: { type: String, required: true },
      experience: { type: String, required: true },
      image: { type: String, default: "/placeholder.svg?height=400&width=400" },
      skillCategories: [SkillCategorySchema],
    },
  },
  { timestamps: true }
);

// Create the model only if it doesn't exist
export default mongoose.models.Home ||
  mongoose.model<IHome>("Home", HomeSchema);
