const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  // 评论的文章
  aid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  cid: {
    type: mongoose.Schema.Types.ObjectId
  },
  to_whom: {
    type: String,
    default: ''
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
  // 回复列表
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  // 时间
  date: {
    type: Date,
    default: Date.now
  }
})

const CommentSchema = mongoose.model('Comment', commentSchema)

module.exports = CommentSchema