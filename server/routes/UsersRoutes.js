usersController = require('../controllers/UsersController');

module.exports = function (app) {
  app.post('/users/login', function (req, res) {
    data = req.body;
    usersController.login(data.username, data.password, req, res);
  });

  app.post('/users/signup', function (req, res) {
    data = req.body;
    usersController.signup(data, res);
  });

  app.post('/users/logout', function (req, res) {
    usersController.logout(req, res);
  });

  app.post('/users/addFriend/:username', function (req, res) {
    usersController.addFriend(req, res);
  });

  app.get('/users/getLoggedInUser', function (req, res) {
    usersController.getLoggedInUser(req, res);
  });

  app.post('/users/addFriend/:username', function (req, res) {
    usersController.addFriend(req, res);
  });

  app.post('/users/uploadAvatar', function (req, res) {
    usersController.uploadAvatar(req, res);
  });

  app.get('/users/getAvatar', function (req, res) {
    usersController.getAvatar(req, res);
  });
};
