const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL || "mongodb://0.0.0.0:27017/projectHub";

const connectDB = async () => {
  try {
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Databse Connected");
  } catch (error) {
    console.log(`Error Detected ${error}`);
  }
};

module.exports = connectDB;
