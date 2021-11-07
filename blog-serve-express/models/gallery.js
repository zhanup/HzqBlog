const mongoose = require('mongoose')

const gallerySchema = new mongoose.Schema({
  // 标题
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const GallerySchema = mongoose.model('Gallery', gallerySchema)

module.exports = GallerySchema