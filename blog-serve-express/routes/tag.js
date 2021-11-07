const Tag = require('../models/tag')
const Article = require('../models/article')

// 添加标签
exports.addTag = (req, res, next) => {
  const { name } = req.body

  Tag.create({ name }, (err) => {
    if (err) return next(err)
    res.send({ status: 1, msg: '添加成功' })
  })
}

// 修改标签
exports.updateTag = (req, res, next) => {
  const { id, name } = req.body

  Tag.findByIdAndUpdate(id, { name }, (err) => {
    if (err) return next(err)
    res.send({ status: 1, msg: '修改成功' })
  })
}

// 删除标签
exports.deleteTag = (req, res, next) => {
  const { id } = req.body

  Tag.findByIdAndDelete(id, (err, data) => {
    if (err) return next(err)

    Article.updateMany({tags: data._id}, {$pull: {tags: data._id}}, (err) => {
      if (err) return next(err)
      res.send({ status: 1, msg: '删除成功' })
    })
  })
}

// 标签列表
exports.tagList = (req, res, next) => {
  const pageNum = (req.query.pageNum * 1) || 1
  const pageSize = (req.query.pageSize * 1) || 10
  const options = { limit: pageSize, skip: pageSize * (pageNum - 1) }

  Tag.countDocuments((err, count) => {
    if (err) return next(err)

    Tag.find({}, null, options, (err, doc) => {
      if (err) return next(err)
      res.send({
        status: 1,
        data: { list: doc, total: count }
      })
    })
  })
}

exports.ApiTagList = (req, res, next) => {
  Tag.find({}, (err, doc) => {
    if (err) return next(err)
    res.send({status: 1, data:{ list: doc }})
  })
}

// 标签名查找文章
exports.findArticleByTag = (req, res, next) => {
  const pageNum = req.query.pageNum * 1 || 1
  const pageSize = req.query.pageSize * 1 || 10
  const { name } = req.query

  Tag.findOne({name}, (err, data) => {
    if (err) return next(err)
    if (!data) return res.send({status: 0, msg: '标签不存在'})

    Article.find({tags: data._id}).populate([{path: 'tags'}, {path: 'category'}]).sort({date: -1}).exec((err, doc) => {
      if (err) return next(err)
      res.send({status: 1, data: {list: doc}})
    })
  })
}