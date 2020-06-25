import { createReducer } from 'redux-immutablejs'
import { fromJS } from 'immutable'

import { SET_LOADING } from '../constants/page'

export default createReducer(fromJS({
  loading: false,
}), {
  [SET_LOADING]: (state: any, action: any) => {
    return state.merge({ loading: action.loading })
  }
})