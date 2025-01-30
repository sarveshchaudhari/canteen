const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "Public")));
app.use(express.json());

const orderRoutes = require("./Routes/orderRoutes");
app.use("/orders", orderRoutes);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(5000, () => console.log("Server running on port 5000"));
