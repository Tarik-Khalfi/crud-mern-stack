const mongoose = require("mongoose");

const user = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  enrollNumber: {
    type: Number,
    require: true,
  },
  dateAdmission: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
  },
});

const User = mongoose.model("User", user);
module.exports = User;
