const User = require("../models/user");
const { md5, getToken } = require("../utils/utils");
const { getAvatar } =  require('../utils/utils')

// 注册
exports.register = (req, res, next) => {
  const { name, email, password } = req.body;
  const type = req.body.type || 1
  const avatar = getAvatar(email)

  User.findOne({ name }, (err) => {
    if (err) return next(err)

    User.create({name, email, avatar, type, password: md5(password)}, (err) => {
      if (err) return next(err)
      res.send({status: 1, msg: '注册成功'})
    })

  })
}

// 登录
exports.login = (req, res, next) => {
  const { name, password } = req.body;

  User.findOne({ name }, (err, doc) => {
    if (err) return next(err)

    if (!doc) return res.send({status: 0, msg: '用户不存在'})

    if (doc.password === md5(password)) {
      const { _id, name, email, avatar } = doc
      const token = getToken(doc.type, doc.name)
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
  const { id, name, password } = req.body;

  User.findByIdAndUpdate(id, {name, password: md5(password)}, (err) => {
    if (err) return next(err)
    res.send({ status: 1, msg: '修改成功' });
  })
}

// 用户列表
exports.userList = (req, res, next) => {
  User.find({}, (err, doc) => {
    if (err) return next(err)

    res.send({
      status: 1,
      data: { list: doc }
    })
  })
}
