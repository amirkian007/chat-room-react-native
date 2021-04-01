const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  massage: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },

});

module.exports = mongoose.model('Chat', chatSchema);
