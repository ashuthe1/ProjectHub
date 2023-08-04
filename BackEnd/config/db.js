const mongoose = require("mongoose");

const connectDB = async (MONGO_URL) => {
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
