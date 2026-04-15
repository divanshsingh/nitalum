const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require("./routes/auth");

const app = express();

//Both of these are middleware — think of them as checkpoints every request passes
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'NITALUM Backend is running! 🚀' });
});

app.post('/api/auth/gate', (req, res) => {
  const { password } = req.body;
  
  if (password === process.env.MEMBER_PASS) {
    return res.json({ role: 'member' });
  } else if (password === process.env.ADMIN_PASS) {
    return res.json({ role: 'admin' });
  } else {
    return res.status(401).json({ msg: 'Incorrect Password' });
  }
}); 

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 8081;

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
}).then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log('❌ Error:', err.message);
  });