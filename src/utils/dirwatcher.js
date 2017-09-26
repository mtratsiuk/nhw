import EventEmitter from 'events'
import chokidar from 'chokidar'

const FILE_CHANGE_EVENTS = ['add', 'change'].reduce((map, event) => {
  map[event] = true
  return map
}, {})

class DirWatcher extends EventEmitter {
  constructor (path, delay) {
    super()
    process.nextTick(() => this._watch(path, delay))
  }

  _watch (path, delay) {
    this._watcher = chokidar.watch(path, {
      usePolling: true,
      interval: delay
    })

    this._watcher.on('error', error => this.emit('error', error))
    this._watcher.on('all', (type, path) => {
      if (FILE_CHANGE_EVENTS[type]) {
        this.emit('change', path)
      }
    })
  }

  close () {
    this._watcher.close()
  }
}

function watch (path, delay) {
  return new DirWatcher(path, delay)
}

export { watch }
