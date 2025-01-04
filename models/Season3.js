import mongoose from "mongoose";

const season3Schema = new mongoose.Schema(
  {
    id: { type: Number },
    name: { type: String },
    air_date: { type: String },
    episode: { type: String },
    characters: { type: Array },
    url: { type: String },
    created: { type: String },
  }, {
    timestamps: true // createdAt, updatedAt
  }
);
 
export default mongoose.model("Season3", season3Schema);