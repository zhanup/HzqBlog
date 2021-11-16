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
export const getCommentList = (aid: string, pageNum: number, pageSize: number) => {
  return http({
    url: '/comment/list',
    params: { 
      aid,
      pageNum,
      pageSize     
    }
  })
}