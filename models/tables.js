const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  tableNumber: Number,
  capacity: Number,
  isAvailable: { type: Boolean, default: true },
  reservedUntil: { type: Date, default: null },
});

module.exports = mongoose.model("Table", tableSchema);
