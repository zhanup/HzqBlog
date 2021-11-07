const Category = require('../models/category')
const Article = require('../models/article')

// 添加分类
exports.addCategory= (req, res, next) => {
  const { name } = req.body

  Category.create({ name }, (err) => {
    if (err) return next(err)
    res.send({ status: 1, msg: '添加成功' })
  })
}

// 修改分类
exports.updateCategory = (req, res, next) => {
  const { id, name } = req.body

  Category.findByIdAndUpdate(id, { name }, (err) => {
    if (err) return next(err)
    res.send({ status: 1, msg: '修改成功' })
  });
}

// 删除分类
exports.deleteCategory = (req, res, next) => {
  const { id } = req.body

  Category.findByIdAndDelete(id, (err, data) => {
    if (err) return next(err)

    Article.updateMany({category: data._id}, {$unset: {category: ''}}, (err) => {
      if (err) return next(err)
      res.send({ status: 1, msg: '删除成功' })
    })
  })
}

// 分类列表
exports.CategoryList= (req, res, next) => {
  let pageNum = req.query.pageNum * 1
  let pageSize = req.query.pageSize * 10
  let options = {}

  if (pageNum && pageSize) {
    options = { limit: pageSize, skip: pageSize * (pageNum - 1) }
  }

  Category.countDocuments((err, count) => {
    if (err) return next(err)

    Category.find({}, null, options, (err, doc) => {
      if (err) return next(err)
      res.send({
        status: 1,
        data: { list: doc, total: count }
      })
    })
  })
}

exports.ApiCategoryList = (req, res, next) => {
  Category.find({}, (err, doc) => {
    if (err) return next(err)
    res.send({status: 1, data:{ list: doc }})
  })
}

// 分类名查找文章
exports.findArticleByCategory = (req, res, next) => {
  const pageNum = req.query.pageNum * 1 || 1
  const pageSize = req.query.pageSize * 1 || 10
  const { name } = req.query

  Category.findOne({name}, (err, data) => {
    if (err) return next(err)

    let filter = {category: null}
    if (data) filter = {category: data._id}

    Article.find(filter).populate([{path: 'tags'}, {path: 'category'}]).sort({date: -1}).exec((err, doc) => {
      if (err) return next(err)
      res.send({status: 1, data: {list: doc}})
    })
  })
}