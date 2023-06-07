controller = require('../controllers/UsersController');

// const express = require('express');

module.exports = function(app){
    // app.use(express.json());

    app.post('/users/login', function(req, res){
        data = req.body;
        controller.login(data.username, data.password, req, res);
    });

    app.get('/users/getUser', function(req, res){
        // do stuff
    });

    app.post('/users/signup', function(req, res){
        data = req.body;
        controller.signup(data,res);
    });

    app.post('/users/logout', function(req, res){
        //do stuff
    });
}
