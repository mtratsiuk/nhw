import config from 'nhw/config'
import { User, Product } from 'nhw/models'

import path from 'path'
import { CsvImporter } from 'nhw/utils/importers'

console.log(config.name)

/* eslint-disable */
new User()
new Product()
/* eslint-enable */

const DATA_PATH = path.resolve(__dirname, '../data')

new CsvImporter().importChanges(DATA_PATH, console.log)
