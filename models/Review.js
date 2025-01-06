import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    episode: { type: String },
    title: { type: String },
    user: { type: String },
    content: { type: String },
    published: { type: String },
    id: { type: Number },
    name: { type: String },
  }, {
    timestamps: true // createdAt, updatedAt
  }
);
 
export default mongoose.model("Review", reviewSchema);