const Users = require('../models/Users');

async function getUserByUsername(username) {
  let user = await Users.findOne({ username: username }).exec();
  return user;
}

async function getUsersByUsernames(usernames) {
  let users = await Users.find({ username: { $in: usernames } }).exec();
  return users;
}

async function getUserByEmail(email) {
  let user = await Users.findOne({ email: email }).exec();
  return user;
}

async function getUsersByIds(ids) {
  let users = await Users.find({ _id: { $in: ids } }).exec();
  return users;
}

async function updateChatLists(chatId, userIds) {
  let users = await getUsersByIds(userIds);
  for (let i = 0; i < users.length; i++) {
    users[i].chatIds.push(chatId);
    try {
      await users[i].save();
    } catch (err) {
      throw new Error('Error updating chat list for user ' + users[i].username);
    }
  }
}

module.exports = {
  getUserByUsername,
  getUsersByUsernames,
  getUserByEmail,
  getUsersByIds,
  updateChatLists,
};
