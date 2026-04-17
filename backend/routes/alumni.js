const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Alumni = require("../models/Alumni");
const upload = require("../middleware/cloudinary");

router.post('/register', upload.single("image"), async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ msg: "Email, username, and password are required." });
    }

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
      image: req.file?.path || "",
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password: hashedPassword,
      status: 'pending' // Every new signup starts as pending for admin approval [cite: 113, 2386]
    });

    const savedAlumni = await newAlumni.save();
    const token = jwt.sign(
      { id: savedAlumni._id, role: "alumni" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    
    // 4. Return success (don't send the password back!)
    res.status(201).json({ 
      msg: "Profile created successfully! Please wait for admin approval.",
      username: savedAlumni.username,
      token,
      role: "alumni"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error during registration." });
  }
});

router.get('/profile/:username', async (req, res) => {
  try {
    const alumni = await Alumni.findOne({
      username: req.params.username.toLowerCase(),
    }).select("-password");

    if (!alumni) {
      return res.status(404).json({ msg: "Profile not found." });
    }

    res.json(alumni);
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

router.get('/batch/:year', async(req, res) => {
  try{
  const { year } = req.params;
   // We use a "Regex" (Regular Expression) so that if a batch is 
    // stored as "2025–28", it still matches the search for "2025"
  const alumni = await Alumni.find({
    batch: { $regex: year }, 
    status: 'approved' // CRITICAL: Only show profiles the admin has verified
  });  

  res.json(alumni);
} catch (err){
  res.status(500).json({ msg: "Server Error", error: err.message });
}
});

// POST: Login User
router.post('/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // 1. Find user by email
    const user = await Alumni.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { username: identifier.toLowerCase() }
      ]
    });
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // 3. Generate Token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      username: user.username,
      msg: "Logged in successfully"
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});
module.exports = router;
