const express = require("express");
const app = express();
require("dotenv").config();
const bodyparser = require('body-parser')

// app.use(express.json());
// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

const connectDB = require("./config/db");
connectDB();

app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});