const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  // 文字id
  type: {
    type: String,
    default: 'comment'
  },
  article_id: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true 
  },
  // 名字
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
   // 内容
  content: {
    type: String,
    required: true
  },
  // 头像
  avatar: {
    type: String,
    default: ''
  },
  visible: {
    type: Boolean,
    default: true
  },
  ua: {
    type: String,
    default: ''
  },
  // 时间
  date: {
    type: Date,
    default: Date.now
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reply'
    }
  ]
})

const CommentSchema = mongoose.model('Comment', commentSchema)

module.exports = CommentSchema