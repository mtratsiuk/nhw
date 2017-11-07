export default function (source, service = () => ({})) {
  return function (dependencies = {}) {
    return {
      getAll,
      getById,
      createOne,
      ...service(dependencies)
    }

    async function getAll () {
      return [...source]
    }

    async function getById (id) {
      return source.find(x => x.id === +id)
    }

    async function createOne (data) {
      source.push(data)
      return data
    }
  }
}
