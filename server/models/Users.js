// Require Mongoose
const mongoose = require("mongoose");

// Define schema
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  id: Number,
  username: String,
});

// Compile model from schema
const Users = mongoose.model("Users", UsersSchema);

// export { Users };
module.exports = Users;