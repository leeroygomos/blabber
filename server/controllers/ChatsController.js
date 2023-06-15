const Chats = require('../models/Chats');
const usersController = require('./UsersController');

module.exports = {
  // get all friends (DMs) from current session
  getFriends: async (req, res) => {
    // get all group chat IDs from current session
    const chatIds = req.session.chatIds;
    const curUserId = req.session.userid;

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

  // create a group chat
  createGroupChat: async (req, res) => {
    // check if current user is logged in
    if (!req.session.userid) {
      res.status(401).send('Unauthorized');
      return;
    }

    // get all users to be added
    let members = await usersController.getUsersByUsernames(req.body.users);

    // get all IDs to be added
    let memberIds = members.map((user) => {
      return user._id;
    });

    // check if all users entered exist
    // TODO: improve this error check
    if (memberIds.length !== req.body.users.length) {
      res.status(404).send('At least 1 user you entered does not exist');
      return;
    }

    // add current user ID to the list of IDs to be added
    memberIds.push(req.session.userid);

    // create a new group chat object
    const newGroupChat = Chats({
      chatName: req.body.chatName,
      users: memberIds,
      isGroupChat: true,
    });

    // save the new group chat to the database
    newGroupChat.save().then(
      async () => {
        // add new chatId to each user
        try {
          await usersController.updateChatLists(newGroupChat._id, memberIds);
        } catch (err) {
          res.status(500).send('Internal Server Error');
          return;
        }
        // redirect to root on success
        res.status(200).redirect('/');
      },
      (err) => {
        // send error if save fails
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
    );
  },

  // create a direct message
  createDirectMessage: async (req, res) => {
    // TODO: complete this function
  },
};
