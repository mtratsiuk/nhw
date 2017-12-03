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
      const item = await service.getById(req.params.id)

      if (item) {
        return res.json(item)
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
  },

  async putOne (router, service) {
    router.put('/:id', async (req, res, next) => {
      try {
        res.json(await service.updateOrCreateById(req.params.id, req.body))
      } catch (error) {
        next(new BadArgumentsError(error))
      }
    })
  },

  async deleteOne (router, service) {
    router.delete('/:id', async (req, res, next) => {
      try {
        await service.deleteById(req.params.id)
        res.status(204).end()
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
