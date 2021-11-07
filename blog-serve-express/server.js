const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jwtAuth = require('./utils/auth')
const router = require('./routes')
const { handleError } = require('./utils/utils')
const app = express()

// 连接数据库
mongoose.connect('mongodb://localhost/vblog')

// 跨域配置
app.use(cors())

// 处理POST请求参数
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 自定义中间件，验证token
app.use(jwtAuth)

// 处理静态资源
app.use(express.static(__dirname + '/public'))

// 使用路由中间件
app.use(router)

// 统一处理错误
app.use((err, req, res, next) => {
    handleError(err, res)
})

app.listen(3002, () => {
    console.log('App running at: http://localhost:3002/');
})

