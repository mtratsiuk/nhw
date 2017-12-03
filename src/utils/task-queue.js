export default class TaskQueue {
  static from (options) {
    return new TaskQueue(options)
  }

  constructor (options) {
    this._queue = new TaskQueueImpl(options)
  }

  add (task) {
    return this._queue.add(task)
  }
}

class TaskQueueImpl {
  constructor ({ concurrency = 1 } = {}) {
    this._concurrency = concurrency

    this._taskMap = new Map()
    this._runningCount = 0
  }

  add (task) {
    return new Promise((resolve, reject) => {
      this._taskMap.set(task, { resolve, reject })
      this.run()
    })
  }

  run () {
    if (this._runningCount === this._concurrency || !this._taskMap.size) {
      return
    }

    this._runningCount += 1
    this.execute(this.dequeue())
    this.run()
  }

  async execute ([task, { resolve, reject }]) {
    try {
      resolve(await task())
    } catch (error) {
      reject(error)
    } finally {
      this._runningCount -= 1
      this.run()
    }
  }

  dequeue () {
    const next = this._taskMap[Symbol.iterator]().next().value
    this._taskMap.delete(next[0])
    return next
  }
}
