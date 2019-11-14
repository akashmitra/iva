const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const messageSchema = new Schema({
  key: { type: String, required: true, unique: true },
  content: { type: Object, required: true }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;