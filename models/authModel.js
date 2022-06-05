const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userAuth = mongoose.model("userAuth", authSchema);

module.exports = userAuth;
