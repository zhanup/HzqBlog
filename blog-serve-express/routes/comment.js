const Article = require('../models/article')
const Comment = require('../models/comment')
const { getAvatar } = require('../utils/utils')

// 修改评论（后台）
exports.updateComment = (req, res, next) => {
  const { id, visible, name, email, avatar, content } = req.body
  let update = { visible }
  if (visible === undefined) {
    update = { name, email, avatar, content }
  }

  Comment.findByIdAndUpdate(id, update, (err) => {
    if (err) return next(err)
    res.send({ status: 1, msg: '修改成功' })
  })
}

// 删除评论（后台）
exports.deleteComment = (req, res, next) => {
  const { id } = req.body

  Comment.findByIdAndDelete(id, (err, data) => {
    if (err) return next(err)
    
    // cid存在，删除回复
    if (data.cid) {
      Comment.findByIdAndUpdate(data.cid, {$pull: {replies: data._id}}, (err) => {
        if (err) return next(err)
        res.send({status: 1, msg: '删除成功'})
      })
    } else {
      // 否则将文章保存的对应的ID删除
      Article.findByIdAndUpdate(data.aid, {$pull: {comments: data._id}}, (err) => {
        if (err) return next(err)
        res.send({status: 1, msg: '删除成功'})
      })
    }
  })
}

// 评论列表（后台）
exports.commentList = (req, res, next) => {
  const pageNum = req.query.pageNum * 1 || 1
  const pageSize = req.query.pageSize * 1 || 10
  const { aid } = req.query
  const filter = aid ? { aid } : {}

  Comment.find(filter, null, {sort: {date: -1}}, (err, doc) => {
    if (err) return next(err)
    const list = doc.slice((pageNum - 1) * pageSize, pageNum * pageSize)
    res.send({status: 1, data: {list, total: doc.length}})
  })
}

// 新建评论（前台）
exports.addComment = (req, res, next) => {
  const { aid, cid, to_whom, name, email, content } = req.body
  const ua = req.headers['user-agent']
  const avatar = getAvatar(email)

  // 如果cid存在，则是回复
  if (cid) {
    Comment.create({aid, cid, to_whom, name, avatar, email, content, ua}, (err, data) => {
      if (err) return next(err)
      Comment.findByIdAndUpdate(cid, {$push: { replies:  data._id }}, (err) => {
        res.send({ status: 1, msg: '回复成功' })
      })
    })
  } else { //否则则为评论
    Comment.create({ aid, name, email, content, avatar, ua }, (err, data) => {
      if (err) return next(err)

      // 同时在对应文章 插入评论id
      Article.findByIdAndUpdate(aid, { $push: { comments: data._id } }, (err) => {
        if (err) return next(err)

        res.send({ status: 1, msg: '评论成功' })
      })
    })
  }
}

// 评论列表（前台）
exports.commentApiList = (req, res, next) => {
  const pageNum = req.query.pageNum * 1 || 1
  const pageSize = req.query.pageSize * 1 || 10
  const { aid } = req.query

  Article.findById(aid).populate({path: 'comments', match: {visible: true}, populate: {path: 'replies', match: {visible: true}}}).exec((err, doc) => {
    if (err) return next(err)

    const data = doc.comments.sort((a, b) => b.date - a.date)
    const list = data.slice((pageNum - 1) * pageSize, pageNum * pageSize)

    res.send({status: 1, data: {list, total: data.length}})
  })
}
