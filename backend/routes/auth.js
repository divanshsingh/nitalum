const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Alumni = require("../models/Alumni");

router.post("/register", async (req, res) => {
    try{
    const { email, password, username, name, batch } = req.body;
    
    // 1. Check if user exists
    let user = await Alumni.findOne({ $or: [{email}, {username}] });
    if(user) return res.status(400).json({ msg: "User already exists" });

    // 2. Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create User
    user = Alumni.create({
        ...req.body,
        password: hashedPassword,
        status: "pending"
    });

    res.status(201).json({ msg: "Registration successful! Waiting for admin approval." });
    } catch (err){
        res.status(500).json({ error: err.message })
    }
});

// LOGIN Universal
router.post("/login", async(req, res) => {
    try{
    const { email, password, role } = req.body; // role can be admin / member
    if(role == "admin" || role == "member"){
        const sharedPassword = role == "admin" ? process.env.ADMIN_PASS : process.env.MEMBER_PASS; 
        if(password !== sharedPassword) return res.status(400).json({ msg: "Invalid Credentials"});

        const token = jwt.sign({ role }, process.env.JWT_SECRET, { expiresIn: "7d"})
        return res.json({ token, role })
    }

    const alumni = await Alumni.findOne({ email });
    if (!alumni) return res.status(404).json({ msg: "Alumni not found" });

    const isMatch = await bcrypt.compare(password, alumni.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid Credentials" });

    const token = jwt.sign({ id: alumni._id, role: 'alumni' }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, role: 'alumni', username: alumni.username });
} catch (err){
    res.status(500).json({ error: err.message });
}
})

module.exports = router;