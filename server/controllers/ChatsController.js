const Chats = require('../models/Chats');
const Users = require('../models/Users');

module.exports = {
  // get all friends (DMs) from current session
  getFriends: async (req, res) => {},

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
