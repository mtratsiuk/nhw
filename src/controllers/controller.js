import express from 'express'
import { BadArgumentsError, NotFoundError } from 'nhw/utils/errors'

const baseApi = {
  async getAll (router, service) {
    router.get('/', async (req, res) => {
      res.json(await service.getAll())
    })
  },

  async getOne (router, service) {
    router.get('/:id', async (req, res, next) => {
      const product = await service.getById(req.params.id)

      if (product) {
        return res.json(product)
      }

      next(new NotFoundError())
    })
  },

  async postOne (router, service) {
    router.post('/', async (req, res, next) => {
      try {
        res.json(await service.createOne(req.body))
      } catch (error) {
        next(new BadArgumentsError(error))
      }
    })
  }
}

export default function (handler) {
  return function (dependencies = {}) {
    const router = express.Router()
    handler({ router, baseApi, ...dependencies })
    return router
  }
}
