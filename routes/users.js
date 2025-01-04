import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";

const router = express.Router();

// Get all users entries
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true,  data: users });
  } catch (error) {
    console.log("Error in fetching users: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;