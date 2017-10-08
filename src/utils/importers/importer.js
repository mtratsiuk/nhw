import fs from 'fs'
import { promisify } from 'util'

import { watch } from 'nhw/utils/dirwatcher'
const readFile = promisify(fs.readFile)

export default class Importer {
  importChanges (dirPath, onImport, { interval = 100 } = {}) {
    this._watcher = watch(dirPath, interval)
    this._watcher.on('change', async path => onImport(await this.import(path)))
  }

  close () {
    if (this._watcher) {
      this._watcher.close()
    }
  }

  async import (path) {
    return this._toJson(await readFile(path))
  }

  importSync (path) {
    return this._toJsonSync(fs.readFileSync(path))
  }
}
