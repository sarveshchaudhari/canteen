const express = require("express");
const router = express.Router();
const Table = require("../models/tables");

// Get available tables
router.get("/available", async (req, res) => {
  try {
    await Table.updateMany(
      { reservedUntil: { $lt: new Date() } },
      { isAvailable: true, reservedUntil: null }
    );
    const availableTables = await Table.find({ isAvailable: true });
    res.json(availableTables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reserve a table
router.post("/reserve", async (req, res) => {
  const { seatRequirement } = req.body;
  try {
    const table = await Table.findOne({
      isAvailable: true,
      capacity: { $gte: seatRequirement },
    }).sort({ capacity: 1 });

    if (!table) return res.status(400).json({ message: "No table available" });

    table.isAvailable = false;
    table.reservedUntil = new Date(Date.now() + 30 * 60000);
    await table.save();

    res.json({ message: "Table reserved", table });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
