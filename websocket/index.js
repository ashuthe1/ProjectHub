const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./database/connection");

const { app, server } = require("./socket/socket");

const PORT = process.env.PORT || 8081;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/ProjectHub'

app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/messages", require("./routes/messageRoutes"));

connectDB(MONGODB_URI)
  .then(() => {
    server.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB ${err}`);
  });
  