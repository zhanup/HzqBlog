import { createStore, applyMiddleware } from 'redux'
// 处理异步 action
import thunk from 'redux-thunk'
// redux开发工具
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducer'

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
