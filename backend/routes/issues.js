const express = require("express");
const ServiceReport = require("../models/ServiceReport");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/my-issues", authMiddleware, async (req, res) => {
  const userEmail = req.query.email;

  if (!userEmail) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const issues = await ServiceReport.find({ email: userEmail }).sort({ dateTime: -1 });
    res.json(issues);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
