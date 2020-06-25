import { combineReducers } from 'redux'
import search from './search'
import result from './result'
import page from './page'

export default combineReducers({
  search,
  result,
  page,
})