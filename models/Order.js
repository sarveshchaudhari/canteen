const mongoose = require("mongoose");
const crypto = require("crypto");

const orderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  order_type: { type: String, enum: ["takeaway", "dine-in"], required: true },
  table_number: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
    required: function () {
      return this.order_type === "dine-in";
    },
  },
  items: [{ name: String, price: Number, quantity: Number }],
  total_price: Number,
  status: { type: String, default: "pending" },
  otp: { type: String, required: true },
  isResolved: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

orderSchema.pre("save", function (next) {
  if (!this.otp) {
    this.otp = crypto.randomInt(100000, 999999).toString();
  }
  next();
});

module.exports = mongoose.model("Order", orderSchema);
