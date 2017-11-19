import NhwError from './base'

class BadArgumentsError extends NhwError {
  constructor (...args) {
    super(...args)
    this.status = 400
  }
}

export default BadArgumentsError
