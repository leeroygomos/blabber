messagesController = require('../controllers/MessagesController');

module.exports = function (app) {
  app.post('/messages/sendMessage/:chatId', messagesController.sendMessage);

  app.get('/messages/getMessages/:chatId', messagesController.getMessages);
};
