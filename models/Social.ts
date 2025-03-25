import mongoose, { Schema, type Document } from "mongoose";

export interface ISocial extends Document {
  platform: string;
  username: string;
  url: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

const SocialSchema: Schema = new Schema(
  {
    platform: { type: String, required: true },
    username: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String, required: true },
    bgColor: { type: String, default: "bg-primary" },
    iconColor: { type: String, default: "text-primary-foreground" },
  },
  { timestamps: true }
);

export default mongoose.models.Social ||
  mongoose.model<ISocial>("Social", SocialSchema);
