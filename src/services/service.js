export default function (model, service = () => ({})) {
  return function (dependencies = {}) {
    const Model = dependencies.dbContext[model]

    return {
      getAll,
      getById,
      createOne,
      ...service({ ...dependencies, [model]: Model })
    }

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
  }
}
