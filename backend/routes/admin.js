const express = require("express")
const router = express.Router();
const Alumni = require("../models/Alumni");

router.get('/all', async (req, res) => {
  try {
    const allAlumni = await Alumni.find({}); // Empty {} means "find everything"
    res.json(allAlumni);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// PUT update status (Approve/Reject)
router.put('/approve/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Alumni.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// DELETE: Permanently remove a profile
router.delete('/delete/:id', async (req, res) => {
  try {
    await Alumni.findByIdAndDelete(req.params.id);
    res.json({ msg: "Alumni deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;