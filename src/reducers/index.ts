import { combineReducers } from 'redux'
import search from './search'
import result from './result'

export default combineReducers({
  search,
  result,
})