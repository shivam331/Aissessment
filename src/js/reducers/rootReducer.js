import { combineReducers } from 'redux'
import questionReducer from './questionReducer'
import headerReducer from './headerReducer'
import {loginReducer} from './loginReducer'
import {BookListReducer} from './BookListReducer'
import {blacklistDistractorsReducer} from './DistractorReducer'

export default combineReducers({
  question : questionReducer,
  header : headerReducer,
  login : loginReducer,
  booklist : BookListReducer,
  blacklistDistractor : blacklistDistractorsReducer
})
