const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const Alumni = require("../models/Alumni");

router.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // 1. Check if user already exists (by email or username)
    const existingUser = await Alumni.findOne({ 
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ msg: "Email or Username already registered." });
    }

    // 2. Hash the password for security [cite: 71, 1696]
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create and save the new profile [cite: 115, 2399]
    const newAlumni = new Alumni({
      ...req.body,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password: hashedPassword,
      status: 'pending' // Every new signup starts as pending for admin approval [cite: 113, 2386]
    });

    const savedAlumni = await newAlumni.save();
    
    // 4. Return success (don't send the password back!)
    res.status(201).json({ 
      msg: "Profile created successfully! Please wait for admin approval.",
      username: savedAlumni.username 
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error during registration." });
  }
});
module.exports = router;