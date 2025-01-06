import express from "express";
import mongoose from "mongoose";
import Season1 from "../models/Season1.js";
import Review from "../models/Review.js";

const router = express.Router();

// Get all episodes of season1
router.get("/", async (req, res) => {
    try {
      const episodes = await Season1.find({});
      res.status(200).json({ success: true,  data: episodes });
    } catch (error) {
      console.log("Error in fetching episodes: ", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
});

// Get a single episode 
router.get("/:id", async (req, res) => {
  const {id} = req.params;

  try {
    const episode = await Season1.findById(id);

    if (!episode) {
      return res.status(404).json({ success: false, message: "Episode not found" });
    }

    res.status(200).json({ success: true,  data: episode });
  } catch (error) {
    console.log("Error in fetching Episode: ", error.message);
    //res.status(404).json({ success: false, message: "Episode not found" });
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Get all reviews of episode1 in season1
router.get("/episodes/reviews", async (req, res) => {
  try {
    const reviews = await Review.find({}).sort({ _id: -1 });
    res.status(200).json({ success: true,  data: reviews });
  } catch (error) {
    console.log("Error in fetching reviews: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Add a new review 
router.post("/episodes/reviews", async (req, res) => {
  const review = req.body;
  
  if (!review.title || !review.user || !review.content || !review.published) {
    return res.status(400).json({ success: false, message: "Please provide fields of Title, User, Review, and Published Date." });
  }
  
  const newReview = new Review(review);

  try {
    await newReview.save();
    res.status(201).json({ success: true,  data: newReview });
  } catch (error) {
    console.log("Error in creating review: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;