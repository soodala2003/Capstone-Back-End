import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    title: { type: String },
    user: { type: String },
    content: { type: String },
    published: { type: String },
  }, 
);
 
export default mongoose.model("Review", reviewSchema);