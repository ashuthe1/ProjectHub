const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    projectId: {
        type: String,
        required: true,
        unique: true,
    },
    userNameOfCreator:{
        type: String,
        required: true,
    },
    description:{
        shortDescription:{
            type: String,
            required: true,
        },
        longDescription:{
            type: String,
        },
    },
    techStack:{
        type: [String],
    },
    thumbnailImageUrl:{
        type: String,
    },
    links:{
        gitHubLink:{
            type: String,
            required: true,
        },
        liveLink:{
            type: String,
        },
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
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
    }],
    publishedDate:{
        type: Date,
        default: Date.now,
    },
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;