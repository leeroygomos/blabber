usersController = require('../controllers/UsersController');

module.exports = function(app){
    app.post('/users/login', function(req, res){
        data = req.body;
        usersController.login(data.username, data.password, req, res);
    });

    app.get('/users/getUser', function(req, res){
        // do stuff
    });

    app.post('/users/signup', function(req, res){
        data = req.body;
        usersController.signup(data,res);
    });

    app.post('/users/logout', function(req, res){
        //do stuff
    });
}
