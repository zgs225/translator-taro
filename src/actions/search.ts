import { SETTEXT, RESET } from '../constants/search'

export const setText = (text: string) => {
  return { type: SETTEXT, text }
}

export const reset = () => { return { type: RESET } }