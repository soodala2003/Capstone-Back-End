import mongoose from "mongoose";

const season2Schema = new mongoose.Schema(
  {
    name: { type: String },
    air_date: { type: String },
    episode: { type: String },
    characters: { type: Array },
    url: { type: String },
    created: { type: String },
    num: { type: Number},
  }, {
    timestamps: true // createdAt, updatedAt
  }
);
 
export default mongoose.model("Season2", season2Schema);