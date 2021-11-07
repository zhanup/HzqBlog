const jwt = require('jsonwebtoken')
const { BASE_URL, JWT_SECRET }= require('./constant')

const authUrl = [
  /^\/manage\/\w+\/add$/,
  /^\/manage\/\w+\/update$/,
  /^\/manage\/\w+\/delete$/,
  /^\/manage\/\w+\/upload$/
]

const jwtAuth = (req, res, next) => {
  const { pathname } = new URL(req.url, BASE_URL)
  const temp = authUrl.some(val => pathname.search(val) !== -1)
  const token = req.headers.authorization

  // 如果不是这些地址，测跳过检验
  if (!temp) return next()
  // 需要进行检验的请求，如果token不存在 返回401
  if (!token) return res.status(401).send({status: 0, msg: '你还没有登录'})

  jwt.verify(token.slice(7), JWT_SECRET, (err, decoded) => {
    if (err) return next(err)

    const { type = 1 } = decoded
    // 如果type为 0，说明是管理员账号，放行
    if (type === 0) return next()
    res.send({ status: 0, msg: '你的权限不足' })
  })
}

module.exports = jwtAuth