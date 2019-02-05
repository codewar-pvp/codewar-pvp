import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import codeReducer from './codeReducer'
import questionReducer from './questionReducer'
import warReducer from './warReducer'
import chatReducer from './chatReducer'

const reducer = combineReducers({
  user,
  chatReducer,
  codeReducer,
  questionReducer,
  warReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './chatReducer'
export * from './warReducer'
export * from './codeReducer'
export * from './questionReducer'
