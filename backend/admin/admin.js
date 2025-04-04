// routes/serviceReportRoutes.js
const express = require("express");
const router = express.Router();
const ServiceReport = require("../models/ServiceReport");

// GET all service reports
router.get("/", async (req, res) => {
  try {
    const reports = await ServiceReport.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reports", error: err.message });
  }
});
router.put("/:id/status", async (req, res) => {
  const { status } = req.body;

  if (!["Pending", "Completed"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const updatedReport = await ServiceReport.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ message: "Status updated", report: updatedReport });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status", error: err.message });
  }
});

module.exports = router;
