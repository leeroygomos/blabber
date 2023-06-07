// Require Mongoose
const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema;

const ChatsSchema = new Schema({
  chatName: {
    type: String,
    minLength: 3,
    maxLength: 255,
  },
  users: [String],
});

// Compile model from schema
const Chats = mongoose.model('Chats', ChatsSchema);

// export { Chats };
module.exports = Chats;
