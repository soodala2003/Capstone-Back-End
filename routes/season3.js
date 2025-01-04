import express from "express";
import mongoose from "mongoose";
import Season3 from "../models/Season3.js";

const router = express.Router();

// Get all episodes of season3
router.get("/", async (req, res) => {
    try {
      const season3 = await Season3.find({});
      res.status(200).json({ success: true,  data: season3 });
    } catch (error) {
      console.log("Error in fetching episodes: ", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
});

export default router;