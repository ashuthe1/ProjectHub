const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    thumbnailImage:{
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