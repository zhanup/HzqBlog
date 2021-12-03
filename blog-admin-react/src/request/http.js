import axios from 'axios'
import { message } from 'antd'
import storageUtils from '../utils/storageUtils'

const http = axios.create({
  baseURL: 'http://localhost:3002/manage',
  timeout: 5000
})

// 请求拦截
http.interceptors.request.use((config) => {
  const user = storageUtils.getUser()
  config.headers.Authorization = user.token
  return config
})

// 响应拦截
http.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.status === 1) {
      return response.data
    } else {
      message.error(res.msg || 'Error')
      return Promise.reject(res.msg || 'Error')
    }
  },
  (error) => {
    if (error.response) {
      const res = error.response
      if (res.status === 401) {
        message.error(res.data.message)
      } else {
        message.error(res.statusText)
      }
    } else {
      message.error('服务器错误')
    }
  }
)

export default http
