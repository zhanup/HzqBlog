import http from './http';

// 获取首页文章列表
export const getHomeArticles = (pageNum: number, pageSize: number) => {
  return http({
    url: '/article/list',
    params: {
      pageNum,
      pageSize
    }
  })
}

// 通过标签获取文章
export const getTagArticles = (name: string | any, pageNum: number, pageSize: number) => {
  return http({
    url: '/tag/article',
    params: {
      name,
      pageNum,
      pageSize
    }
  })
}

// 获取评论列表
export const getCommentList = (article_id: string, pageNum: number, pageSize: number) => {
  return http({
    url: '/comment/list',
    params: { 
      article_id,
      pageNum,
      pageSize     
    }
  })
}