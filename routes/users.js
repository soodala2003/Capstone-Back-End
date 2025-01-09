import express from "express";
//import dotenv from "dotenv";
//import mongoose from "mongoose";

import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//dotenv.config(); 
//console.log(process.env.ACCESS_TOKEN_SECRE="1234ABC");
const router = express.Router();

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, "1234ABC");

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ success: false, message: "Not authorized" });
      //throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401).json({ success: false, message: "Not authorized, no token" });
    //throw new Error('Not authorized, no token')
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, "1234ABC" , { expiresIn: '30d', });
}

// @desc    Get all users
// @route   GET /api/users
router.get(`/`, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true,  data: users });
  } catch (error) {
    console.log("Error in fetching Users: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// @desc    Get a user data
// @route   GET /api/users/me
// @access  Private
router.get(`/me`, protect, async (req, res) => {
  //res.status(200).json(req.user);
  const { id, email } = await User.findById(req.user.id);

  res.status(200).json({ id, email });
});


// @desc    Signup a new user
// @route   POST /api/users
// @access  Public
router.post('/', async (req, res) => {
  const { email, password } = req.body
  
  if (!email || !password) {
    res.status(400).json({ success: false, message: "All fields must be filled" });
    //throw new Error('Please add all fields');
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400).json({ success: false, message: "User already exists" });
    //throw new Error('User already exists');
  }
  
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await User.create({ email, password: hash });

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400).json({ success: false, message: "Invalid user data" });
    //throw new Error('Invalid user data');
  }
});

// @desc    Login a user
// @route   POST /api/users/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ success: false, message: "Invalid credentials" });
    //throw new Error('Invalid credentials')
  }
});

// @desc    Logout a user
// @route   POST /api/users/logout
/* router.post('/logout', async (req, res) => {


}); */

export default router;
//module.exports = router











/* 

dotenv.config();
const router = express.Router();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET); //, { expiresIn: "30d" });
};


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

 */