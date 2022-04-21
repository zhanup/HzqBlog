import { request } from '@/utils/http'
import { Article, ResponseData, Archives } from '@/types'

// 获取文章列表数据
export const getArticleList = (pageNum: number, pageSize: number) => {
  return request<ResponseData<Article>>({
    url: '/article/list',
    params: {
      pageNum,
      pageSize
    }
  })
}

// 通过标签获取文章
export const getArticlesByTag = (
  name: string,
  pageNum: number,
  pageSize: number
) => {
  return request<ResponseData<Article>>({
    url: '/tag/article',
    params: {
      name,
      pageNum,
      pageSize
    }
  })
}

// 通过标签获取文章
export const getArticleListByCategory = (
  name: string,
  pageNum: number,
  pageSize: number
) => {
  return request<ResponseData<Article>>({
    url: '/category/article',
    params: {
      name,
      pageNum,
      pageSize
    }
  })
}

// 搜索文章
export const searchArticle = (title: string) => {
  return request<ResponseData<Article>>({
    url: '/article/search',
    params: { title }
  })
}

// 获取文章详情
export const getArticleDetail = (id: string) => {
  return request<Article>({ url: `/article/detail?id=${id}` })
}

// 获取文章归档数据
export const getArchives = () => {
  return request<Archives>({url: '/article/archive'})
}
