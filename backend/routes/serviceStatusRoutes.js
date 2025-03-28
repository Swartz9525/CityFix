const express = require("express");
const router = express.Router();
const ServiceReport = require("../models/ServiceReport");

// GET route to fetch complaint status by reference number
router.get("/status/:referenceNumber", async (req, res) => {
  try {
    const { referenceNumber } = req.params;

    // Find the report in MongoDB
    const report = await ServiceReport.findOne({ referenceNumber });

    if (!report) {
      return res.status(404).json({ message: "No record found!" });
    }

    res.json({
      referenceNumber: report.referenceNumber,
      title: report.title,
      description: report.description,
      address: report.address,
      dateTime: report.dateTime.toISOString().split("T")[0], // Formatting date
      status: report.status || "Pending", // Default status if not set
    });
  } catch (error) {
    console.error("Error fetching complaint status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
