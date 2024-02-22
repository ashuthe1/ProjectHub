const asyncHandler = require('express-async-handler')
const Message = require("../models/messageModel");
const Chat = require("../models/messageModel");

// Send New Message in a Chat (between 2 users, based on chatId)
const newMessage = asyncHandler(async (req, res, next) => {
  const { chatId, content } = req.body;

  const msgData = {
    sender: req.user,
    chatId,
    content,
  };

  const newMessage = await Message.create(msgData);

  await Chat.findByIdAndUpdate(chatId, { latestMessage: newMessage });

  res.status(200).json({
    success: true,
    newMessage,
  });
});

// Get All Messages (between 2 users, based on chatId)
const getMessages = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({
    chatId: req.params.chatId,
  });

  res.status(200).json({
    success: true,
    messages,
  });
});

module.exports = { newMessage, getMessages };
