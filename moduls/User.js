const mongoose = require("mongoose");
// const Schema = mongoose.Schema();

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "the user name is required"]
  },
  email: {
    type: String,
    required: true,
    min: 6
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);
