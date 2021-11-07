const mongoose = require('mongoose')

const linkSchema = new mongoose.Schema({
  // 名字
  name: {
    type: String,
    required: true
  },
  // 描述
  desc: {
    type: String,
    default: ''
  },
  // 连接
  url: {
    type: String,
    required: true
  },
  // 网站图标
  icon: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const LinkSchema = mongoose.model('Link', linkSchema)

module.exports = LinkSchema