import { observable, action } from 'mobx'

class SearchStore {
  @observable text = ''

  @action.bound
  setText(newValue: string) {
    this.text = newValue
  }

  @action.bound
  reset() {
    this.setText('')
  }
}

export default new SearchStore()