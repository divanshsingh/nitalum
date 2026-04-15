const mongoose = require("mongoose");

// Schema = the shape/template of your data

const alumniSchema = new mongoose.Schema({
    // ── Identity ──────────────────────────
    name: {
        type: String,
        required: true,
        trim: true,    // removes extra spaces
    },
    
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
    },

    // ── Academic ──────────────────────────

    batch: {
      type: String,
      required: true,
    },

    // ── Professional ─────────────────────
    role: {
      type: String,
      default: '',
    },

    company: {
      type: String,
      default: '',
    },

    city: {
      type: String,
      default: '',
    },

    country: {
      type: String,
      default: '',
    },

    phone: {
      type: String,
      default: '',
    },
    
    // ── Profile ───────────────────────────
    bio: {
      type: String,
      default: '',
      maxlength: 500,  // limit bio length
    },

    techStack: {
      type: [String],  // array of strings
      default: [],
    },

    // ── Links ─────────────────────────────
    linkedin:  { type: String, default: '' },
    github:    { type: String, default: '' },
    portfolio: { type: String, default: '' },
    leetcode:  { type: String, default: '' },
    
    // ── Files (Cloudinary URLs) ───────────
    image:     { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    
    // ── Admin controlled ──────────────────
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],  //enum: [] → only specific values allowed
      default: 'pending', // every new signup starts as pending
    },  
},

  {
    timestamps: true, // auto adds createdAt and updatedAt fields
  }

);

const Alumni = mongoose.model('Alumni', alumniSchema)
module.exports = Alumni;


// mongoose.model('Alumni', alumniSchema)
// This line does two things at once:
// 1 — Creates a Model from your Schema
// Schema  =  blueprint/template (just the design)
// Model   =  the actual tool you use to interact with DB

// Schema is like a cookie cutter shape
// Model  is the actual cookie cutter you use

// 2 — Tells MongoDB which collection to use
// mongoose.model('Alumni', alumniSchema)
// //              ↑
// //         This name 'Alumni'
// //         MongoDB automatically creates a collection
// //         called 'alumni' (lowercase + plural)
// //
// //         Alumni model → 'alumni' collection in MongoDB
