const mongoose = require("mongoose");
const inverterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  plant: {
    type: String,
    required: true,
  },
  whoinstall: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Inverters", inverterSchema);
