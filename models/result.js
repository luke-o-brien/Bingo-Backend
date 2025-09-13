const mongoose = require('mongoose');

const resultschema = new mongoose.Schema(
  {
    player: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Result = mongoose.model("Result", resultschema);

module.exports = Result;