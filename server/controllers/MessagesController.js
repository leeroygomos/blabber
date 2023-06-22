const Messages = require('../models/Messages');

module.exports = {
  sendMessage: async (req, res) => {
    // check if current user is logged in
    if (!req.session.userid) {
      res.status(401).send('Unauthorized');
      return;
    }

    // create a new message
    const newMessage = Messages({
      chatId: req.params.chatId,
      senderId: req.session.userid,
      message: req.body.message,
    });

    // save the new message to the database
    newMessage.save().then(
      async () => {
        res.status(200).json('Message Sent!');
      },
      (err) => {
        // send error if save fails
        res.status(500).send('Internal Server Error');
      }
    );
  },
};
