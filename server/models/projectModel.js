const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    liveLink: {
      type: String,
    },
    githubLink: { 
        type: String 
    },
    techStack: [
        { 
            type: String 
        }
    ],
    longDescription: [{ type: String }],
    ratings: [
      {
        user: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User" 
        },
        rating: { 
            type: Number 
        },
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    ratingDetails: {
      sumOfRatings: {
        type: Number,
        default: 0,
      },
      totalRatings: {
        type: Number,
        default: 0,
      },
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
