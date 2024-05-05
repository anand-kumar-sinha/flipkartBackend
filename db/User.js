const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    maxLength: 30,
    minLength: 5,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    maxLength: 30,
    minLength: 8,
  },
  role: {
    type: String,
    default: "admin",
  },
});

module.exports = mongoose.model("User", userSchema);
