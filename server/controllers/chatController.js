const asyncHandler = require('express-async-handler')
const Chat = require("../models/chatModel");

// Create Chat between 2 users (If not exists)
const newChat = asyncHandler(async (req, res, next) => {
  const chatExists = await Chat.findOne({
    users: {
      $all: [req.user, req.body.receiverId],
    },
  });

  if (chatExists) {
    return res.status(200).json({
      success: true,
      newChat: chatExists,
    });
  }

  const newChat = await Chat.create({
    users: [req.user, req.body.receiverId],
  });

  res.status(200).json({
    success: true,
    newChat,
  });
});

// Get All Chats of the user with latestMessages
const getChats = asyncHandler(async (req, res, next) => {
  const chats = await Chat.find({
    users: {
      $in: [req.user],
    },
  })
    .sort({ updatedAt: -1 })
    .populate("users latestMessage");

  res.status(200).json({
    success: true,
    chats,
  });
});


module.exports = { newChat, getChats };