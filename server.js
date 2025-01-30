const express = require("express");
const mongoose = require("mongoose");
const tableRoutes = require("./routes/tableRoutes");
require("dotenv").config();
const app = express();
const port = 3000;

app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/tables", tableRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
