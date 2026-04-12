const express = require("express");
const { default: mongoose } = require("mongoose");


const app = express();

const PORT = process.env.PORT || 5000;

mongoose
.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("DB Connected");
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.log('❌ MongoDB connection failed:', err.message);
})