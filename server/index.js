const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");


const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");
const credentials = require("./middleware/credentials");
const connectDB = require("./database/connection");

const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/ProjectHub'

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/project", require("./routes/projectRoutes"));
app.use("/api/v1/blog", require("./routes/blogRoutes"));

app.get("/api/v1/health", (req, res) => {
  res.send("Server is up and running healthy!");
});

app.use(errorHandler);
var server
connectDB(MONGODB_URI)
  .then(() => {
    server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB ${err}`);
  });

module.exports = server;