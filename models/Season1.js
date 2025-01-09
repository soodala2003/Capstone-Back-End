import mongoose from "mongoose";

const season1Schema = new mongoose.Schema(
  {
    name: { type: String },
    air_date: { type: String },
    episode: { type: String },
    characters: { 
      name: { type: String },
      image: { type: String },
      id: { type: Number }
    },
    url: { type: String },
    created: { type: String },
    num: { type: Number},
  }, 
);
 
export default mongoose.model("Season1", season1Schema);