const mongoose = require("mongoose");
const Table = require("../models/tables"); // Ensure this path is correct
require("dotenv").config();
// Connect to MongoDB Atlas
console.log(process.env.MONGO_URL);
mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB Atlas");

    // Sample table data
    const sampleTables = [
      { tableNumber: 1, capacity: 4, isAvailable: true },
      { tableNumber: 2, capacity: 2, isAvailable: true },
      { tableNumber: 3, capacity: 6, isAvailable: true },
      { tableNumber: 4, capacity: 8, isAvailable: true },
    ];

    // Insert data into the collection
    await Table.insertMany(sampleTables);
    console.log("Tables inserted successfully!");

    // Close the connection
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
