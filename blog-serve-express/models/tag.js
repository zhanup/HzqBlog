const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
  // 标题
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const TagSchema = mongoose.model('Tag', tagSchema)

module.exports = TagSchema