const User = require("../models/user");
const { md5, getToken } = require("../utils/utils");
const { getAvatar } =  require('../utils/utils')

// 注册
exports.register = (req, res, next) => {
  const { name, email, password, type } = req.body;
  const avatar = getAvatar(email)

  User.findOne({ name }, (err, data) => {
    if (err) return next(err)
    if (data) return res.send({status: 0, msg: '用户已存在'})

    User.create({name, email, avatar, type, password: md5(password)}, (err) => {
      if (err) return next(err)
      res.send({status: 1, msg: '注册成功'})
    })

  })
}

// 登录
exports.login = (req, res, next) => {
  const { name, password } = req.body;

  User.findOne({ name }, (err, data) => {
    if (err) return next(err)
    if (!data) return res.send({status: 0, msg: '用户不存在'})

    if (data.password === md5(password)) {
      const { _id, name, email, avatar, type } = data
      const token = getToken(type, name)
      res.send({
        status: 1,
        msg: '登录成功',
        data: { _id, name, email, avatar, token }
      });
    } else {
      res.send({ status: 0, msg: '密码错误'});
    }
  })
}

// 删除用户
exports.deleteUser = (req, res, next) => {
  const { id } = req.body;

  User.findByIdAndDelete(id, (err) => {
    if (err) return next(err)
    res.send({ status: 1, msg: '删除成功' });
  });
}

// 修改用户信息
exports.updateUser = (req, res, next) => {
  const { id, name, type, email, avatar } = req.body;

  User.findByIdAndUpdate(id, {name, type, email, avatar}, (err) => {
    if (err) return next(err)
    res.send({ status: 1, msg: '修改成功' });
  })
}

// 用户列表
exports.userList = (req, res, next) => {
  const pageNum = req.body.pageNum * 1 || 1
  const pageSize = req.body.pageSize * 1 || 10

  User.find({}, (err, doc) => {
    if (err) return next(err)

    const list = doc.slice((pageNum - 1) * pageSize, pageNum * pageSize)
    res.send({
      status: 1,
      data: { list, total: doc.length }
    })
  })
}
