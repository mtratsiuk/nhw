import assert from 'assert'
import through2 from 'through2'
import {
  isString,
  isArray,
  isNil,
  escape as htmlEncode,
  identity
} from 'lodash/fp'

export default function mishtache ({ braces = ['{', '}'] } = {}) {
  assert.ok(isArray(braces), new TypeError(`braces should be Array`))
  assert.ok(
    braces.every(isString),
    new TypeError('braces should contain strings')
  )
  assert.equal(
    braces.length,
    2,
    'opening and closing braces should be provided'
  )

  const [left, right] = braces
  const pattern = new RegExp(`${left}(.+?)${right}`, 'g')

  return makeMishtacheStream({ pattern, left, right })
}

function makeMishtacheStream ({ pattern, left }) {
  return function (context, { escape = true } = {}) {
    let buffer = ''

    return through2(
      function (chunk, enc, cb) {
        buffer += chunk.toString()
        buffer = replace(buffer, pattern, context, escape)

        const nextBrace = buffer.indexOf(left)

        if (nextBrace === -1) {
          this.push(buffer)
          buffer = ''
        } else {
          this.push(buffer.slice(0, nextBrace))
          buffer = buffer.slice(nextBrace)
        }

        cb()
      },
      function (cb) {
        this.push(replace(buffer))
        buffer = ''
        cb()
      }
    )
  }
}

function replace (string, pattern, context, escape) {
  return string.replace(pattern, (_, key) =>
    (escape ? htmlEncode : identity)(isNil(context[key]) ? key : context[key])
  )
}
