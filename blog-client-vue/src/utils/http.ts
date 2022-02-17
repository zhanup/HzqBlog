import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

export interface AxiosResponseData<T = any> {
  status: number
  data: T
  msg: string
}

const http = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
  // 超时时间
  timeout: 50000
})

// 请求拦截
http.interceptors.request.use((config) => {
  return config
})

// 响应拦截
http.interceptors.response.use(
  (response: AxiosResponse<AxiosResponseData>) => {
    const data = response.data as AxiosResponseData
    if (response.status === 200 && data.status === 1) {
      return response
    } else {
      ElMessage.error('网络错误')
      return Promise.reject(new Error(data.msg || 'Error'))
    }
  },
  (error) => {
    ElMessage.error('网络错误')
    return Promise.reject(error)
  }
)

export const request = <T = any>(config: AxiosRequestConfig) => {
  return http.request<AxiosResponseData<T>>(config)
}

export default http