const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectDB = async (MONGODB_URI) => {
    await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
    })
    .then(() => {
        console.log("Connected to Database :)");
    })
    .catch((error) => {
        console.log("Error: ", error);
        return error;
    });
}

module.exports = connectDB;
