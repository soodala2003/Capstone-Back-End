import mongoose from "mongoose";

//const ObjectId = mongoose.Types.ObjectId;

const season1Schema = new mongoose.Schema(
  {
    /* _id: { type: ObjectId }, */
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
 
export default mongoose.model("Season1", season1Schema);