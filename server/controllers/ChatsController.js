const Chats = require('../models/Chats');
const usersController = require('./UsersController');

module.exports = {
  // get all friends (DMs) from current session
  getFriends: async (req, res) => {
    // get all group chat IDs from current session
    const chatIds = req.session.chatIds;
    const curUserId = req.session.id;

    // find all DMs in current session
    let directMessages = await Chats.find({ isGroupChat: false })
      .where('_id')
      .in(chatIds)
      .exec();

    // find all friend IDs of currently logged-in user
    let recipientIds = directMessages.map((message) => {
      return message.users[0] === curUserId
        ? message.users[1]
        : message.users[0];
    });

    // find all recipients
    let recipients = await usersController.getUsersByIds(recipientIds);

    // add recipient username to data
    let modifiedDirectMessages = directMessages.map((message) => {
      let messageObj = message.toObject();
      messageObj.username = recipients.find((recipient) =>
        message.users.includes(recipient._id)
      ).username;
      return messageObj;
    });

    // return query
    modifiedDirectMessages ? res.json(modifiedDirectMessages) : res.json([]);
  },

  // get all group chats from current session
  getGroups: async (req, res) => {
    // get all group chat IDs from current session
    const chatIds = req.session.chatIds;

    // find all group chats in current session
    const groups = await Chats.find({ isGroupChat: true })
      .where('_id')
      .in(chatIds)
      .exec();

    // return query
    groups ? res.json(groups) : res.json([]);
  },

  // create a chat
  createChat: async (req, res) => {},
};
