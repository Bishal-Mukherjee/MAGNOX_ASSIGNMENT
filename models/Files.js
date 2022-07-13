const mongoose = require("mongoose");

const fileSchema = mongoose.Schema({
  email: {
    type: String,
  },
  file: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = Files = mongoose.model("files", fileSchema);
