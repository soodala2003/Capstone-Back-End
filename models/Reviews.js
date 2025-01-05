import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema(
  {
    episode: { type: String },
    title: { type: String },
    user: { type: String },
    content: { type: String },
    created: { type: String },
    id: { type: Number },
    name: { type: String },
  }, {
    timestamps: true // createdAt, updatedAt
  }
);
 
export default mongoose.model("Reviews", reviewsSchema);