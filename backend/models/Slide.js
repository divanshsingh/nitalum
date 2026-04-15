const mongoose = require("mongoose");

const slideSchema = new mongoose.Schema({
    label: {type: String, required: true},
    imageUrl: {type: String, default: ""},
    publicId: {type: String, default: ""},  // it is cloudnary file id; 
    order: {type: Number, default: 0},
}, {timestamps: true});

module.export = mongoose.model("Slide", slideSchema);