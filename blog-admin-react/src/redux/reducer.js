import { combineReducers } from 'redux'
import storageUtils from '../utils/storageUtils'
import { RECEIVE_USER, RESET_USER } from './action-types'

const initUser = storageUtils.getUser()

function user(state = initUser, action) {
  switch(action.type) {
    case RECEIVE_USER:
      return action.user
    case RESET_USER:
      return {}
    default:
      return state
  }
}

export default combineReducers({ user })