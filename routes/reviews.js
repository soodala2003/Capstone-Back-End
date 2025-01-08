import express from "express";
import mongoose from "mongoose";
import Review from "../models/Review.js";

const router = express.Router();

// Get all reviews of episode1 in season1
router.get("/", async (req, res) => {
    try {
      const reviews = await Review.find({}).sort({ _id: -1 });
      res.status(200).json({ success: true,  data: reviews });
    } catch (error) {
      console.log("Error in fetching reviews: ", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  });
  
  // Add a new review 
  router.post("/", async (req, res) => {
    const review = req.body;
    
    if (!review.title || !review.user || !review.content || !review.published) {
      return res.status(400).json({ success: false, message: "Please fill in all fields (title, user, review, and published)." });
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
  
  // Update a single review entry
  router.put("/:id", async(req, res) => {
    const {id} = req.params;
    const review = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Invalid Review Id" });
    }
    
    try {
      const updatedReview = await Review.findByIdAndUpdate(id, review, {new:true});
      res.status(200).json({ success: true, data: updatedReview });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server Error" });
    }
  })
  
  // Delete a single review entry
  router.delete("/:id", async (req, res) => {
    const {id} = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Invalid Review Id" });
    }
  
    try {
      await Review.findByIdAndDelete(id);
      res.status(200).json({ success: true,  message: "Review deleted"});
    } catch (error) {
      console.log("Error in deleting review: ", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  });

  export default router;