const express = require("express");
const app = express();
require("dotenv").config();
const bodyparser = require('body-parser')
const upload = require('./config/multerConfig');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

const connectDB = require("./config/db");
connectDB();

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/project", projectRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});