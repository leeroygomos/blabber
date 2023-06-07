const Users = require('../models/Users');

function login(username, password, req, res){
    Users.find({username: username, password: password}).limit(1).then(
        (user) => {
            if (user === null){
                res.status(401).send('Unauthorized');
            }
            else{
                req.session.id = user._id;
                req.session.username = user.username;
                req.session.name = user.name;
                req.session.chatIds = user.chatIds
                res.status(200).redirect('/')
            }
        },
        (err) => {
            console.log(err);
            res.status(401).send('Unauthorized');
        }

    );

}

function getUser(username){

}

function signup(data, res){
    const newUser = Users({
        username: data.username,
        password: data.password,
        name: data.name
    });

    newUser.save().then(
        () => {
            console.log('One entry added');
            res.send(newUser.username);
        },
        (err) => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    );
}

function logout(){

}

module.exports = {login, getUser, signup, logout}