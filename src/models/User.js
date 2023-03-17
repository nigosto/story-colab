import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  salt: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  hashedPassword: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      default: [],
      required: true,
    },
  ],
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);