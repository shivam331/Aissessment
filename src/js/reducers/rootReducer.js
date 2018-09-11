import { combineReducers } from 'redux'
import questionReducer from './questionReducer'
import headerReducer from './headerReducer'

export default combineReducers({
  question : questionReducer,
  header : headerReducer
})
