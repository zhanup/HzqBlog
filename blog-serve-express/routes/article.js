const Article = require('../models/article')
const Comment = require('../models/comment')
const { BASE_URL } = require('../utils/constant')
const { formatArchive } = require('../utils/utils')

// 新建文章
exports.addArticle = (req, res, next) => {
  const { title, img_url, desc, content, origin, visible, tags, category } = req.body
  const article  = { title, img_url, desc, content, origin, visible, tags, category }

  if (title === '留言板') return res.send({status: 0, msg: '标题不能为留言板'})
  Article.create(article, (err) => {
    if (err) return next(err)
    res.send({ status: 1,  msg: '创建成功' })
  })
}

// 更新文章
exports.updateArticle = (req, res, next) => {
  const { id, title, img_url, desc, content, tags, category, origin, visible } = req.body
  let update = { visible }

  if (visible === undefined) {
    update = { title, img_url, desc, content, tags, category, origin }
  }
  if (title === '留言板') return res.send({status: 0, msg: '标题不能为留言板'})

  Article.findByIdAndUpdate(id, update, (err) => {
    if (err) return next(err)
    res.send({ status: 1, msg: '修改成功' })
  })
}

// 删除文章
exports.deleteArticle = (req, res, next) => {
  const { id } = req.body

  Article.findByIdAndDelete(id, (err) => {
    if (err) return next(err)
    res.send({ status: 1, msg: '删除成功' })
  })
}

// 后台文章列表（不公开的文章也返回）
exports.articleManageList = (req, res, next) => {
  let { pageSize, pageNum } = req.query
  let filter = {}
  let projection = {title: 1 }
  let options = {sort: { date: -1 }}

  if (pageNum || pageSize) {
    pageSize = (pageSize * 1) || 5
    pageNum = (pageNum * 1) || 1
    filter = {title: {$ne: '留言板'}}
    projection = {}
    options = {limit: pageSize, skip: pageSize * (pageNum - 1), sort: { date: -1 }}
  }

  Article.countDocuments((err, count) => {
    if (err) return next(err)

    Article.find( filter, projection, options).populate([{ path: 'category' }, { path: 'tags' }]).exec((err, doc) => {if (err) return next(err)
      if (err) return next(err)
      res.send({
        status: 1,
        data: { list: doc, total: count }
      })
    })
  })
}

// 后台文章搜索 （通过标题搜索，搜索全部文章）
exports.articleManageSearch = (req, res, next) => {
  const { title } = req.query

  Article.find({ title: new RegExp(title) }).populate([{path: 'tags'}, {path: 'category'}]).exec((err, doc) => {
    if (err) return next(err)

    res.send({
      status: 1,
      data: { list: doc }
    })
  })
}

// 后台文章详情
exports.articleManageDetail = (req, res, next) => {
  const { id } = req.query

  Article.findById(id, (err, doc) => {
    if (err) return next(err)
    res.send({ status: 1, data: doc })
  })
}

// 前台文章列表（不会返回不公开的文章）
exports.articleApiList = (req, res, next) => {
  // 如果接收到 pageSize || pageNum 参数则为查询文章列表，否则则为查询归档
  const pageNum = req.query.pageNum * 1 || 1
  const pageSize = req.query.pageSize * 1 || 10

  // 查询文档的长度
  Article.countDocuments({}, (err, count) => {
    if (err) return next(err)

    // limit一次查询总数  skip跳过多少条数据  sort对查询结果排序
    Article.find({ visible: true }).sort({views: -1}).skip((pageNum-1) * pageSize).limit(pageSize).populate([{ path: 'category' }, { path: 'tags' }]).exec((err, doc) => {
        if (err) return next(err)
        res.send({
          status: 1,
          data: { list: doc, total: count }
        })
      })
  })
}

// 归档文章
exports.ArchiveList = (req, res, next) => {
  Article.find({visible: true, title: {$ne: '留言板'}}, {title: 1, date: 1}).sort({date: -1}).exec((err, doc) => {
    if (err) return next(err)
    res.send({
      status: 1,
      data: formatArchive(doc),
      total: doc.length
    })
  })
}

// 前台文章详情 （views 浏览量增加）
exports.articleApiDetail = (req, res, next) => {
  const { id } = req.query

  Article.findById(id, (err, data) => {
    if (err) return next(err)
    // 浏览量 +1
    data.views = data.views + 1

    // 查询并更新
    Article.findByIdAndUpdate(id, { views: data.views  }).populate([{ path: 'tags' }, { path: 'category' }]).exec((err, doc) => {
      if (err) return next(err)
      // 返回更新后的文章
      res.send({ status: 1, data: doc })
    })
  })
}

// 前台文章搜索 （通过标题搜索，只会搜索到公开的文章）
exports.articleApiSearch = (req, res, next) => {
  const { title } = req.query
  const filter = { title: new RegExp(title), visible: true }

  Article.find(filter, { title: 1 }, null,(err, doc) => {
    if (err) return next(err)
    res.send({status: 1,  data: { list: doc }})
  })
}


// 留言列表
exports.contactList = (req, res, next) => {
  const pageNum = req.query.pageNum * 1 || 1
  const pageSize = req.query.pageSize * 1 || 10

  Article.findOne({title: '留言板'}, (err, data) => {
    if (err) return next(err)

    Comment.find({article_id: data._id}).sort({date: -1}).populate('replies').exec((err, doc) => {
      if (err) return next(err)
      res.send({
        status: 1,
        data: {
          list: doc.slice((pageNum-1) * pageSize, pageNum * pageSize),
          total: doc.length,
          aid: data._id
        }
      })
    })
  })
}
