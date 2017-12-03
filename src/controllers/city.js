import controller from './controller'

export default controller(({ router, baseApi, cityService }) => {
  baseApi.getAll(router, cityService)

  baseApi.getOne(router, cityService)

  baseApi.postOne(router, cityService)

  baseApi.putOne(router, cityService)

  baseApi.deleteOne(router, cityService)
})
