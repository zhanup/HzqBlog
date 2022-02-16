import { request } from '@/utils/request'
import { Comments, ResponseData } from '@/types'

interface Info {
  aid: string
  name: string
  email: string
  content: string
  cid?: string
  to_whom?: string
}

// 获取评论列表数据
export const getCommentList = (
  aid: string,
  pageNum: number,
  pageSize: number
) => {
  return request<ResponseData<Comments>>({
    url: '/comment/list',
    params: {
      aid,
      pageNum,
      pageSize
    }
  })
}

// 获取留言区数据
export const getContactComments = (pageNum: number, pageSize: number) => {
  return request<ResponseData<Comments>>({
    url: '/contact/list',
    params: {
      pageNum,
      pageSize
    }
  })
}

// 评论
export const addComment = (data: Info) => {
  return request<ResponseData<Comments>>({
    url: '/comment/add',
    method: 'POST',
    data: data
  })
}
