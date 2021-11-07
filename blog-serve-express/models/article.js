const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  // 标题
  title: {
    type: String,
    required: true
  },
  // 描述
  desc: {
    type: String,
    default: ''
  },
  // 内容
  content: {
    type: String,
    default: ''
  },
  img_url: {
    type: String,
    default: ''
  },
  // 是否可见
  visible: {
    type: Boolean,
    default: true
  },
  // 0 原创，1 转载
  origin: {
    type: Number,
    default: 0
  },
  // 评论列表
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  // 标签列表
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tag'
    }
  ],
  // 分类
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  views: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const ArticleSchema = mongoose.model('Article', articleSchema)

// 创建留言板
ArticleSchema.findOne({title: '留言板'}, (err, data) => {
  if (err) return console.log(err)

  if (!data) {
    ArticleSchema.create({title: '留言板', visible: false}, (err) => {
      err && console.log(err)
    })
  }
})

module.exports = ArticleSchema