const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
    label: {type: String, required: true},
    year: {type: Date, required: true},
    imageUrl: {type: String, default: ""},
    publicId: {type: String, default: ""},
}, {timestamps: true})

module.exports = mongoose.model("Gallery", gallerySchema);