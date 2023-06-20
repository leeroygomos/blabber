// Require Mongoose
const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  name: String,
  email: String,
  chatIds: [String],
  friendsList: [String],
  status: {
    type: String,
    default: 'offline',
    enum: ['online', 'offline'],
  },
  bio: String,
  avatar: String,
});

// Compile model from schema
const Users = mongoose.model('Users', UsersSchema);

// export { Users };
module.exports = Users;
