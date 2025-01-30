const express = require("express");
const router = express.Router();
const Order = require("../Models/Order");
const Table = require("../Models/Table");

router.post("/create", async (req, res) => {
  try {
    const { user_id, order_type, table_number, items, total_price } = req.body;

    if (order_type === "dine-in") {
      const table = await Table.findById(table_number);
      if (!table || table.isAvailable <= 0) {
        return res.status(400).json({ message: "Table not available" });
      }
      table.isAvailable -= 1;
      await table.save();
    }

    const order = new Order({
      user_id,
      order_type,
      table_number,
      items,
      total_price,
    });
    await order.save();

    res.status(201).json({ message: "Order placed", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/resolve", async (req, res) => {
  try {
    const { otp } = req.body;
    const order = await Order.findOne({ otp });

    if (!order) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    order.isResolved = true;
    order.status = "completed";
    await order.save();

    res.status(200).json({ message: "Order resolved", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
