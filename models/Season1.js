import mongoose from "mongoose";

const season1Schema = new mongoose.Schema(
  {
    name: { type: String },
    air_date: { type: String },
    episode: { type: String },
    characters: { type: Array },
    url: { type: String },
    created: { type: String },
    index: { type: Number},
  }, {
    timestamps: true // createdAt, updatedAt
  }
);
 
export default mongoose.model("Season1", season1Schema);