const TIMER_TIMEOUT = 1
const TIMER_INTERVAL = 2


export default class Timer {
  protected readonly millseconds: number

  protected readonly type: number

  protected handler?: NodeJS.Timeout

  constructor(type: number, ms: number) {
    this.type = type
    this.millseconds = ms
  }

  static delay(ms: number) {
    return new Timer(TIMER_TIMEOUT, ms)
  }

  static period(ms: number) {
    return new Timer(TIMER_INTERVAL, ms)
  }

  run(fn: (...args: any[]) => void, ...args: any[]) {
    this.clear()

    if (this.type === TIMER_TIMEOUT) {
      this.handler = setTimeout(fn, this.millseconds, ...args)
      return true
    } else if (this.type === TIMER_INTERVAL) {
      this.handler = setInterval(fn, this.millseconds, ...args)
      return true
    }
    return false
  }

  clear() {
    if (this.handler) {
      if (this.type === TIMER_TIMEOUT) {
        clearTimeout(this.handler)
      } else if (this.type === TIMER_INTERVAL) {
        clearInterval(this.handler)
      }
    }
  }
}