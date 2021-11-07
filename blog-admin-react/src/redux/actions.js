import { RECEIVE_USER, RESET_USER } from './action-types'
import { reqLogin } from '../request'
import storageUtils from '../utils/storageUtils'
import { message } from 'antd'

// 接收用户的同步action
export const receiveUser = (user) => ({type: RECEIVE_USER, user})

// 退出登录的同步action
export const logout = () => {
  // 删除local中的user
  storageUtils.removeUser()
  return {type: RESET_USER}
}

// 登录的异步action
export const login = (name, password) => {
  return async (dispacth) => {
    const result = await reqLogin(name, password)
    if (result.status === 1) {
      const user = result.data
      storageUtils.saveUser(user)
      dispacth(receiveUser(user))
      message.success(result.msg)
    } else {
      message.error(result.msg)
    }
  }
}