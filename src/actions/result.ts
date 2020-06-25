import { SET_YOUDAO_RESULT } from '../constants/result'

export const setYoudaoResult = (result: any) => {
  return {
    type: SET_YOUDAO_RESULT,
    result,
  }
}