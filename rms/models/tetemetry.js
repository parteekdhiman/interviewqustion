const mongoose = require("mongoose");
const telemetry = new mongoose.Schema({
  inverterId: {
    type: {
      type: String,
      required: true,
    },
  },
  timestamp: {
    type: String,
    required: Date,
  },
  voltage: {
    type: Number,
    required: true,
  },
  current: {
    type: Number,
    required: true,
  },
  power: {
    type: Number,
    required: true,
  },
});
module.export = mongoose.model("telemetrys",telemetry);
