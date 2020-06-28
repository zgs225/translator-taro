import Taro from '@tarojs/taro'
/**
 * 历史记录
 */
export default class History<T> {
  protected name: string

  protected value: Array<T>

  protected max = 15

  constructor(name: string) {
    this.name = name
    this.init()
  }

  all() {
    return this.value
  }

  add(v: T) {
    const i = this.value.indexOf(v)
    if (i == -1) {
      this.value.unshift(v)
    } else {
      this.value.splice(i, 1)
      this.value.unshift(v)
    }

    if (this.value.length > this.max) {
      this.value.pop()
    }

    if (Taro && Taro.setStorageSync) {
      Taro.setStorageSync(this.name, this.value)
    }
  }

  protected init() {
    if (Taro && Taro.getStorageSync) {
      try {
        this.value = Taro.getStorageSync(this.name)
        if (!this.value) {
          this.value = new Array<T>()
        }
      } catch(e) {
        this.value = new Array<T>()
      }
    } else {
      this.value = new Array<T>()
    }
  }
}