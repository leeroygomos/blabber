const Users = require('../models/Users');
const auth = require('../services/AuthenticationService');
const usersService = require('../services/UsersService');
const chatsService = require('../services/ChatsService');

async function login(username, password, req, res) {
  // check if a user is already logged in
  if (req.session?.username) {
    res.redirect('/');
    return;
  }

  // check if user with the given username exists
  let user = await usersService.getUserByUsername(username);
  if (user) {
    // check if password is correct
    if (await auth.validateUser(password, user.password)) {
      // set session variables
      req.session.userid = user._id;
      req.session.username = user.username;
      req.session.name = user.name;
      req.session.chatIds = user.chatIds;
      req.session.status = 'online';
      req.session.avatar = user.avatar;
      req.session.bio = user.bio;
      req.session.frientsList = user.frientsList;
      req.session.email = user.email;

      // update user status to online
      user.status = 'online';
      await user.save();

      //redirect to root page
      res.status(200).redirect('/');
    } else {
      res.status(401).send('Incorrect username or password!');
    }
  } else {
    res.status(401).send('Incorrect username or password!');
  }
}

async function signup(data, res) {
  // check if a user with the username already exists
  let user = await usersService.getUserByUsername(data.username);
  if (user) {
    res.status(401).send({ message: 'Username already taken!' });
    return;
  }
  // hash password and create new user
  hashedPassword = await auth.hashPassword(data.password);
  const newUser = Users({
    email: data.email,
    username: data.username,
    password: hashedPassword,
    bio: '',
  });

  // save user then redirect to root page if successful
  newUser.save().then(
    () => {
      res.status(200).redirect('/');
    },
    (err) => {
      console.log(err);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  );
}

async function logout(req, res) {
  // set status to offline
  let user = await usersService.getUserByUsername(req.session.username);
  user.status = 'offline';
  await user.save();

  // destroy session and redirect to root page
  req.session.destroy();
  res.status(200).redirect('/');
}

async function addFriend(req, res) {
  // check if a user with the given username exists
  let friend = await usersService.getUserByUsername(req.params.username);
  if (!friend) {
    res.send('User not found!');
    return;
  }
  // check if user is you
  else if (friend.username === req.session.username) {
    res.send('You cannot befriend yourself');
    return;
  }

  // check if user is already friends
  let user = await usersService.getUserByUsername(req.session.username);
  if (user.friendsList.includes(friend._id)) {
    res.status(401).send('You are already friends');
    return;
  } else {
    // create direct message between user and friend
    try {
      await chatsService.createDirectMessage(friend._id, user._id);
      user.friendsList.push(friend._id);
      friend.friendsList.push(user._id);
      await user.save();
      await friend.save();
      res.status(200).send('Friend added');
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
      return;
    }
  }
}

function getLoggedInUser(req, res) {
  res.json({
    id: req.session?.userid,
    username: req.session?.username,
    name: req.session?.name,
    chatIds: req.session?.chatIds,
    friendsList: req.session?.friendsList,
    status: req.session?.status,
    avatar: req.session?.avatar,
    bio: req.session?.bio,
    email: req.session?.email,
  });
}

async function uploadAvatar(req, res) {
  // Check if request is authorized
  if (!req.session) {
    res.status(401).send('Unauthorized');
    return;
  }

  // update currently logged in user's avatar
  try {
    const filter = { _id: req.session?.userid };
    const update = req.body;
    await Users.findOneAndUpdate(filter, update);
    res.status(201).json('Avatar Uploaded!');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}

async function updateProfile(req, res) {
  // Check if request is authorized
  if (!req.session) {
    res.status(401).send('Unauthorized');
    return;
  }

  // check if a user with the username already exists
  let user = await usersService.getUserByUsername(req.body.username);
  if (user && user._id.toString() !== req.session.userid) {
    res.status(401).send({ message: 'Username already taken!' });
    return;
  }

  // check if a user with the email already exists
  user = await usersService.getUserByEmail(req.body.email);
  if (user && user._id.toString() !== req.session.userid) {
    res.status(401).send({ message: 'Email already taken!' });
    return;
  }

  // update current user's profile
  try {
    const filter = { _id: req.session.userid };
    const update = {
      avatar: req.body.avatar || req.session.avatar,
      username: req.body.username,
      email: req.body.email,
      bio: req.body.bio,
    };
    console.log(update);
    await Users.findOneAndUpdate(filter, update);

    res.status(204).json('Profile Updated!');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  login,
  signup,
  logout,
  addFriend,
  getLoggedInUser,
  updateProfile,
  uploadAvatar,
};
