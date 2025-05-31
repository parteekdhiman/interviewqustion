const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    enum: ["owner", "installer"],
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: Number,
  },
  plant: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user',userschema)
