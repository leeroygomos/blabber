const Users = require('../models/Users');
const Chats = require('../models/Chats');
const auth = require('../services/AuthenticationService');

async function login(username, password, req, res){
    // check if a user is already logged in
    if (req.session?.username){
        res.redirect('/');
        return;
    }

    // check if user with the given username exists
    let user = await Users.findOne({username: username}).exec();
    if (user) {
        // check if password is correct
        if (await auth.validateUser(password, user.password)){
            // set session variables
            req.session.id = user._id;
            req.session.username = user.username;
            req.session.name = user.name;
            req.session.chatIds = user.chatIds;

            // update user status to online
            user.status = 'online';
            await user.save();

            //redirect to root page
            res.redirect('/')
        }
        else{
            res.send("Incorrect password or username!")
        }
    }
    else {
        res.send("Incorrect username or password!");
    }
}

function getUser(username){

}

async function signup(data, res){
    // check if a user with the username already exists
    let user = await Users.findOne({username: data.username}).exec();
    if (user){
        res.send("Username already taken!");
        return;
    }

    // hash password and create new user
    hashedPassword = await auth.hashPassword(data.password);
    const newUser = Users({
        username: data.username,
        password: hashedPassword,
        name: data.name
    });

    // save user then redirect to root page if successful
    newUser.save().then(
        () => {
            res.status(200).redirect('/');
        },
        (err) => {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    );
}

async function logout(req,res){
    // set status to offline
    let user = await Users.findOne({username: req.session.username}).exec();
    user.status = 'offline';
    await user.save();

    // destroy session and redirect to root page
    req.session.destroy();
    res.redirect('/');
}

async function addFriend(req, res){
    // check if a user with the given username exists
    let friend = await Users.findOne({username: req.params.username}).exec();
    if (!friend){
        res.send("User not found!");
        return;
    }
    // check if user is you
    else if (friend.username !== req.session.username){
        res.send("You cannot befriend yourself");
        return;
    }

    // get user and friend's chatIds
    let user = await Users.findOne({username: req.body.username}).exec();
    let userChatList = user.chatIds;
    let friendChatList = friend.chatIds;

    // get chats where both user and friend are members
    const sharedChatIds = userChatList.filter(chatId => friendChatList.includes(chatId));

    // check if there are any shared chats
    if (sharedChatIds.length > 0){
        // check if they are already friends
        let sharedChats = await Chats.find({_id: {$in: sharedChatIds}, users: {$size: 2}}).exec();
        if (sharedChats.length > 0){
            res.send("You are already friends");
            return;
        }
        else {
            // TODO: add /createChat call
        }
    }
    else {
        // TODO: add /createChat call
    }
}

module.exports = {login, getUser, signup, logout, addFriend}