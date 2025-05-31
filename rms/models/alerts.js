const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  inverterId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ["low", "high"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  duration: {
    type: Number, 
  },
});

module.exports = mongoose.model("Alert", alertSchema);
