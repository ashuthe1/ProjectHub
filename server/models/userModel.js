const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    about: {
      type: String,
      default: "I am Developer, who loves to code."
    },
    githubProfile: {
      type: String,
    },
    followersData: {
      count: {
        type: Number,
        default: 0,
      },
      users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    projectsCount: {
      type: Number,
      default: 0,
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
    otp: {
      type: String,
      default: null,
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