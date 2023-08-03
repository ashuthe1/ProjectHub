const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userNameOfAuthor: {
        type: String,
        required: true,
    },
    text:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = { Comment };