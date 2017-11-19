import NhwError from './base'

class NotFoundError extends NhwError {
  constructor (...args) {
    super(...args)
    this.status = 404
  }
}

export default NotFoundError
