const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const Result = require('./models/result')

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors());
app.use(express.json());
app.use(logger("dev"));


app.get("/", async (req, res) => {
  try {
    const results = await Result.find({})
    .sort({ duration: 1 });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ err: "there was an error" });
  }
});

app.post("/", async (req, res) => {
  try {
    const result = await Result.create(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("server started");
});
