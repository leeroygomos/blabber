const Users = require('../models/Users');
const auth = require('../services/AuthenticationService');
const usersService = require('../services/UsersService');
const chatsService = require('../services/ChatsService');

async function login(username, password, req, res){
    // check if a user is already logged in
    if (req.session?.username){
        res.redirect('/');
        return;
    }

    // check if user with the given username exists
    let user = await usersService.getUserByUsername(username);
    if (user) {
        // check if password is correct
        if (await auth.validateUser(password, user.password)){
            // set session variables
            req.session.userid = user._id;
            req.session.username = user.username;
            req.session.name = user.name;
            req.session.chatIds = user.chatIds;

            // update user status to online
            user.status = 'online';
            await user.save();

            //redirect to root page
            res.status(200).redirect('/')
        }
        else{
            res.status(401).send("Incorrect username or password!")
        }
    }
    else {
        res.status(401).send("Incorrect username or password!");
    }
}

async function signup(data, res){
    // check if a user with the username already exists
    let user = await usersService.getUserByUsername(data.username);
    if (user){
        res.send("Username already taken!");
        return;
    }

    // hash password and create new user
    hashedPassword = await auth.hashPassword(data.password);
    const newUser = Users({
        username: data.username,
        password: hashedPassword,
        name: data.name,
        bio: data.bio,
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
    let user = await usersService.getUserByUsername(req.session.username);
    user.status = 'offline';
    await user.save();

    // destroy session and redirect to root page
    req.session.destroy();
    res.redirect('/');
}

async function addFriend(req, res){
    // check if a user with the given username exists
    let friend = await usersService.getUserByUsername(req.params.username);
    if (!friend){
        res.send("User not found!");
        return;
    }
    // check if user is you
    else if (friend.username === req.session.username){
        res.send("You cannot befriend yourself");
        return;
    }

    // check if user is already friends
    let user = await usersService.getUserByUsername(req.session.username);
    if (user.friendsList.includes(friend._id)){
        res.status(401).send("You are already friends");
        return;
    }
    else {
        // create direct message between user and friend
        try {
            await chatsService.createDirectMessage(friend._id, user._id);
            user.friendsList.push(friend._id);
            friend.friendsList.push(user._id);
            await user.save();
            await friend.save();
            res.status(200).send("Friend added");
        }
        catch(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
            return;
        }
    }
}

function getLoggedInUser(req, res){
    res.json({id: req.session?.userid, username: req.session?.username});
}

module.exports = {
    login, 
    signup, 
    logout, 
    addFriend, 
    getLoggedInUser
};
