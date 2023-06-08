const Chats = require('../models/Chats');
const Users = require('../models/Users');

module.exports = {
  // get all chats
  // retrieve following info:
  // 1. chatName (stored as username of recipient if dm, otherwise stored as user-defined chat name)
  // 2. description (bio if dm, otherwise stored as description in chat)
  // return it in the following format: [{chatName: string, description: string}, {...}, ...]
  // TODO: test and see if queries work
  // TODO: add appropriate error handling
  getChats: async (req, res) => {
    // get chatIds and username stored in session
    const chatIds = req.session.chatIds;

    // find all DM (exactly 2 users in chat) chatNames from session (DM chatNames are equal to the name of the recipient)
    const dmChatNames = await Chats.find({
      $expr: { $eq: [{ $size: '$users' }, 2] },
    })
      .where('_id')
      .in(chatIds)
      .select('chatName')
      .exec();

    // find all group chats (at least 3 users in chat) from session
    const groups = await Chats.find({
      $expr: { $gte: [{ $size: '$users' }, 3] },
    })
      .where('_id')
      .in(chatIds)
      .select(['chatName', 'description'])
      .exec();

    // get info on recipients
    const recipients = await Users.find()
      .where('username')
      .in(dmChatNames)
      .select(['username', 'bio'])
      .exec();

    // update field names
    const dms = recipients.map(({ username: chatName, bio: description }) => ({
      chatName,
      description,
    }));

    // return all chats info
    res.json(groups.concat(dms));
  },

  // get a specific chat's info
  getChat: async (req, res) => {
    // get chat with specified Id
    const chat = await Chats.findById(req.params.chatId).exec();

    // return chat info if the chat exists
    chat
      ? res.json({ chatName: chat.chatName, users: chat.users })
      : res.status(404).send('Chat Not Found');
  },
};
