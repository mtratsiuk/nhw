import { mapValues } from 'lodash'

export default function (model, service = () => ({})) {
  return function (dependencies = {}) {
    const Model = dependencies.dbContext[model]

    return wrap({
      getAll,
      getById,
      createOne,
      updateOrCreateById,
      deleteById,
      ...service({ ...dependencies, [model]: Model })
    })

    async function getAll () {
      return Model.find()
    }

    async function getById (id) {
      return Model.findById(id)
    }

    async function createOne (data) {
      delete data._id
      return Model.create(data)
    }

    async function updateOrCreateById (id, data) {
      delete data._id
      return Model.findOneAndUpdate({ _id: id }, data, {
        new: true,
        upsert: true
      })
    }

    async function deleteById (id) {
      return Model.deleteOne({ _id: id })
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
