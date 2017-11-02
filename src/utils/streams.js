import fs from 'fs'
import { resolve as resolvePath } from 'path'
import { promisify } from 'util'

import _ from 'lodash/fp'
import request from 'request'
import program from 'commander'
import through2 from 'through2'
import csvParse from 'csv-parse'
import combine from 'stream-combiner'

import config from 'nhw/config'

const readdir = promisify(fs.readdir)

const readdirabs = async dir => {
  return (await readdir(dir)).map(name => resolvePath(dir, name))
}

const mapThrough = fn => {
  return through2.ctor((chunk, enc, cb) => {
    cb(null, fn(chunk.toString()))
  })
}

const maybeLazy = value => {
  return _.isFunction(value) ? value() : value
}

const concat = (...args) => array => array.concat(...args)

export const echo = mapThrough(_.identity)
export const toUpper = mapThrough(_.toUpper)

export const stringifyCsv = () => {
  let open = false
  return through2.obj(
    function (row, enc, cb) {
      if (!open) {
        this.push('[')
        open = true
      } else {
        this.push(',')
      }
      this.push(JSON.stringify(row))
      cb()
    },
    function (cb) {
      this.push(']')
      open = false
      cb()
    }
  )
}

export const csvToJson = () => {
  return combine(csvParse(), stringifyCsv())
}

export const writeInto = dest => src => {
  return new Promise((resolve, reject) => {
    dest = maybeLazy(dest)

    dest.on('error', reject)
    consume(src)

    function consume ([src, ...queue]) {
      src = maybeLazy(src)

      src.on('data', chunk => {
        if (!dest.write(chunk)) {
          src.pause()
          dest.once('drain', () => src.resume())
        }
      })

      src.on(
        'end',
        queue.length
          ? () => consume(queue)
          : () => {
            dest.end()
            resolve()
          }
      )

      src.on('error', reject)
    }
  })
}

export const bundleCss = async ({ path }) => {
  const outPath = resolvePath(path, config.hw3BundleOutName)

  return _.pipe(
    _.filter(name => name !== outPath && name.endsWith('.css')),
    _.map(_.wrap(fs.createReadStream)),
    concat(_.wrap(request.get, config.hw3VendorCssUrl)),
    writeInto(fs.createWriteStream(outPath, { flags: 'a' }))
  )(await readdirabs(path))
}

export const cli = argv => {
  const actions = {
    io: echo,
    'csv-to-json': csvToJson,
    'to-upper': toUpper,
    'bundle-css': {
      process: bundleCss
    }
  }

  program
    .option(
      `-a, --action <${Object.keys(actions).join('|')}>`,
      'input transformation type'
    )
    .option('-f, --file [input_path]', 'input file path. defaults to [stdin]')
    .option(
      '-p, --path [output_path]',
      'output file path. defaults to [stdout]'
    )
    .parse(argv)

  const { action: requestedAction, file, path } = program
  const action = actions[requestedAction]

  if (!action) {
    console.error(`Unknown transformation: ${program.action}`)
    program.outputHelp()
    process.exit(1)
  }

  if (typeof action !== 'function') {
    return action.process(program)
  }

  const input = file ? fs.createReadStream(file) : process.stdin
  const output = path ? fs.createWriteStream(path) : process.stdout

  input.pipe(action()).pipe(output)
}

if (__filename === process.argv[1]) {
  cli(process.argv)
}
