const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    // 标题
    name: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
});

const CategorySchema = mongoose.model('Category', categorySchema)

module.exports = CategorySchema