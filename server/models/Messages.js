// Require Mongoose
const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema;

const MessagesSchema = new Schema(
  {
    chatId: {
      type: String,
      minLength: 1,
      maxLength: 4096,
    },
    senderId: String,
    senderName: String,
    message: String,
  },
  { timestamps: true }
);

// Compile model from schema
const Messages = mongoose.model('Messages', MessagesSchema);

// export { Messages };
module.exports = Messages;
