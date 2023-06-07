const Users = require('../models/Users');

function login(username, password){

}

function getUser(username){

}

function signup(data){
    const newUser = Users({
        username: data["username"],
        password: data.password,
        name: data.name
    });

    newUser.save().then(
        () => {
            console.log('One entry added');
            res.send(newUser.username)
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