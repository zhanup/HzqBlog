const Link = require('../models/link')

// 添加友链
exports.addLink = (req, res, next) => {
  const { name, desc, url, icon } = req.body
  
  Link.create({name, desc, url, icon}, (err) => {
    if (err) return next(err)
    res.send({ status: 1, msg: '添加成功' })
  })
}

// 修改友链
exports.updateLink = (req, res, next) => {
  const { id, name, desc, url, icon } = req.body

  Link.findByIdAndUpdate(id, {name, desc, url, icon}, (err) => {
    if (err) return next(err)
    res.send({ status: 1, msg: '修改成功' })
  })
}

// 删除友链
exports.deleteLink = (req, res, next) => {
  const { id } = req.body

  Link.findByIdAndDelete(id, (err) => {
    if (err) return next(err)
    res.send({ status: 1, msg: '删除成功' })
  })
}

// 友链列表（后台）
exports.linkList = (req, res, next) => {
  const pageSize = req.query.pageSize * 1 || 1
  const  pageNum = req.query.pageNum * 1 || 10
  const options = { limit: pageSize, skip: pageSize * (pageNum - 1) }

  Link.countDocuments((err, count) => {
    if (err) return next(err)

    Link.find({}, null, options, (err, doc) => {
      if (err) return next(err)

      res.send({
        status: 1,
        data: { list: doc, total: count }
      })
    })
  })
}

// 友链列表（前台）
exports.linkApiList = (req, res, next) => {
  Link.find({}).sort({date: -1}).exec((err, doc) => {
    if (err) return next(err)
    return res.send({status: 1, data: {list: doc}})
  })
}
