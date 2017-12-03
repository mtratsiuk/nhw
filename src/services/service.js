import { mapValues } from 'lodash'

export default function (model, service = () => ({})) {
  return function (dependencies = {}) {
    const Model = dependencies.dbContext[model]

    return wrap({
      getAll,
      getById,
      createOne,
      ...service({ ...dependencies, [model]: Model })
    })

    async function getAll () {
      return Model.findAll()
    }

    async function getById (id) {
      return Model.findById(id)
    }

    async function createOne (data) {
      const created = await Model.create({ ...data, id: null })
      return created
    }

    function toDto (data) {
      if (Array.isArray(data)) {
        return data.map(toDto)
      }

      if (data && typeof data.toDto === 'function') {
        return data.toDto()
      }
    }

    function wrap (service) {
      return mapValues(service, method => {
        return async (...args) => {
          return toDto(await method(...args))
        }
      })
    }
  }
}
