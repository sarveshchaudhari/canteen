const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  tableNumber: { type: Number, unique: true, required: true },
  capacity: { type: Number, required: true },
  isAvailable: {
    type: Number,
    default: function () {
      return this.capacity;
    },
  },
  reservedUntil: { type: Date, default: null },
});

module.exports = mongoose.model("Table", tableSchema);
