import { request } from '@/utils/request'
import { Article, ResponseData } from '@/types'

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

// 获取文章详情
export const getArticleDetail = (id: string) => {
  return request<Article>({ url: `/article/detail?id=${id}` })
}
