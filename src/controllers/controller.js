import express from 'express'

export default function (handler) {
  return function (dependencies = {}) {
    const router = express.Router()
    handler({ router, ...dependencies })
    return router
  }
}
