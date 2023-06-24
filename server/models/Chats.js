// Require Mongoose
const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema;

const ChatsSchema = new Schema({
  chatName: {
    type: String,
    minLength: 0,
    maxLength: 255,
  },
  users: [String],
  isGroupChat: Boolean,
  avatar: String,
});

// Compile model from schema
const Chats = mongoose.model('Chats', ChatsSchema);

// export { Chats };
module.exports = Chats;
