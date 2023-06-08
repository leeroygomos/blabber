chatsController = require('../controllers/ChatsController');

module.exports = function (app) {
  app.get('/chats/getChats', function (req, res) {
    // TODO: connect to controller
  });

  app.get('/chats/:chatId', chatsController.getChat);

  app.post('/chats/createChat', function (req, res) {
    // TODO: connect to controller
  });
};
