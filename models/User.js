const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
  },
});

module.exports = User = mongoose.model("user", userSchema);
