const Users = require('../models/Users');

function login(username, password, req, res){
    // check if user is already logged in
    if (req.session?.username){
        res.redirect('/');
        return;
    }

    Users.find({username: username, password: password}).limit(1).then(
        (user) => {
            if (user.length === 0) {
                res.status(401).send('Unauthorized');
            }
            else{
                req.session.id = user[0]._id;
                req.session.username = user[0].username;
                req.session.name = user[0].name;
                req.session.chatIds = user[0].chatIds
                res.redirect('/')
            }
        },
        (err) => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }

    );

}

function getUser(username){

}

function signup(data, res){
    const newUser = Users({
        username: data.username,
        password: data.password, // TODO: encrypt password: https://www.npmjs.com/package/bcryptjs
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

function logout(req,res){
    req.session.destroy();
    res.redirect('/');
}

module.exports = {login, getUser, signup, logout}