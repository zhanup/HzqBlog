import axios from 'axios'
import storageUtils from '../utils/storageUtils'

axios.defaults.baseURL = 'http://localhost:3002/manage'

// 请求拦截
axios.interceptors.request.use(config => {
  const user = storageUtils.getUser()
  config.headers.Authorization = user.token
  return config
})

// 响应拦截
axios.interceptors.response.use(response => {
  return response.data
})

// 登录
export const reqLogin = (name, password) => axios({ url: '/user/login', data: { name, password }, method: 'POST' })

// 注册
export const reqAddUser = ({ name, email, type, password }) => axios({ url: '/user/register', data: { name, email, type, password }, method: 'POST' })

// 文章列表
export const reqArticleList = (pageNum, pageSize) => axios({ url: '/article/list', params: { pageNum, pageSize } })

// 文章详情
export const reqArticleDetail = (id) => axios({ url: '/article/detail', params: { id } })

// 新建文章
// eslint-disable-next-line
export const reqAddArticle = ({ title, img_url, desc, content, origin, visible, tags, category }) => axios({ url: '/article/add', data: { title, img_url, desc, content, origin, visible, tags, category }, method: 'POST' })

// 删除文章
export const reqDeleteArticle = (id) => axios({ url: '/article/delete', data: { id }, method: 'POST' })

// 更新文章
// eslint-disable-next-line
export const reqUpdateArticle = ({ id, title, img_url, desc, content, tags, category, origin, visible }) => axios({ url: '/article/update', data: { id, title, img_url, desc, content, tags, category, origin, visible }, method: 'POST' })

// 搜索文章
export const reqSearchArticle = (title) => axios({ url: '/article/search', params: { title } })

// 下载文章
export const reqDownloadhArticle = () => axios({ url: '/article/download' })

// 标签列表
export const reqTagList = (pageNum, pageSize) => axios({ url: '/tag/list', params: { pageNum, pageSize } })

// 新建标签
export const reqAddTag = (name) => axios({ url: '/tag/add', data: { name }, method: 'POST' })

// 删除标签
export const reqDeleteTag = (id) => axios({ url: '/tag/delete', data: { id }, method: 'POST' })

// 更新标签
export const reqUpdateTag = (id, name) => axios({ url: '/tag/update', data: { id, name }, method: 'POST' })

// 分类列表
export const reqCategoryList = (pageNum, pageSize) => axios({ url: '/category/list', params: { pageNum, pageSize } })

// 新建分类
export const reqAddCategory = (name) => axios({ url: '/category/add', data: { name }, method: 'POST' })

// 删除分类
export const reqDeleteCategory = (id) => axios({ url: '/category/delete', data: { id }, method: 'POST' })

// 更新分类
export const reqUpdateCategory = (id, name) => axios({ url: '/category/update', data: { id, name }, method: 'POST' })

// 友链列表
export const reqLinkList = (pageNum, pageSize) => axios({ url: '/link/list', params: { pageNum, pageSize } })

// 新建友链
export const reqAddLink = ({ name, url, icon, desc }) => axios({ url: '/link/add', data: { name, url, icon, desc }, method: 'POST' })

// 删除友链
export const reqDeleteLink = (id) => axios({ url: '/link/delete', data: { id }, method: 'POST' })

// 更新友链
export const reqUpdateLink = ({ id, name, url, icon, desc }) => axios({ url: '/link/update', data: { id, name, url, icon, desc }, method: 'POST' })

// 评论列表
export const reqCommentList = ({ aid, pageNum, pageSize }) => axios({ url: '/comment/list', params: { aid, pageNum, pageSize } })

// 修改评论
export const reqUpdateComment = ({ id, visible, name, email, avatar, content }) => axios({ url: '/comment/update', data: { id, visible, name, email, avatar, content }, method: 'POST' })

// 删除评论
export const reqDeleteComment = (id) => axios({ url: '/comment/delete', data: { id }, method: 'POST' })

// 图片列表
export const reqImgList = () => axios({ url: '/img/list' })

// 删除图片
export const reqDeleteImg = (name) => axios({ url: '/img/delete', data: { name }, method: 'POST' })

// 用户列表
export const reqUserList = (pageNum, pageSize) => axios({ url: '/user/list', params: { pageNum, pageSize } })

// 删除用户
export const reqDeleteUser = (id) => axios({ url: '/user/delete', data: { id }, method: 'POST' })

// 更新用户
export const reqUpdateUser = ({ id, name, email, type, avatar }) => axios({ url: '/user/update', data: { id, name, email, type, avatar }, method: 'POST' })
