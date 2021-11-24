const express = require('express')
const router = express.Router()
const user = require('./user')
const link = require('./link')
const tag = require('./tag')
const category = require('./category')
const article = require('./article')
const comment = require('./comment')
const gallery = require('./upload')

// 用户
router.post('/manage/user/register', user.register)
router.post('/manage/user/login', user.login)
router.post('/manage/user/update', user.updateUser)
router.post('/manage/user/delete', user.deleteUser)
router.get('/manage/user/list', user.userList)

// 友链
router.post('/manage/link/add', link.addLink)
router.post('/manage/link/update', link.updateLink)
router.post('/manage/link/delete', link.deleteLink)
router.get('/manage/link/list', link.linkList)
router.get('/api/link/list', link.linkApiList)

// 标签
router.post('/manage/tag/add', tag.addTag)
router.post('/manage/tag/update', tag.updateTag)
router.post('/manage/tag/delete', tag.deleteTag)
router.get('/manage/tag/list', tag.tagList)
router.get('/api/tag/list', tag.ApiTagList)
router.get('/api/tag/article', tag.findArticleByTag)

// 分类
router.post('/manage/category/add', category.addCategory)
router.post('/manage/category/update', category.updateCategory)
router.post('/manage/category/delete', category.deleteCategory)
router.get('/manage/category/list', category.CategoryList)
router.get('/api/category/list', category.ApiCategoryList)
router.get('/api/category/article', category.findArticleByCategory)

// 文章
router.post('/manage/article/add', article.addArticle)
router.post('/manage/article/update', article.updateArticle)
router.post('/manage/article/delete', article.deleteArticle)
router.get('/manage/article/list', article.articleManageList)
router.get('/manage/article/search', article.articleManageSearch)
router.get('/manage/article/detail', article.articleManageDetail)
router.get('/manage/article/download', article.articleDownload)
router.get('/api/article/list', article.articleApiList)
router.get('/api/article/detail', article.articleApiDetail)
router.get('/api/article/search', article.articleApiSearch)
router.get('/api/article/archive', article.ArchiveList)

// 留言板
router.get('/api/contact/list', article.contactList)

// 留言
router.post('/manage/comment/update', comment.updateComment)
router.post('/manage/comment/delete', comment.deleteComment)
router.get('/manage/comment/list', comment.commentList)
router.post('/api/comment/add', comment.addComment)
router.get('/api/comment/list', comment.commentApiList)

// 图片
router.post('/manage/img/upload', gallery.imgUpload)
router.post('/manage/img/delete', gallery.deleteImg)
router.get('/manage/img/list', gallery.imgList)

module.exports = router