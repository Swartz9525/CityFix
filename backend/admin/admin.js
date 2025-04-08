const express = require("express");
const router = express.Router();
const ServiceReport = require("../models/ServiceReport");

// GET all service reports
router.get("/", async (req, res) => {
  console.log("GET /api/service-reports hit");
  try {
    const reports = await ServiceReport.find().sort({ createdAt: -1 });
    console.log("Reports fetched:", reports.length);
    res.json(reports);
  } catch (err) {
    console.error("Error fetching reports:", err.message);
    res.status(500).json({ message: "Failed to fetch reports", error: err.message });
  }
});

// PUT to update report status
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

    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json({ message: "Status updated", report: updatedReport });
  } catch (err) {
    console.error("Error updating status:", err.message);
    res.status(500).json({ message: "Failed to update status", error: err.message });
  }
});

// (Optional) POST route to add dummy reports (for testing)
router.post("/", async (req, res) => {
  const { title, description } = req.body;

  try {
    const newReport = new ServiceReport({
      title,
      description,
      status: "Pending",
    });

    await newReport.save();
    res.status(201).json({ message: "Report created", report: newReport });
  } catch (err) {
    console.error("Error creating report:", err.message);
    res.status(500).json({ message: "Failed to create report", error: err.message });
  }
});

module.exports = router;
