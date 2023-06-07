const Chats = require('../models/Chats');

module.exports = {
  getChat: async (req, res) => {
    // Get chat with specified Id
    const chat = await Chats.findById(req.params.chatId).exec();

    // Return chat info if the chat exists
    chat
      ? res.json({ chatName: chat.chatName, users: chat.users })
      : res.status(404).send('Chat Not Found');
  },
};
