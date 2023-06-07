controller = require('../controllers/ChatsController');

module.exports = function (app) {
  app.get('/chats/getFriends', function (req, res) {
    // TODO: connect to controller
  });

  app.get('/chats/getChats', function (req, res) {
    // TODO: connect to controller
  });

  app.get('/chats/:chatId', function (req, res) {
    // TODO: connect to controller
  });

  app.post('/chats/addFriend', function (req, res) {
    // TODO: connect to controller
  });

  app.post('/chats/createChat', function (req, res) {
    // TODO: connect to controller
  });
};
