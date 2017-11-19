class NhwError extends Error {
  constructor ({ message, ...data } = {}) {
    super(message)
    this.name = this.constructor.name
    this.data = data
  }

  format () {
    const error = {
      error: this.name
    }

    if (this.message) {
      error.message = this.message
    }

    if (process.env.NHW_IS_DEV) {
      error.data = this.data
    }

    return error
  }
}

export default NhwError
