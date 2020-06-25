import { SET_LOADING } from '../constants/page'

export const setLoading = (loading: boolean) => {
  return {
    type: SET_LOADING,
    loading: loading,
  }
}