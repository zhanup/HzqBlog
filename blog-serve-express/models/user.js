const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  // 昵称
  name: {
    type: String,
    required: true
  },
  // 邮箱
  email: {
    type: String,
    required: true
  },
  // 密码
  password: {
    type: String,
    required: true
  },
  // 账号类型
  type: {
    // 0: 管理员 1: 游客
    type: Number,
    default: 1
  },
  // 头像地址
  avatar: {
    type: String,
    default: ''
  },
  // 创建时间
  date: {
    type: Date,
    default: Date.now
  }
});

const UserSchema = mongoose.model('User', userSchema)

module.exports = UserSchema