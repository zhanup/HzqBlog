import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

export interface AxiosResponseData {
  status: number
  data?: any
  msg?: string
}

const http: AxiosInstance | any = axios.create({
  baseURL: 'http://localhost:3002/api',
  // 超时时间
  timeout: 50000
})

// 请求拦截
http.interceptors.request.use((config: AxiosRequestConfig) => {
  return config
})

// 响应拦截
http.interceptors.response.use(
  (res: AxiosResponse<AxiosResponseData>) => {
    if (res.status === 200) {
      const data: AxiosResponseData = res.data
      if (data.status === 1) {
        return data.data
      } else {
        ElMessage.error(data.msg || 'Error')
      }
    } else {
      ElMessage.error('网络错误')
      return Promise.reject(new Error(res.data.msg || 'Error'))
    }
  },
  (error: any) => Promise.reject(error)
)

export default http
