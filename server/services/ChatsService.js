const Chats = require('../models/Chats');

module.exports = {
// create a direct message
createDirectMessage: async (friendId, userId) => {
    // create a direct message object
    const newDirectMessage = Chats({
      chatName: '',
      users: [friendId, userId],
      isGroupChat: false,
    });

    // save the new direct message to the database
    newDirectMessage.save().then(
      async () => {
        // add new chatId to each user
        try {
          await usersController.updateChatLists(newDirectMessage._id, [
            friendId,
            userId,
          ]);
        } catch (err) {
          throw new Error('Error updating chat list for user ' + userId);
        }
      },
      (err) => {
        // send error if save fails
        throw new Error('Internal Server Error');
      }
    );
  },
};
