import { NhwError } from 'nhw/utils/errors'

export default function errorHandler () {
  return function (error, req, res, next) {
    if (error instanceof NhwError) {
      return res.status(error.status || 500).json(error.format())
    }

    res.status(500).end()
  }
}
