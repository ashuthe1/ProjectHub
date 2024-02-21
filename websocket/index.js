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

app.use("/api/v1/chat", require("./routes/chatRoutes"));
app.use("/api/v1/message", require("./routes/messageRoutes"));

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: "http://localhost:5173",
    }
  });
  
  let users = [];
  
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
  }
  
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  }
  
  const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
  }
  
  io.on("connection", (socket) => {
    console.log("🚀 Someone connected!");
    // console.log(users);
  
    // get userId and socketId from client
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });
  
    // get and send message
    socket.on("sendMessage", ({ senderId, receiverId, content }) => {
  
        const user = getUser(receiverId);
  
        io.to(user?.socketId).emit("getMessage", {
            senderId,
            content,
        });
    });
  
    // typing states
    socket.on("typing", ({ senderId, receiverId }) => {
        const user = getUser(receiverId);
        console.log(user)
        io.to(user?.socketId).emit("typing", senderId);
    });
  
    socket.on("typing stop", ({ senderId, receiverId }) => {
        const user = getUser(receiverId);
        io.to(user?.socketId).emit("typing stop", senderId);
    });
  
    // user disconnected
    socket.on("disconnect", () => {
        console.log("⚠️ Someone disconnected")
        removeUser(socket.id);
        io.emit("getUsers", users);
        // console.log(users);
    });
  });