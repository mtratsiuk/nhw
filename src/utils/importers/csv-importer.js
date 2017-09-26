import parse from 'csv-parse'
import parseCsvSync from 'csv-parse/lib/sync'
import { promisify } from 'util'

import Importer from './importer'
const parseCsv = promisify(parse)

export default class CsvImporter extends Importer {
  async _toJson (data) {
    return parseCsv(data)
  }

  _toJsonSync (data) {
    return parseCsvSync(data)
  }
}
