import express from "express";
import dotenv from "dotenv";
//import mongoose from "mongoose";

import User from "../models/User.js";
import jwt from "jsonwebtoken";

//import bcrypt from "bcrypt";

dotenv.config();
const router = express.Router();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET); //, { expiresIn: "30d" });
};

// app.use("/api/users", users);
// login routes
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    
    // create a token
    const token = createToken(user._id);
    console.log(token);
    res.status(200).json({ email, token }); //
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}); 

// signup route
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
  
    // create a token
    const token = createToken(user._id);
    console.log(token);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
});

export default router;

/* router.get("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrpty.hash(req.body.password, 10);
    res.status(200).json({ success: true,  data: users });
  } catch (error) {
    console.log("Error in fetching users: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});


router.post("/register", async (req, res) => {
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

 */

// Get all users entries
/* router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true,  data: users });
  } catch (error) {
    //console.log("Error in fetching users: ", error.message);
    //res.status(500).json({ success: false, message: "Server Error" });
    res.status(500).json({ success: false, message: error.message });
  }
});  */

// Add a new single user to the collection
/* router.post("/", async (req, res) => {
  const user = req.body;
  
  if (!user.name || !user.email || !user.password) {
    return res.status(400).json({ success: false, message: "Please fill in all fields (name, email and password)." });
  }
  
  const newUser = new User(user);
  
  try {
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    //console.error("Error in creating user: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}); */


//module.exports = router;
// ? const users = [];

/* router.post("/", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(salt);
    console.log(hashedPassword);

    const user = { name: req.body.name, password: hashedPassword };

    const newUser = new User(user);
    await newUser.save();
    res.status(201).json({ success: true,  data: newUser }); */
    
  //const { name, email, password } = req.body;
  //const user = req.body;
    
  /* if (!user.name || !user.email|| !user.password) {
    return res.status(400).json({ success: false, message: "Please fill in all fields (name, email and password)." });
  }
    
  const newUser = new User(user);
  
  try 
    await newUser.save();
    res.status(201).json({ success: true,  data: newUser });
    HashChangeEvent("password") {*/


  /* } catch (error) {
    //console.log("Error in registering new user: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  } 
});
 */