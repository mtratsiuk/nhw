import NhwError from './base'

class NotAuthorizedError extends NhwError {
  constructor (...args) {
    super(...args)
    this.status = 401
  }
}

export default NotAuthorizedError
