import axios from 'axios'
import storageUtils from '../utils/storageUtils'

// axios.defaults.baseURL = 'http://localhost:3002'

// 请求拦截
axios.interceptors.request.use(config => {
  const user = storageUtils.getUser()
  config.headers['Authorization'] = user.token
  return config
})

// 响应拦截
axios.interceptors.response.use(response => {
  return response.data
})

// 登录
export const reqLogin = (name, password) => axios({url: '/login', data: {name, password}, method: 'POST'})

// 文章列表
export const reqArticleList = (pageNum, pageSize) => axios({url: '/manage/article/list', params: { pageNum, pageSize }})

// 文章详情
export const reqArticleDetail = (id) => axios({url: '/manage/article/detail', params: { id }})

// 新建文章
export const reqAddArticle = ({title, img_url, desc, content, origin, visible, tags, category}) => axios({ url: '/manage/article/add', data: { title, img_url, desc, content, origin, visible, tags, category }, method: 'POST'})

// 删除文章
export const reqDeleteArticle = (id) => axios({url: '/manage/article/delete', data: { id }, method: "POST"})

// 更新文章
export const reqUpdateArticle = ({id, title, img_url, desc, content, tags, category, origin, visible}) => axios({ url: '/manage/article/update', data: { id, title, img_url, desc, content, tags, category, origin, visible }, method: 'POST'})

// 搜索文章
export const reqSearchArticle = (title) => axios({url: '/manage/article/search', params: { title }})

// 标签列表
export const reqTagList = (pageNum, pageSize) => axios({url: '/manage/tag/list',  params: { pageNum, pageSize }})

// 新建标签
export const reqAddTag = (name) => axios({url: '/manage/tag/add', data: { name }, method: 'POST'})

// 删除标签
export const reqDeleteTag = (id) => axios({url: '/manage/tag/delete', data: { id }, method: 'POST'})

// 更新标签
export const reqUpdateTag = (id, name) => axios({ url: '/manage/tag/update', data: {id, name }, method: 'POST'})

// 分类列表
export const reqCategoryList = (pageNum, pageSize) => axios({url: '/manage/category/list', params: { pageNum, pageSize }})

// 新建分类
export const reqAddCategory = (name) => axios({url: '/manage/category/add', data: { name }, method: 'POST'})

// 删除分类
export const reqDeleteCategory = (id) => axios({url: '/manage/category/delete', data: { id }, method: 'POST'})

// 更新分类
export const reqUpdateCategory = (id, name) => axios({url: '/manage/category/update', data: { id, name }, method: 'POST'})

// 友链列表
export const reqLinkList = (pageNum, pageSize) => axios({url: '/manage/link/list', params: { pageNum, pageSize }})

// 新建友链
export const reqAddLink = ({name, url, icon, desc}) => axios({url: '/manage/link/add', data: { name, url, icon, desc }, method: 'POST'})

// 删除友链
export const reqDeleteLink = (id) => axios({url: '/manage/link/delete', data: { id }, method: 'POST'})

// 更新友链
export const reqUpdateLink = ({ id, name, url, icon, desc }) => axios({url: '/manage/link/update', data: { id, name, url, icon, desc }, method: 'POST'})

// 评论列表
export const reqCommentList = ({article_id, pageNum, pageSize}) => axios({url: '/manage/comment/list', params: { article_id, pageNum, pageSize }})

// 修改评论
export const reqUpdateComment = ({id, visible, name, email, avatar, content}) => axios({url: '/manage/comment/update', data: { id, visible, name, email, avatar, content }, method: 'POST'})

// 修改回复
export const reqUpdateReply = ({id, visible, name, email, avatar, content}) => axios({url: '/manage/reply/update', data: { id, visible, name, email, avatar, content }, method: 'POST'})

// 删除评论
export const reqDeleteComment = (id) => axios({url: '/manage/comment/delete', data: { id }, method: 'POST'})

// 删除回复
export const reqDeleteReply = (id) => axios({url: '/manage/reply/delete', data: { id }, method: 'POST'})

// 图片列表
export const reqImgList = () => axios({url: '/manage/img/list'})

// 删除图片
export const reqDeleteImg = (name) => axios({url: '/manage/img/delete', data: { name }, method: 'POST'})
