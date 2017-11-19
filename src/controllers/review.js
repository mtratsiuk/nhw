import controller from './controller'

export default controller(({ router, baseApi, reviewService }) => {
  baseApi.getAll(router, reviewService)

  baseApi.getOne(router, reviewService)

  baseApi.postOne(router, reviewService)
})
