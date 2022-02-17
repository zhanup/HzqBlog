const multer = require('multer')
const path = require('path')
const fs = require('fs')
const Gallery = require('../models/gallery')
const { BASE_URL } = require('../utils/constant')

const dirPath = path.join(__dirname, '../public/upload')

const storage = multer.diskStorage({
  // 存储路径
  destination: function (req, file, cb) {
    cb(null, dirPath)
  },
  // 存储文件名
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
})

// 运用存储器
const upload = multer({ storage: storage })
const uploadSingle = upload.single('image')

// 上传图片
exports.imgUpload = (req, res, next) => {
  uploadSingle(req, res, function (err) { //错误处理
    if (err) return next(err)

    const file = req.file
    const url = `${BASE_URL}/upload/${file.filename}`
    // 地址保存到数据库
    Gallery.create({name: file.filename, url }, (err, doc) => {
      if (err) return next(err)
      const { name, url } = doc

      res.send({
        status: 1,
        msg: '上传成功',
        data: { name, url }
      })
    })
  })
}

// 删除图片
exports.deleteImg = (req, res, next) => {
  const { name } = req.body

  fs.unlink(path.join(dirPath, name), (err) => {
    if (err) next(err)

    Gallery.deleteOne({ name }, (err) => {
      if (err) next(err)
      res.send({status: 1, msg: '删除成功'})
    })
  })
}

// 图片列表
exports.imgList = (req, res, next) => {
  Gallery.find({}, (err, doc) => {
    if (err) return next(err)
    res.send({ status: 1, data: { list: doc }})
  })
}
