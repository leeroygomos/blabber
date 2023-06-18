chatsController = require('../controllers/ChatsController');

module.exports = function (app) {
  app.get('/chats/getFriends', chatsController.getFriends);

  app.get('/chats/getGroups', chatsController.getGroups);

  app.post('/chats/createGroupChat', chatsController.createGroupChat);

};
