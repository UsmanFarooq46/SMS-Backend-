const mongoose = require("mongoose");

const userModelSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "User name is required"],
  },
  email: {
    type: String,
    required:[true,"Email is required"]
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  role: {
    type: String,
    required: [true, "Role is required"],
  },
});


const userModel = mongoose.model("user", userModelSchema);
module.exports = userModel;
