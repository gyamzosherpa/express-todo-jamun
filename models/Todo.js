const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name: String,
  status: {
    type: String,
    enum: ["Todo", "In Progress", "Done"],
  },
});

module.exports = mongoose.model("Todo", todoSchema);
