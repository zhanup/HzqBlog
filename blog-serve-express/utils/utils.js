const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const { BASE_URL } = require('./constant')
const { MD5_SUFFIX, JWT_SECRET } = require('../utils/constant')

// md5加密
const md5 = (pwd) => {
  const hash = crypto.createHash('md5')
  return hash.update(pwd + MD5_SUFFIX).digest('hex')
}

// 生成token
const getToken = (type, email) => {
  const payload = { type, email }
  return `Bearer ${jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 * 12 })}`
}

// 生成头像
const getAvatar = (email) => {
  if (/^[1-9][0-9]{4,10}@qq.com$/.test(email)) {
    const num = email.replace('@qq.com', '')
    return `https://q1.qlogo.cn/g?b=qq&nk=${num}&s=100`
  }
  const num = Math.ceil(Math.random() * 8)
  return `${BASE_URL}/avatar/img${num}.jpg`
}


// 格式化归档数据
const formatArchive = (arr) => {
  if (!Array.isArray(arr)) return {}
  const result = {}
  let year = []

  // 获取年份
  const getYear = (date) =>{
    return new Date(date).getFullYear()
  }

  const sort = (obj) => {
    const keys = Object.keys(obj).sort((a, b) => getYear(b) - getYear(a))
    const result = new Map()
    keys.forEach(o => {
      result.set(o, obj[o])
    })
    return result
  }

  arr.forEach((item) => {
    year = [...year, getYear(item.date)]
  })

  year.forEach((i) => {
    result[i] = arr.filter(a => getYear(a.date) === i)
  })

  // console.log()
  return result
}

// 错误处理
const handleError = (err, res) => {
  if (err.message === 'jwt malformed' || err.message === 'jwt must be provided') {
    res.status(401).send({status:0, msg: 'token错误'})
  } else  if (err.message === 'jwt expired') {
    res.status(401).send({status:0, msg: 'token已失效，请重新登录'})
  } else {
    res.status(err.status || 500).send({ status:0, msg: err.message })
  }
}

module.exports = {
  md5,
  getToken,
  getAvatar,
  handleError,
  formatArchive
}