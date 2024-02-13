const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    profilePicture: { 
        type: String, 
        default: "" 
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    roles: {
      type: [String],
      default: ["BasicUser"],
    },
    isDisabled: { 
        type: Boolean, 
        default: false 
    },
    refreshToken: { 
        type: [String] 
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;