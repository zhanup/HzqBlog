const Article = require('../models/article')
const Comment = require('../models/comment')
const Reply = require('../models/reply')
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

// 修改回复（后台）
exports.updateReply = (req, res, next) => {
  const { id, visible, name, email, avatar, content } = req.body
  let update = { visible }

  if (visible === undefined) {
    update = { name, email, avatar, content }
  }

  Reply.findByIdAndUpdate(id, update, (err) => {
    if (err) return next(err)
    res.send({ status: 1, msg: '修改成功' })
  })
}

// 删除评论（后台）
exports.deleteComment = (req, res, next) => {
  const { id } = req.body

  Comment.findByIdAndDelete(id, (err, doc) => {
    if (err) return next(err)

    // 删除评论，同时将文章保存的对应的ID删除
    Article.updateOne({comments: {$in: doc._id}}, {$pull: {comments: doc._id}}, (err) => {
      if (err) return next(err)
      res.send({ status: 1, msg: '删除成功' })
    })
  })
}

// 删除回复（后台）
exports.deleteReply = (req, res, next) => {
  const { id } = req.body

  Reply.findByIdAndDelete(id, (err, data) => {
    if (err) return next(err)

    Comment.updateOne({replies: {$in: data._id}}, {$pull: {replies: data._id}}, (err) => {
      if (err) return next(err)
      res.send({status: 1, msg: '删除成功'})
    })
  })
}

// 评论列表
exports.commentList = (req, res, next) => {
  const pageNum = (req.query.pageNum * 1) || 1
  const pageSize = (req.query.pageSize * 1) || 10
  const article_id = req.query.article_id

  // 如图存在article_id，返回改文章评论
  if (article_id) {
    Article.findById(article_id).populate({path: 'comments', populate: { path: 'replies' }}).exec((err, doc) => {
      if (err) return next(err)

      // 评论按日期排序
      let data = doc.comments.sort((a, b) => b.date - a.date)
      // 合并评论和回复
      let result = data.reduce((total, item) => {
        const { _id, type, article_id, name, email, content, visible, ua, avatar, date } = item
        const comment = { _id, type, article_id, name, email, content, visible,  ua, avatar, date }
        const replies = item.replies
        total = [...total, comment, ...replies]
        return total
      }, [])

      // 分页
      const list = result.slice((pageNum - 1) * pageSize, pageNum * pageSize)
      res.send({ 
        status: 1, 
        data: {list, total: doc.comments.length}
      });
    })
  } else {
    // 不存在article_id，则返回全部评论
    Comment.countDocuments((err, count) => {
      if (err) return next(err)
  
      Comment.find().limit(pageSize).skip(pageSize * (pageNum - 1)).sort({ date: -1 }).populate('replies').exec((err, doc) => {
        if (err) return next(err)

        // 合并评论和回复
        const data = doc.reduce((total, item) => {
          const { _id, type, article_id, name, email, content, ua, visible, avatar, date } = item
          const comment = { _id, type, article_id, name, email, content, ua, visible, avatar, date }
          const replies = item.replies
          total = [...total, comment, ...replies]
          return total
        }, [])

        res.send({
          status: 1,
          data: {list: data, total: count}
        })
      })
    })
  }
}

// 新建评论（前台）
exports.addComment = (req, res, next) => {
  const { article_id, name, email, content } = req.body
  const ua = req.headers['user-agent']
  const avatar = getAvatar(email)

  // 创建新评论
  Comment.create({ article_id, name, email, content, avatar, ua }, (err, data) => {
    if (err) return next(err)

    // 同时在对应文章 插入评论id
    Article.findByIdAndUpdate(article_id, { $push: { comments: data._id } }, (err) => {
      if (err) return next(err)

      res.send({ status: 1, msg: '评论成功' })
    })
  })
}

// 回复评论（前台）
exports.ApiAddReply = (req, res, next) => {
  const { comment_id, to_whom, name, email, content } = req.body
  const ua = req.headers['user-agent']
  const avatar = getAvatar(email)

  Reply.create({comment_id, to_whom, avatar, name, ua, email, content}, (err, data) => {
    if (err) return next(err)

    Comment.findByIdAndUpdate(comment_id, { $push: { replies:  data._id } }, (err) => {
      if (err) return next(err)

      res.send({ status: 1, msg: '回复成功' })
    })
  })

}

// 评论列表（前台）
exports.commentApiList = (req, res, next) => {
  const pageNum = (req.query.pageNum * 1) || 1
  const pageSize = (req.query.pageSize * 1) || 10
  const { article_id } = req.query

  Article.findById(article_id).populate({path: 'comments', match: {visible: true}, populate: {path: 'replies', match: {visible: true}}}).exec((err, doc) => {
    if (err) return next(err)

    const data = doc.comments.sort((a, b) => b.date - a.date)
    const list = data.slice((pageNum - 1) * pageSize, pageNum * pageSize)

    res.send({status: 1, data: {list, total: data.length}})
  })
}
