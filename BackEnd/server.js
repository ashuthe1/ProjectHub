const express = require("express");
const app = express();
require("dotenv").config();
const cors = require('cors');
const bodyparser = require('body-parser')
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static('uploads'));

const connectDB = require("./config/db");
connectDB();

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const chatRoutes = require('./routes/chatRoutes');

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/project", projectRoutes);
app.use('/api/v1/chat', chatRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});