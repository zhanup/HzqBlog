const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'reply'
  },
  comment_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true 
  },
  blogger: {
    type: Boolean,
    default: false
  },
  to_whom: {
    type: String,
    required: true
  },
  visible: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: ''
  },
  ua: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const ReplySchema = mongoose.model('Reply', replySchema)

module.exports = ReplySchema
