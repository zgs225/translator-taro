import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

import { SET_YOUDAO_RESULT } from '../constants/result'

export default createReducer(fromJS({
  errorCode: '',
  l: '',
  query: '',
  translate: [],
  web: [],
  basic: {
    explains: [],
    phonetic: '',
  }
}), {
  [SET_YOUDAO_RESULT]: (state: any, action: any) => {
    return state.merge(action.result)
  }
})