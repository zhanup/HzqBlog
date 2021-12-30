import axios from 'axios'
import { message } from 'antd'
import storageUtils from '../utils/storageUtils'
import { BASE_URL } from '../utils/constans'

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3002/manage' : 'http://1.15.112.209:5000/manage'
const http = axios.create({
  baseURL,
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
        window.location.href = BASE_URL + '/login'
        storageUtils.removeUser()
      } else {
        message.error(res.statusText)
      }
    } else {
      message.error('服务器错误')
    }
  }
)

export default http
