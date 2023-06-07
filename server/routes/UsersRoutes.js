controller = require('../controllers/UsersController');

module.exports = function(app){

    app.post('/users/login', function(req, res){
        // do stuff
    });

    app.get('/users/getUser', function(req, res){
        // do stuff
    });

    app.post('/users/signup', function(req, res){
        data = req.body;
        console.log(data);
        controller.signup(data);

    });

    app.post('/users/logout', function(req, res){
        //do stuff
    });
}
