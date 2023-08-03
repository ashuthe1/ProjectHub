const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type: String,
    },
    userName:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    projects:{
        type: [mongoose.Mongoose.Schema.Types.ObjectId],
        ref: "Project",
    },
    friends:{
        type: mongoose.Mongoose.Schema.Types.ObjectId,
        ref: "User",
    }, 
    profilePicUrl:{
        type: String,
        default: "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1687432999~exp=1687433599~hmac=33e172819c9cbfbc3af7d6e1c2b39726359c81c79b4f4fb6dc9b0fbc40f81cc9",
    },
    password:{
        type: String,
        required: true,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = { User };