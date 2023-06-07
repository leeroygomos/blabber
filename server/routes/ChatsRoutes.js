controller = require('../controllers/ChatsController');

module.exports = function (app) {
  app.get('/chats/:userId/getFriends', function (req, res) {
    // TODO: connect to controller
  });

  app.get('/chats/:userId/getChats', function (req, res) {
    // TODO: connect to controller
  });

  app.get('/chats/:chatId', controller.getChat);

  app.post('/chats/createChat', function (req, res) {
    // TODO: connect to controller
  });
};
