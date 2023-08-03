const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    shortDescription:{
        type: String,
        required: true,
    },
    longDescription:{
        type: String,
    },
    techStack:{
        type: [String],
    },
    thumbnailImage:{
        type: String,
    },
    gitHubLink:{
        type: String,
        required: true,
    },
    liveLink:{
        type: String,
    },
    rating:{
        type: Number,
        default : 0,
    },
    isFeatured:{
        type: Boolean,
        default: false,
    }, 
    likes:{
        type: Number,
        default : 0,
    },
    comments:{
        type: [mongoose.Mongoose.Schema.Types.ObjectId],
        ref: "Comment",
    },
});

const Project = mongoose.model("Project", projectSchema);
module.exports = { Project };