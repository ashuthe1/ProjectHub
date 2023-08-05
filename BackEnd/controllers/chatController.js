const Chat = require('../models/Chat');

const createOrGetChat = async (req, res) => {
  try {
    const { participants } = req.body;
    const existingChat = await Chat.findOne({ participants });

    if (existingChat) {
      return res.json(existingChat);
    }

    const newChat = new Chat({ participants });
    await newChat.save();

    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { chatId, sender, text } = req.body;

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    chat.messages.push({ sender, text });
    await chat.save();

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = { createOrGetChat, sendMessage };
