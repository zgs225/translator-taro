import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

import { SETTEXT, RESET } from '../constants/search'

export default createReducer(fromJS({
  text: ''
}), {
  [SETTEXT]: (state: any, action) => {
    return state.merge({
      text: action.text
    })
  },

  [RESET]: (state: any) => {
    return state.merge({
      text: ''
    })
  }
})